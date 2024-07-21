"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Verify from "../components/Verify";
import SignupForm from "../components/SignupForm";

export default function Signup(props) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showVerify, setShowVerify] = useState(false);

  const submitUserData = async () => {
    try {
      const res = await axios.post("/api/auth/signup", { ...userData });
      console.log({ res: res.data });
      if (res.data.success) {
        setShowVerify(true);
      }
      // router.push(`/verification?email=${userEmail}`)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {showVerify ? (
        <Verify userEmail={userData.email} />
      ) : (
        <SignupForm
          userData={userData}
          setUserData={setUserData}
          submitUserData={submitUserData}
        />
      )}
    </>
  );
}
