"use client";

import axios from "axios";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [Password, setPassword] = React.useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleclick = async () => {
    try {
      const token = searchParams.get("token");
      const res = await axios.post("/api/users/ResetPassword", {
        Password,
        token,
      });
      console.log(res.data);
      if (res.status === 200) {
        setIsError(false);
        setMessage("password set succesfully");
        router.push("/login");
      }
    } catch (error: any) {
      setIsError(true);
      setMessage(error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen justify-center items-center">
        <label htmlFor="password">NewPassword</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="password"
          type="text"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
        />
        <button
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          onClick={handleclick}
        >
          Enter
        </button>
        <p className={isError ? "text-red-500" : "text-green-500"}>{message}</p>
      </div>
    </div>
  );
}
