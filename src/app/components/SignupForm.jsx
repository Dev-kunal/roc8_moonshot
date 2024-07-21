import React from "react";

export default function Signup({ setUserData, userData, submitUserData }) {
  return (
    <>
      <div className="">
        <div className="border-2 border-gray-200 rounded-[1.3rem] p-8 sm:p-16  flex-col max-w-lg lg:max-w-lg mx-auto mt-8">
          <h3 className="text-2xl font-medium text-center mb-4">
            Create your account
          </h3>
          <form className="max-w-lg mx-auto">
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-90"
              >
                Name
              </label>
              <input
                onChange={(e) =>
                  setUserData((data) => ({ ...data, name: e.target.value }))
                }
                value={userData.name}
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Name"
                required
              />
            </div>

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
              <input
                onChange={(e) =>
                  setUserData((data) => ({ ...data, password: e.target.value }))
                }
                value={userData.password}
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Password"
                required
              />
            </div>
            <div className="mt-8">
              <button
                onClick={submitUserData}
                type="button"
                className="text-white bg-[#050708] font-normal w-[100%] rounded-md text-xs px-5 py-3 tracking-wider"
              >
                CREATE ACCOUNT
              </button>
            </div>

            <div className="mt-8 text-center">
              <span className="text-xs text-gray-700">Have an Account?</span>
              <a href="/signin">
                <span className="tracking-wider text-sm ml-2">LOGIN</span>{" "}
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
