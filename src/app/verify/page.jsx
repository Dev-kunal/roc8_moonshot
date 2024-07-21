"use client";
import React, { useEffect, useState, Suspense } from "react";
import OTPInput from "react-otp-input";
import { getMaskedEmail } from "../utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

function MaskedUserEmail({ setUserEmail }) {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  setUserEmail(email);

  return <Suspense>{getMaskedEmail(email)}</Suspense>;
}

export default function Verify() {
  const [code, setCode] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleCodeChange = (code) => setCode(code);
  const router = useRouter();

  async function verifyUserEmail() {
    try {
      const res = await axios.post("/api/auth/verifyemail", {
        userEmail,
        code,
      });
      if (res.data.success) {
        toast.success(res.data.message, { duration: 800 });
        router.push("/signin");
      } else toast.error(res.data.message, { duration: 800 });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="">
        <div className="border-2 border-gray-200 rounded-[1.3rem] p-8 sm:p-16  flex-col max-w-lg lg:max-w-lg mx-auto mt-8">
          <h3 className="text-2xl font-medium text-center mb-4">
            Verify your email
          </h3>

          <h3 className="text-sm mb-4 text-center font-light">
            Enter the 8 digit code you have received on{" "}
            <span className="font-normal">
              <Suspense>
                <MaskedUserEmail setUserEmail={setUserEmail} />
              </Suspense>
            </span>
          </h3>

          <form className="max-w-lg mx-auto">
            <div className="mb-5">
              <label
                htmlFor="otp"
                className="block mb-2 text-sm font-medium text-gray-90"
              >
                Code
              </label>
              <OTPInput
                value={code}
                onChange={handleCodeChange}
                numInputs={8}
                separator={<span style={{ width: "0.3rem" }}></span>}
                isInputNum={true}
                shouldAutoFocus={true}
                inputStyle={{
                  border: "1px solid #d4d6da",
                  borderRadius: "0.3rem",
                  width: "2.7rem",
                  height: "2.7rem",
                }}
                renderInput={(props) => <input {...props} />}
                containerStyle="justify-between"
              />
            </div>

            <div className="mt-8">
              <button
                onClick={verifyUserEmail}
                type="button"
                className="text-white bg-[#050708] font-normal w-[100%] rounded-md text-xs px-5 py-3 tracking-wider"
              >
                VERIFY
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
