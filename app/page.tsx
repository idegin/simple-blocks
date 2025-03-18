import PageBuilder from "@/components/page-builder/PageBuilder";
import { mockPageBlocks, mockBlockRefs } from "@/__mock__/blocks.mock";

export default function Page() {
  return (
    <>
      <PageBuilder
        blockRefs={mockBlockRefs}
        blocks={mockPageBlocks}
        pages={[]}
        project={{
          _id: "1",
          name: "My cool website",
        }}
        theme={null}
      />
    </>
  );
}
