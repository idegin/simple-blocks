import { BlockType, PageBlockDataRef } from "@/types/builder.types";
import { PageBlockData } from "@/types/builder.types";
import { BasicBlog } from "@/blocks/blog/BasicBlog";


export const mockPageBlocks: PageBlockData[] = [
  {
    _id: "block1",
    folder: BlockType.HERO,
    component: "BasicHero",
    value: {},
  },
  {
    _id: "block2",
    folder: BlockType.ABOUT,
    component: "BasicAbout",
    value: {},
  },
  {
    _id: "block3",
    folder: BlockType.BLOG,
    component: "BasicBlog",
    value: {},
  }
];

export const mockBlockRefs: PageBlockDataRef[] = [
  {
    block: "block1",
    index: 0,
    page_id: "homepage",
  },
  {
    block: "block2",
    index: 1,
    page_id: "homepage",
  },
  {
    block: "block3",
    index: 2,
    page_id: "homepage",
  }
];
