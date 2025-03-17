export function SaaSHero() {
  return (
    <>
      <div className={"h-[40vh] bg-gray-100 flex items-center justify-center"}>
        <div className={"flex flex-col items-center"}>
          <h1 className={"text-4xl font-bold text-center"}>SaaS Hero</h1>
          <p className={"text-center text-lg mt-4"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor, felis ac lacinia.
          </p>
          <div className={"flex gap-4 mt-8"}>
            <button className={"bg-primary text-white px-4 py-2 rounded-md"}>
              Get Started
            </button>
            <button className={"bg-white text-primary px-4 py-2 rounded-md"}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
