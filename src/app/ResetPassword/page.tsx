"use client"

import axios from "axios";
import React , { useState } from "react";
export default function ResetPassword() {
    const [Password, setPassword] = React.useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleclick = async () => {
      try {
        const res = await axios.post("/api/users/ResetPassword", {Password});
        console.log(res.data);
        setIsError(false);
        setMessage("password set succesfully");
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
    };

    return (
      <div>
        <div className="flex flex-col min-h-screen justify-center items-center">
          <label htmlFor="email">NewPassword</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="email"
            type="text"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="email"
          />
          <button
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            onClick={handleclick}
          >
            Enter
          </button>
          <p className={isError ? "text-red-500" : "text-green-500"}>
            {message}
          </p>
        </div>
      </div>
    );
}

