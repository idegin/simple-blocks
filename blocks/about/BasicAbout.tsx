export function BasicAbout() {
  return (
    <>
      <div className="py-48 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative">
                <img
                  alt="Team working together"
                  className="rounded-lg shadow-lg w-full"
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                />
                <div className="absolute -bottom-6 -right-6 hidden md:block">
                  <img
                    alt="Company culture"
                    className="w-32 h-32 rounded-lg shadow-lg object-cover border-4 border-white"
                    src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <span className="text-primary font-semibold">About Us</span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                We're a passionate team of experts
              </h2>
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                auctor, felis ac lacinia tincidunt, nisi risus aliquam dolor,
                non sodales magna felis eget ligula. Suspendisse potenti. Donec
                tempus, ex in efficitur varius, lorem nisi placerat urna.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
                  Learn More
                </button>
                <button className="bg-white border border-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors">
                  Our Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
