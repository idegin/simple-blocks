export function ReversedAbout() {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between py-12">
          <div className="w-full lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-lg mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              sit amet justo nec justo ultricies fermentum. Nullam in nunc ut
              justo fermentum fermentum. Nullam in nunc ut justo fermentum
              fermentum.
            </p>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              sit amet justo nec justo ultricies fermentum. Nullam in nunc ut
              justo fermentum fermentum. Nullam in nunc ut justo fermentum
              fermentum.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <img alt="Team" src="https://source.unsplash.com/600x400/?team" />
          </div>
        </div>
      </div>
    </>
  );
}
