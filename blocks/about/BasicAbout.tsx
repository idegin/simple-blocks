import type { BlockConfig } from "@/types/block-props.types"

export function BasicAbout(props: {
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
  return (
    <section className="py-52 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>

              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  alt="Team working together"
                  className="w-full h-auto object-cover"
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                />
              </div>

              <div className="absolute -bottom-10 -right-6 hidden md:block z-20">
                <img
                  alt="Company culture"
                  className="w-36 h-36 rounded-2xl shadow-xl object-cover border-4 border-white"
                  src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                />
                <div className="absolute inset-0 rounded-2xl border border-white/20 shadow-lg"></div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 mt-16 md:mt-0">
            {props?.heading?.string_value && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                {props.heading.string_value}
              </div>
            )}

            {props?.subHeading?.string_value && (
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
                {props.subHeading.string_value}
              </h2>
            )}

            {props?.description?.string_value && (
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{props.description.string_value}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {
                props.btnPrimary?.string_value?.trim() && <button className="bg-primary text-white px-8 py-3.5 rounded-full font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300">
                  {props.btnPrimary?.string_value}
                </button>
              }
              {
                props?.btnSecondary?.string_value?.trim() &&
                <button
                  className="bg-white border border-gray-200 text-gray-800 px-8 py-3.5 rounded-full font-medium shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300">
                  {props?.btnSecondary?.string_value}
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const config: BlockConfig = {
  label: "Basic About",
  fields: {
    heading: {
      label: "Heading",
      defaultValue: "About Us",
      formType: "input",
    },
    subHeading: {
      label: "Sub Heading",
      defaultValue: "We're a passionate team of experts",
      formType: "input",
    },
    description: {
      label: "Description",
      formType: "textarea",
      defaultValue: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, felis ac lacinia tincidunt, nisi risus aliquam dolor, non sodales magna felis eget ligula. Suspendisse potenti. Donec tempus, ex in efficitur varius, lorem nisi placerat urna.`,
    },
    btnPrimary: {
      label: "Button 1",
      defaultValue: "Learn More",
      formType: "input",
    },
    btnSecondary: {
      label: "Button 2",
      defaultValue: "Our Team",
      formType: "input",
    },
  },
}