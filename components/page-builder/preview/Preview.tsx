'use client'

import Frame from "react-frame-component";
import dynamic from "next/dynamic";
import { useBuilderContext } from "@/context/builder.context";
import { usePreviewContext } from "@/context/preview.context";
import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { debounce } from "@/utils/index.utils";

export default function Preview() {
  const { state, setState: setBuilderState } = useBuilderContext();
  const { blocks, blockRefs } = state;
  const { state: previewState, setState } = usePreviewContext();
  const frameRef = useRef<HTMLIFrameElement>(null);

  // Keep track of loaded components to avoid recreating
  const [loadedComponents, setLoadedComponents] = useState<Record<string, any>>({});
  // Keep track of loaded component configs
  const [configCache, setConfigCache] = useState<Record<string, any>>({});

  // Debounced state update function
  const debouncedSetBuilderState = useCallback(
    debounce((newState: any) => {
      setBuilderState(prevState => ({
        ...prevState,
        ...newState
      }));
    }, 400),
    [setBuilderState]
  );

  // Load component configurations and apply default values
  useEffect(() => {
    async function loadComponentConfigs() {
      // Process each block to ensure it has default values
      const updatedBlocks = [...blocks];
      let hasChanges = false;

      for (const block of updatedBlocks) {
        // Skip if we've already processed this component type
        const cacheKey = `${block.folder}/${block.component}`;
        if (!configCache[cacheKey]) {
          try {
            // Dynamically import the component to get its config
            const module = await import(`@/blocks/${block.folder}/${block.component}`);
            if (module.config?.fields) {
              // Store the config in the cache
              setConfigCache(prev => ({
                ...prev,
                [cacheKey]: module.config
              }));

              // Initialize default values if not already set
              const fields = module.config.fields;
              if (fields) {
                if (!block.value) {
                  block.value = {};
                  hasChanges = true;
                }

                // Apply default values for fields
                Object.entries(fields).forEach(([key, field]) => {
                  if (!block.value[key] && field?.defaultValue !== undefined) {
                    // Create field with the appropriate value type
                    block.value[key] = {};

                    switch(field?.formType) {
                      case "input":
                      case "textarea":
                        block.value[key].string_value = field.defaultValue;
                        break;
                      case "number":
                        block.value[key].number_value = field.defaultValue;
                        break;
                      case "checkbox":
                        block.value[key].boolean_value = field.defaultValue;
                        break;
                      // Handle other types as needed
                    }

                    hasChanges = true;
                  }
                });
              }
            }
          } catch (error) {
            console.error(`Failed to load config for ${block.component}:`, error);
          }
        }
      }

      // Update builder state if we've made changes, using debounced update
      if (hasChanges) {
        debouncedSetBuilderState({ blocks: updatedBlocks });
      }
    }

    loadComponentConfigs();
  }, [blocks, debouncedSetBuilderState, configCache]);

  // Create a component map that persists across renders
  useEffect(() => {
    blocks.forEach((block) => {
      const { component, folder } = block;
      const componentKey = `${folder}/${component}`;

      if (!loadedComponents[componentKey]) {
        // Dynamically import component but don't recreate if already loaded
        const DynamicComponent = dynamic(
          () => import(`@/blocks/${folder}/${component}`).then(mod => ({
            default: mod[component]
          })),
          {
            ssr: true,
            loading: () => <div className="p-4 text-center">Loading {component}...</div>
          }
        );

        setLoadedComponents(prev => ({
          ...prev,
          [componentKey]: DynamicComponent
        }));
      }
    });
  }, [blocks, loadedComponents]);

  const sortedBlockRefs = useMemo(() => {
    return [...blockRefs].sort((a, b) => a.index - b.index);
  }, [blockRefs]);

  // Handle selection of a block
  const handleBlockClick = (blockRef: typeof blockRefs[0], event: React.MouseEvent) => {
    // Prevent event bubbling
    event.stopPropagation();
    setState(prev => ({ ...prev, activeBlockRef: blockRef }));
  };

  const initialContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <style>
          body {
            margin: 0;
            padding: 0;
          }
          .selected-block {
            position: relative;
          }
          .selected-block::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 2px dashed #7C3AED;
            background-color: rgba(124, 58, 237, 0.1);
            pointer-events: none;
            z-index: 9999;
          }
        </style>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
         <style type="text/tailwindcss">
      @theme {
        --color-clifford: #da373d;
        --color-primary: #1849b3;
      }
    </style>
      </head>
      <body >
        <div id="mountHere" class="select-none"></div>
      </body>
    </html>
  `;

  return (
    <main className="h-body bg-white flex-1">
      <Frame className="h-full w-full" initialContent={initialContent} ref={frameRef}>
        {blockRefs.length > 0 ? (
          sortedBlockRefs.map((blockRef) => {
            const blockData = blocks.find(block => block._id === blockRef.block);
            const isActive = previewState.activeBlockRef?.block === blockRef.block;

            if (!blockData) {
              return (
                <div key={blockRef.block}>
                  Block not found: {blockRef.block}
                </div>
              );
            }

            const componentKey = `${blockData.folder}/${blockData.component}`;
            const Component = loadedComponents[componentKey];

            // Format props correctly for the component
            const formattedProps = {};
            if (blockData.value) {
              Object.entries(blockData.value).forEach(([key, value]) => {
                formattedProps[key] = value;
              });
            }

            return Component ? (
              <div
                key={blockRef.block}
                className={isActive ? "selected-block" : ""}
                onClick={(e) => handleBlockClick(blockRef, e)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${blockData.component} block`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleBlockClick(blockRef, e as unknown as React.MouseEvent);
                  }
                }}
              >
                <Component {...formattedProps} />
              </div>
            ) : (
              <div key={blockRef.block}>
                Failed to load component: {blockData.component}
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-50">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No blocks found</h2>
              <p className="text-gray-600">Check your block configuration.</p>
            </div>
          </div>
        )}
      </Frame>
    </main>
  );
}