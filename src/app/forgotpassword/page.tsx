"use client";
import axios from "axios";
import React , { useState } from "react";
export default function ForgotPassword() {
    const [email, setemail] = React.useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleclick = async () => {
        try{
            const res = await axios.post("/api/users/forgotpasword",{email});
            console.log(res.data)
            setIsError(false)
            setMessage("message send succesfully")
        }catch(error){
            setIsError(true);
            console.error(error);
        }
    }

  return (
    <div>
      <div className="flex flex-col min-h-screen justify-center items-center">
        <label htmlFor="email">Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="email"
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="email"
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
