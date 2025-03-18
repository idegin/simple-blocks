import { CalendarIcon, ArrowRightIcon } from "lucide-react"
import type { BlockConfig } from "@/types/block-props.types";

interface NewsItem {
  title: { string_value: string };
  description: { string_value: string };
  date: { string_value: string };
  category: { string_value: string };
  imageUrl: { string_value: string };
}

export function BasicBlog(props: {
  [K in keyof typeof config.fields]: typeof config.fields[K] extends Array<any>
    ? Array<any>
    : {
      string_value?: string;
      boolean_value?: boolean;
      number_value?: number;
      array_value?: any[];
      object_value?: any;
    };
}) {
  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
      return new Date(dateString).toLocaleDateString("en-US", options)
    } catch (error) {
      return dateString;
    }
  }

  const posts = props.Post_List?.array_value || [];

  return (
    <section className="w-full py-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/5 -mr-32 -mb-32 blur-3xl"></div>
      <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-secondary/10 -ml-40 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex flex-col items-start gap-8 mb-12">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-block">
              <span className="px-4 py-1 text-sm font-medium rounded-full border border-primary/20 bg-primary/5 text-primary">
                {props.badgeText?.string_value || "Latest Updates"}
              </span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
              {props.heading?.string_value || "Latest News"}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {props.subHeading?.string_value || "Stay updated with our latest announcements, events, and company news."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.length > 0 ? posts.map((item: NewsItem, index: number) => (
            <div
              key={index}
              className="group flex flex-col h-full overflow-hidden rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={item.imageUrl?.string_value || "/placeholder.webp"}
                  alt={item.title?.string_value}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute top-4 right-4 z-10 px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
                  {item.category?.string_value || "Uncategorized"}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <CalendarIcon className="h-4 w-4 text-primary/70" />
                  <span>{formatDate(item.date?.string_value || "")}</span>
                </div>
                <h3 className="text-2xl font-bold leading-tight mb-3 transition-colors group-hover:text-primary">
                  {item.title?.string_value || "Untitled Post"}
                </h3>
                <p className="text-base text-muted-foreground mb-6">{item.description?.string_value || ""}</p>

                <div className="pt-4 border-t border-border/10 mt-auto">
                  <a
                    href={`/news/${index}`}
                    className="inline-flex items-center text-foreground group-hover:text-primary transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRightIcon className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          )) : (
            // Fallback content when no posts are available
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground">No blog posts available. Add some posts in the editor.</p>
            </div>
          )}
        </div>

        <div className="flex justify-center w-full mt-16">
          <a
            href="/news"
            className="inline-flex items-center gap-2 px-8 py-3 text-base font-medium rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            View All News
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
    </section>
  )
}

export const config: BlockConfig = {
  label: 'Basic Blog',
  fields: {
    badgeText: {
      label: 'Badge text',
      defaultValue: 'Latest Updates',
      formType: 'input'
    },
    heading: {
      label: 'Heading',
      defaultValue: 'Latest News',
      formType: 'input'
    },
    subHeading: {
      label: 'Sub heading',
      defaultValue: 'Stay updated with our latest announcements, events, and company news.',
      formType: 'input'
    },
    Post_List: [
      {
        title: {
          label: 'Title',
          defaultValue: 'Title',
          formType: 'input'
        },
        description: {
          label: 'Description',
          defaultValue: 'Description',
          formType: 'textarea'
        },
        date: {
          label: 'Date',
          defaultValue: '2025-02-15',
          formType: 'input'
        },
        category: {
          label: 'Category',
          defaultValue: 'Category',
          formType: 'input'
        },
        imageUrl: {
          label: 'Image URL',
          defaultValue: '',
          formType: 'input'
        }
      }
    ]
  },
}