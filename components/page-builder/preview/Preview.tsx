'use client'
import Frame from "react-frame-component";
import dynamic from "next/dynamic";
import { useBuilderContext } from "@/context/builder.context";
import { usePreviewContext } from "@/context/preview.context";
import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { debounce } from "@/utils/index.utils";
import { BlockConfigField } from "@/types/block-props.types";

export default function Preview() {
  const { state, setState: setBuilderState } = useBuilderContext();
  const { blocks, blockRefs } = state;
  const { state: previewState, setState } = usePreviewContext();
  const frameRef = useRef<HTMLIFrameElement>(null);

  const [loadedComponents, setLoadedComponents] = useState<Record<string, any>>({});
  const [configCache, setConfigCache] = useState<Record<string, any>>({});

  const debouncedSetBuilderState = useCallback(
    debounce((newState: any) => {
      setBuilderState(prevState => ({
        ...prevState,
        ...newState
      }));
    }, 400),
    [setBuilderState]
  );

  useEffect(() => {
    async function loadComponentConfigs() {
      const updatedBlocks = [...blocks];
      let hasChanges = false;

      for (const block of updatedBlocks) {
        const cacheKey = `${block.folder}/${block.component}`;
        if (!configCache[cacheKey]) {
          try {
            const module = await import(`@/blocks/${block.folder}/${block.component}`);
            if (module.config?.fields) {
              setConfigCache(prev => ({
                ...prev,
                [cacheKey]: module.config
              }));

              const fields = module.config.fields;
              if (fields) {
                if (!block.value) {
                  block.value = {};
                  hasChanges = true;
                }

                Object.entries(fields).forEach(([key, fieldConfig]) => {
                  if (!block.value[key]) {
                    // Handle array type fields
                    if (Array.isArray(fieldConfig)) {
                      block.value[key] = [];
                      hasChanges = true;
                    }
                    // Handle normal fields with default values
                    else if ((fieldConfig as BlockConfigField)?.defaultValue !== undefined) {
                      const field = fieldConfig as BlockConfigField;
                      block.value[key] = {};

                      switch(field.formType) {
                        case "input":
                        case "textarea":
                          block.value[key].string_value = field.defaultValue;
                          break;
                        case "list":
                          block.value[key].array_value = field.defaultValue;
                          break;
                      }

                      hasChanges = true;
                    }
                  }
                });
              }
            }
          } catch (error) {
            console.error(`Failed to load config for ${block.component}:`, error);
          }
        }
      }

      if (hasChanges) {
        debouncedSetBuilderState({ blocks: updatedBlocks });
      }
    }

    loadComponentConfigs();
  }, [blocks, debouncedSetBuilderState, configCache]);

  useEffect(() => {
    blocks.forEach((block) => {
      const { component, folder } = block;
      const componentKey = `${folder}/${component}`;

      if (!loadedComponents[componentKey]) {
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

  const handleBlockClick = (blockRef: typeof blockRefs[0], event: React.MouseEvent) => {
    event.stopPropagation();
    setState(prev => ({ ...prev, activeBlockRef: blockRef }));
  };

  const initialContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
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
            border: 3px dashed #7C3AED;
            background-color: rgba(124, 58, 237, 0.1);
            pointer-events: none;
            z-index: 9999;
          }
        </style>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
         <style type="text/tailwindcss">
      @theme {
        --color-primary: #064BB5;
        --color-primary-foreground: #FFFFFF;

        --color-secondary: #BAFC5D;
        --color-secondary-foreground: #1D1F1E;
        
        --color-accent: #2563eb;
        --color-accent-foreground: #2563eb;

        --color-muted: #94a3b8;
        
        
        --color-border: #AFAFAF;

        --color-success: #22c55e;
        --color-success-foreground: #e9f4ed;

        --color-danger: #ef4444;
        --color-danger-foreground: #faf3f3;

        --color-info: #0ea5e9;
        --color-info-foreground: #0ea5e9;

        --color-card: #ffff
        
        
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

            const formattedProps: Record<string, any> = {};
            if (blockData.value) {
              Object.entries(blockData.value).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                  formattedProps[key] = value;
                } else {
                  formattedProps[key] = value;
                }
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