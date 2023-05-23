import React from "react";
import Logo from "../Logo";
import { loginUser } from "@/modules/fetch";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Cookies from "js-cookie";

export default function UserLogin() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const { email, password } = data;
      const { token, role, id } = await loginUser(email, password);

      Cookies.set("token", token);
      Cookies.set("role", role);
      Cookies.set("id", id);
      toast.success("Login Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      const roles = Cookies.get("role");

      if (roles === "Admin") {
        router.push("/admin/profile");
      } else if (roles === "Employer") {
        router.push("/employer/profile");
      } else {
        router.push("/seeker/profile");
      }
    } catch (err) {
      toast.error(`${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  return (
    <>
      <div className=" flex flex-col bg-gray-100">
        <div className="container max-w-md  mx-auto flex flex-col px-2 my-10">
          <div className="bg-white px-6 py-8 rounded shadow-md">
            <h1 className="mb-6 text-2xl text-center text-gray-900">Sign In to JobConnect</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleLogin)}>
              <div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-2 rounded mb-4"
                    // name="email"
                    {...register("email", { required: true })}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                  <input
                    type="password"
                    className="block border border-grey-light w-full p-2 rounded mb-4"
                    // name="password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>

              <button className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign In
              </button>
              <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link href="/signup/seeker" className="font-medium text-blue-500 hover:underline dark:text-primary-500">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
