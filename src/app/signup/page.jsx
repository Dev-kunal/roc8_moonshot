"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SignupForm from "../components/SignupForm";
import { toast } from "sonner";

export default function Signup(props) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const submitUserData = async () => {
    try {
      const res = await axios.post("/api/auth/signup", { ...userData });
      if (res.data.success) {
        toast.success(res.data.message);
        router.push(`/verify?email=${userData.email}`);
      } else toast.error(res.data.message, { duration: 800 });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SignupForm
        userData={userData}
        setUserData={setUserData}
        submitUserData={submitUserData}
      />
    </>
  );
}
