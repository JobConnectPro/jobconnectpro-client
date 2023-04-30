import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import JobBoard from "@/components/jobBoard/JobBoard";

export default function profile() {
  return (
    <>
      <div>
        <Navbar />
        <Sidebar />
        <JobBoard />
      </div>
    </>
  );
}
