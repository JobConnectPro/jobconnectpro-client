export default function CompleteProfile() {
  return (
    <div className="mt-20 flex ml-52">
      <div className="w-[600px] mx-auto">
        <h1 className="text-4xl text-center p-8">
          Oops! We cannot provide you any job recommendations, as you haven't completed your JobConnect profile.
        </h1>
        <p className="text-center p-4">Help us provide you with job recommendations by completing your profile.</p>
        <div className="flex justify-center items-center gap-8 p-4">
          <button className="p-2 bg-blue-400 rounded-md hover:bg-blue-600">Complete Profile</button>
          <p className="">Or check out the categories below</p>
        </div>
      </div>
    </div>
  );
}
