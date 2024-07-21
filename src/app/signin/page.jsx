"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Signin(props) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userMessage, setUserMessage] = useState({
    success: false,
    message: "",
  });
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    try {
      const res = await axios.post("/api/auth/signin", { ...userData });
      console.log({ res: res.data });
      if (res.data.success) {
        setUserMessage({ success: true, message: res.data.message });
        router.push("/");
      } else setUserMessage({ success: false, message: res.data.message });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="">
        <div className="border-2 border-gray-200 rounded-[1.3rem] p-8 sm:p-16  flex-col max-w-lg lg:max-w-lg mx-auto mt-8">
          <h3 className="text-2xl font-medium text-center mb-6">Login</h3>

          <h2 className="text-xl mb-2 text-center">
            Welcome back to ECOMMERCE
          </h2>
          <h3 className="text-sm mb-4 text-center font-light">
            The next gen business marketplace
          </h3>
          <form className="max-w-lg mx-auto">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-90"
              >
                Email
              </label>
              <input
                onChange={(e) =>
                  setUserData((data) => ({ ...data, email: e.target.value }))
                }
                value={userData.email}
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Email"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-90"
              >
                Password
              </label>
              <div className="relative">
                <input
                  onChange={(e) =>
                    setUserData((data) => ({
                      ...data,
                      password: e.target.value,
                    }))
                  }
                  value={userData.password}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Password"
                  required
                />

                <button
                  type="button"
                  className="absolute top-0 end-0 p-3.5 rounded-e-md underline text-xs"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  Show
                </button>
              </div>
            </div>
            <div className="mt-8">
              <div className="p-1">
                {userMessage && userMessage.message && (
                  <span
                    className={`text-xs ${
                      userMessage.success ? "text-green-400" : "text-red-500"
                    }`}
                  >
                    {userMessage.message}
                  </span>
                )}
              </div>
              <button
                onClick={() => login()}
                type="button"
                className="text-white bg-[#050708] font-normal w-[100%] rounded-md text-xs px-5 py-3 tracking-wider"
              >
                LOGIN
              </button>
            </div>

            <div className="mt-8 text-center">
              <span className="text-xs text-gray-700">
                Don't have an Account?
              </span>
              <a href="/signup">
                <span className="tracking-wider text-sm ml-2">SIGN UP</span>{" "}
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
