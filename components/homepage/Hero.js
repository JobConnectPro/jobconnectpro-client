export default function Hero() {
  return (
    <div className="flex">
      <div className="w-full mt-20 p-4 mx-auto grid md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h1 className="md:text-6xl sm:text-4xl text-2xl font-bold text-slate-500 py-4">Find the best</h1>
          <h1 className="md:text-5xl sm:text-3xl text-2xl font-bold text-slate-400 py-5">Career opportunities</h1>
          <h1 className="md:text-7xl sm:text-3xl text-2xl font-bold text-slate-600 py-9 pb-16">With jobconnect</h1>

          <button className="cursor-pointer text-xl font-semibold border-2 border-blue-500 text-blue-500 rounded-md w-72 py-3 hover:bg-blue-700 hover:text-white">
            Get Started
          </button>
        </div>
        <img className="w-full mx-auto my-4" src="./hero.png" alt="hero.png" />
      </div>
    </div>
  );
}
