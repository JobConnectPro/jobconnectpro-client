export default function ForEmployer() {
  return (
    <div className="w-full p-y4 px-8 items-center mx-auto bg-white py-10">
      <div className="w-full items-center bg-blue-400 rounded-xl mx-auto bg-[url('../public/owner.png')]">
        <div className="flex flex-col text-white p-4">
          <h1 className="text-lg font-semibold">For Ownerr</h1>
          <h1 className="text-6xl font-bold pb-4 pt-10">Find jobseeker</h1>
          <h1 className="text-6xl font-bold pb-4">your way</h1>
          <p className="w-[400px] py-4 pb-10">
            Work with the largest network of independent professionals and get
            things done—from quick turnarounds to big transformations.
          </p>
          <div className="w-full grid grid-cols-3 gap-14 py-0 pt-4">
            <p className="bg-blue-500  rounded-md text-3xl p-8 font-semibold">
              Post a job and hire a pro
            </p>
            <p className="bg-blue-500  rounded-md text-3xl p-8 font-semibold">
              Browse and buy project
            </p>
            <p className="bg-blue-500  rounded-md text-3xl p-8 font-semibold">
              Let us help you find the right jobseeker
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
