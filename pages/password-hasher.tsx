import React, { useState } from "react";
import { Vortex } from "@/components/ui/vortex";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { FaRegCopy } from "react-icons/fa";
import Image from "next/image"; // Importing Next.js Image component
import "@/app/globals.css";
import md5 from "crypto-js/md5"; // Import md5 from crypto-js

const PasswordHasher = () => {
  const [hashedPassword, setHashedPassword] = useState("");
  const [password, setPassword] = useState("");
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [copySuccess, setCopySuccess] = useState("");

  const hashPassword = async () => {
    if (!password) return;

    if (algorithm === "MD5") {
      const hash = md5(password).toString();
      setHashedPassword(hash);
    } else {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);

      try {
        const hash = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hash));
        const hashHex = hashArray
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
        setHashedPassword(hashHex);
      } catch (error) {
        console.error("Hashing error:", error);
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setHashedPassword("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashedPassword).then(
      () => setCopySuccess("Copied!"),
      (err) => console.error("Could not copy text: ", err)
    );

    setTimeout(() => setCopySuccess(""), 2000);
  };

  return (
    <div className="mt-[6cm] w-full mx-0 rounded-md h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-0 py-4 w-full h-full"
      >
        <div className="relative w-full max-w-md mx-auto my-10 rounded-md overflow-hidden z-10">
          <div className="flex flex-col items-center justify-center px-6 py-8 w-full h-full bg-transparent">
            {/* Password Hasher Title */}
            <h2 className="text-white text-6xl md:text-5xl font-bold text-center mb-4">
              Password Hasher
            </h2>

            <input
              type="password"
              placeholder="Enter your password"
              onChange={handlePasswordChange}
              className="bg-gray-800 text-white p-2 rounded w-full mb-4 text-center border border-gray-600"
            />

            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full mt-4 p-2 rounded bg-gray-900 text-white border border-gray-600"
            >
              <option value="SHA-256">SHA-256</option>
              <option value="SHA-1">SHA-1</option>
              <option value="MD5">MD5</option>
            </select>

            <HoverBorderGradient
              containerClassName="rounded-full mt-6"
              as="button"
              onClick={hashPassword}
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-4 py-2"
            >
              <span>Hash Password</span>
            </HoverBorderGradient>

            {hashedPassword && (
              <div className="mt-6 bg-gray-800 p-4 rounded-md text-white max-w-full break-all relative">
                <p className="font-bold mb-2">Hashed Password:</p>
                <p>{hashedPassword}</p>
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 text-white bg-gray-800 p-2 rounded-full hover:text-green-400"
                >
                  <FaRegCopy />
                </button>
                {copySuccess && (
                  <p className="text-green-400 text-sm absolute top-2 right-10">
                    {copySuccess}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </Vortex>
    </div>
  );
};

export default PasswordHasher;
