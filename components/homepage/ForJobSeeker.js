import Link from "next/link";

export default function ForJobseeker() {
  return (
    <div className="my-20 mx-14 grid grid-cols-1 lg:grid-cols-2">
      <img className="w-full h-48 md:w-full md:h-80 lg:h-full rounded-t-xl lg:rounded-tr-none lg:rounded-l-xl object-cover object-left" src="./jobseeker4.jpg" alt="findjobs.jpg" />
      <div className="flex flex-col bg-[#0181fe] rounded-b-xl lg:rounded-r-xl lg:rounded-bl-none text-white p-8">
        <h1 className="text-xl mb-8">For Jobseeker</h1>
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-1">Find Great Jobs</h1>
        <p>Meet clients your excited to work with and take your career or business to new heights.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-4 border-t border-white mt-3">
          <p className="border py-5 px-4 rounded-lg">Find opportunities for every stage of your freelance career</p>
          <p className="border py-5 px-4 rounded-lg">Control when, where, and how you work</p>
          <p className="border py-5 px-4 rounded-lg">The simplest way to career opportunities starts here</p>
          <p className="border py-5 px-4 rounded-lg">Explore different ways to earn</p>
        </div>
        <Link href="/seeker/job">
          <button className="w-40 cursor-pointer font-semibold bg-blue-700 text-white rounded-md py-2 px-2 hover:bg-blue-900">Find opportunities</button>
        </Link>
      </div>
    </div>
  );
}
