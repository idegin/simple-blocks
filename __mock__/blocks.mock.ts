import { BlockType, PageBlockDataRef } from "@/types/builder.types";
import { mapper as heroMapper } from "@/blocks/hero/hero";
import { mapper as aboutMapper } from "@/blocks/about/about";
import { PageBlockData } from "@/types/builder.types";

/**
 * Dynamically builds a list of blocks from the block folders
 * Each folder contains a .ts file with the same name that exports a mapper
 */
function getBlockList() {
  // Map each BlockType to its corresponding mapper
  const blockMappers: Record<string, any> = {
    [BlockType.HERO]: heroMapper,
    about: aboutMapper,
    // Add other block types as they become available
  };

  // Generate the blockList by iterating through the mappers
  return Object.entries(blockMappers).map(([folder, mapper]) => {
    return {
      rootFolder: folder,
      components: mapper.map((item: any) => item.component),
    };
  });
}

const blockList: { rootFolder: string; components: string[] }[] =
  getBlockList();

export default blockList;

export const mockPageBlocks: PageBlockData[] = [
  {
    _id: "block1",
    folder: BlockType.HERO,
    component: "BasicHero",
    value: {},
  },
  {
    _id: "block3",
    folder: BlockType.ABOUT,
    component: "BasicAbout",
    value: {},
  },
];

export const mockBlockRefs: PageBlockDataRef[] = [
  {
    block: "block3",
    index: 0,
    page_id: "homepage",
  },
  {
    block: "block1",
    index: 1,
    page_id: "homepage",
  },
];
