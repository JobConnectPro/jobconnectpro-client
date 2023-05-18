export default function ForEmployer() {
  return (
    <div className="my-20 mx-14 grid grid-cols-1 gap-4">
      <div className="w-full col-span-2 bg-cover bg-center items-center rounded-xl bg-[url('../public/findjobs2.jpg')]">
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col text-white p-8 col-span-2">
            <h1 className="text-xl mb-8">For Employer</h1>
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-2">Find jobseeker your way</h1>
            <p className="mb-6">Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.</p>
            {/* <div className="grid grid-cols-2 gap-2">
              <p className="border-sky-400 border rounded-lg p-4">Post a job and hire a pro</p>
              <p className="border-sky-400 border rounded-lg p-4">Let us help you find the right jobseeker</p>
              <p className="border-sky-400 border rounded-lg p-4">Hiring is more than just resumes and job posts</p>
              <p className="border-sky-400 border rounded-lg p-4">Build positive candidate experience easily</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
