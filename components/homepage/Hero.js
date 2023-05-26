import Link from 'next/link';

export default function Hero() {
  return (
    <div className="px-14 h-screen grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mb-24 items-center bg-cover bg-center bg-[url('../public/bg.jpg')]">
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
          Find the Best Career Opportunities With <span className="text-blue-700">JobConnect</span>
        </h1>
        <Link href="/signin">
          <button className="cursor-pointer text-base lg:text-xl font-semibold bg-blue-700 text-white rounded-lg w-36 md:w-52 lg:w-72 py-3 hover:bg-blue-500">Get Started</button>
        </Link>
      </div>
      {/* <div className="col-span-2 md:col-span-2 lg:col-span-4">
        <img className="w-full mx-auto my-4" src="./hero.png" alt="hero.png" />
      </div> */}
    </div>
  );
}
