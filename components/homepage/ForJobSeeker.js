export default function ForJobseeker() {
  return (
    <div className="w-full py-4 px-8 bg-white grid grid-cols-2">
      <img
        className="h-full rounded-l-xl"
        src="./findjobs.jpg"
        alt="findjobs.jpg"
      />
      <div className="flex flex-col bg-blue-400 rounded-r-xl text-white p-4">
        <h1 className="text-lg font-semibold">For Jobseeker</h1>
        <h1 className="text-6xl font-bold pt-10">Find great</h1>
        <h1 className="text-6xl font-bold ">Jobs</h1>
        <p className="w-[400px] py-4 pb-10">
          Meet clients your excited to work with and take your career or
          business to new heights.
        </p>
        <div className="w-full grid grid-cols-3 gap-6 py-8 pt-3 border-t border-white">
          <p>Find opportunities for every stage of your freelance career</p>
          <p>Control when, where, and how you work</p>
          <p>Explore different ways to earn</p>
        </div>
        <button className="w-40 cursor-pointer font-semibold bg-blue-500 text-white rounded-md py-2 px-2 hover:bg-blue-700">
          Find opportunities
        </button>
      </div>
    </div>
  );
}
