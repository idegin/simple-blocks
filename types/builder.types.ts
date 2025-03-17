export type PageData = {
  _id: string;
  label: string;
  slug: string;
  type: "default" | "cms-details";
};

export type ProjectData = {
  _id: string;
  name: string;
};

export type PageBlockData = {
  _id: string;
  folder: BlockType;
  component: string;
  value: Record<any, any>;
};

export type PageBlockDataRef = {
  block: string;
  index: number;
  page_id: string;
};

export type BlockMapper = {
  name: string;
  component: string;
  description?: string;
  isNew?: boolean;
};

export enum BlockType {
  HERO = "hero",
  ABOUT = "about",
  TESTIMONIALS = "testimonials",
  FEATURES = "features",
  FAQ = "faq",
  CONTACT = "contact",
  FOOTER = "footer",
  NAVIGATION = "navigation",
  HEADER = "header",
  CTA = "cta",
}

export type ProjectTheme = {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    base: string;
  };
  fontFamily: {
    sans: string[];
    serif: string[];
    mono: string[];
  };
};
