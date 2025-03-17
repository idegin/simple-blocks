'use client'

import Frame from "react-frame-component";
import dynamic from "next/dynamic";
import { useBuilderContext } from "@/context/builder.context";

export default function Preview() {
    const { state } = useBuilderContext();
    const { blocks, blockRefs } = state;

    console.log('Builder blocks:', blocks);
    console.log('Builder block refs:', blockRefs);

    const componentMap: Record<string, any> = {};

    // Build componentMap from the blocks in the context
    blocks.forEach((block) => {
        const { component, folder } = block;

        if (!componentMap[component]) {
            componentMap[component] = dynamic(
                () => import(`@/blocks/${folder}/${component}`).then(mod => ({
                    default: mod[component]
                })),
                {
                    ssr: false,
                    loading: () => <div>Loading {component}...</div>
                }
            );
        }
    });

    // Sort block references by index to maintain order
    const sortedBlockRefs = [...blockRefs].sort((a, b) => a.index - b.index);

    console.log('Component map keys:', Object.keys(componentMap));

    const initialContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <style>
          body {
            margin: 0;
            padding: 0;
          }
        </style>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  primary: "#7C3AED",
                  secondary: "#1E293B",
                  accent: "#F59E0B",
                  neutral: "#64748B",
                  base: "#FFFFFF"
                },
                height: {
                  body: "calc(100vh - 4rem)"
                },
                maxHeight: {
                  body: "calc(100vh - 4rem)"
                }
              }
            }
          }
        </script>
      </head>
      <body>
        <div id="mountHere"></div>
      </body>
    </html>
  `;

    return (
        <main className={"h-body bg-white flex-1"}>
            <Frame className={"h-full w-full"} initialContent={initialContent}>
                {blockRefs.length > 0 ? (
                    sortedBlockRefs.map((blockRef) => {
                        const blockData = blocks.find(block => block._id === blockRef.block);

                        if (!blockData) {
                            return (
                                <div key={blockRef.block}>
                                    Block not found: {blockRef.block}
                                </div>
                            );
                        }

                        console.log(`Rendering block: ${blockData.component}`);
                        const Component = componentMap[blockData.component];

                        return Component ? (
                            <div key={blockRef.block}>
                                <Component />
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