export function BasicHero() {
  return (
    <>
      <div
        className="relative min-h-[80vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        <div className="container mx-auto px-4 z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-white">
              <span className="bg-primary/90 text-white text-sm font-medium px-3 py-1 rounded-full mb-6 inline-block">
                New Feature
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Create beautiful websites{" "}
                <span className="text-primary">without code</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8">
                Our intuitive drag-and-drop builder makes creating professional
                websites easier than ever. Start your free trial today.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-primary/30">
                  Get Started
                </button>
                <button className="bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium px-6 py-3 rounded-lg transition-all duration-300">
                  Watch Demo
                </button>
              </div>
              <div className="mt-10 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      alt={`User ${i}`}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      src={`https://randomuser.me/api/portraits/men/${20 + i}.jpg`}
                    />
                  ))}
                </div>
                <p className="ml-4 text-sm text-gray-300">
                  <span className="font-bold text-white">1,200+</span> customers
                  are already building amazing websites
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 bg-white p-2 rounded-xl shadow-2xl">
                <img
                  alt="Dashboard preview"
                  className="rounded-lg w-full"
                  src="https://images.unsplash.com/photo-1555421689-3f034debb7a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg">
                  Drag & Drop
                </div>
              </div>
              <div className="absolute -top-4 -right-4 h-full w-full bg-secondary/20 rounded-xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
