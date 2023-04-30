import { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

export default function Resume() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-screen p-4 pt-0 pl-52">
      <button onClick={toggle} className="w-full flex items-center justify-between p-2 bg-blue-500 hover:bg-blue-600">
        Resume
        <div>{isOpen ? <RiArrowDropDownLine size={40} /> : <RiArrowDropUpLine size={40} />}</div>
      </button>
      <div className={isOpen ? "hidden" : "w-full"}>
        <h1 className="text-center text-6xl bg-slate-100 p-20">jobconnectpro RESUME</h1>
        <div className="flex justify-center text-center gap-4 bg-slate-200">
          <button className="my-4 bg-white p-2 px-4 rounded-md font-semibold text-blue-500 border border-slate-300 hover:border-blue-500">
            Cancel
          </button>
          <button className="my-4 bg-blue-500 p-2 px-6 rounded-md font-semibold text-white border border-slate-300 hover:border-blue-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
