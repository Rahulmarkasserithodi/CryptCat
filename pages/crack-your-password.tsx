import React, { useState } from "react";
import axios from "axios";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { WavyBackground } from "@/components/ui/wavy-background";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";
import "@/app/globals.css";

const CrackYourPassword: React.FC = () => {
  const [hash, setHash] = useState("");
  const [hashType, setHashType] = useState("sha256");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [pollCount, setPollCount] = useState(0);
  const [saltedSuggestions, setSaltedSuggestions] = useState<string[]>([]);
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const maxPollingTime = 6 * 60 * 1000;
  const pollingInterval = 5000;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setProgress(0);
    setPollCount(0);
    setSaltedSuggestions([]);
    setIsStrongPassword(false);

    try {
      const response = await axios.post(
        "https://y2xpebu9ib.execute-api.ap-southeast-2.amazonaws.com/prod/initiate-cracking",
        {
          target_hash: hash,
          hash_algorithm: hashType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const jobId =
        response.data.job_id || JSON.parse(response.data.body)?.job_id;

      if (jobId) {
        pollForResult(jobId, Date.now());
      } else {
        setError("Failed to initiate password cracking: Missing job_id.");
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to initiate password cracking.");
      setLoading(false);
    }
  };

  const pollForResult = async (jobId: string, startTime: number) => {
    try {
      const response = await axios.get(
        `https://y2xpebu9ib.execute-api.ap-southeast-2.amazonaws.com/prod/check-status?job_id=${jobId}`
      );

      const elapsedTime = Date.now() - startTime;

      if (response.data.status === "COMPLETED") {
        const crackedPassword = response.data.result;
        setResult(crackedPassword);
        setProgress(100);
        setLoading(false);
        generateSaltedSuggestions(crackedPassword);
      } else if (response.data.status === "FAILED") {
        setError("Password cracking failed.");
        setLoading(false);
      } else if (elapsedTime >= maxPollingTime) {
        setResult("Krypto could not crack your password.");
        setIsStrongPassword(true);
        setLoading(false);
      } else {
        setPollCount((prevCount) => {
          const newCount = prevCount + 1;
          if (newCount % 3 === 0) {
            setProgress((prevProgress) => Math.min(prevProgress + 10, 90));
          }
          return newCount;
        });

        setTimeout(() => pollForResult(jobId, startTime), pollingInterval);
      }
    } catch (err) {
      setError("Failed to retrieve job status.");
      setLoading(false);
    }
  };

  const generateSaltedSuggestions = (password: string) => {
    const generateRandomSalt = () => {
      const length = 4;
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
      let salt = "";
      for (let i = 0; i < length; i++) {
        salt += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return salt;
    };

    const suggestions = Array.from(
      { length: 3 },
      () => `${password}${generateRandomSalt()}`
    );
    setSaltedSuggestions(suggestions);
  };

  return (
    <section id="crack-password" className="pb-20 pt-20">
      <WavyBackground className="max-w-4xl mx-auto pb-40">
        <div className="relative flex justify-center items-center mb-[-20px] md:mb-[-80px]">
          <Image
            src="/logo.png"
            alt="CryptCat Logo"
            width={160}
            height={160}
            className="mb-4 max-w-[100px] sm:max-w-[120px] md:max-w-[140px] lg:max-w-[160px]"
            style={{ transform: "translateX(-0.5cm)" }}
          />
        </div>

        <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
          Crack Your Password
        </p>
        <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
          Test how secure your password really is
        </p>

        <div className="mt-10 flex justify-center space-x-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full max-w-md"
          >
            <input
              type="text"
              placeholder="Enter hash"
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              required
              className="bg-black text-white p-2 rounded w-full mb-4 text-center ring-1 ring-gray-700"
            />

            <Menu as="div" className="relative inline-block text-left mb-4">
              <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-700 hover:bg-gray-800">
                  {hashType.toUpperCase()}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 h-5 w-5 text-gray-400"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-600 rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
              >
                <div className="py-1">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => setHashType("md5")}
                        className={`${
                          active ? "bg-gray-800 text-white" : "text-gray-300"
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        MD5
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => setHashType("sha1")}
                        className={`${
                          active ? "bg-gray-800 text-white" : "text-gray-300"
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        SHA-1
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => setHashType("sha256")}
                        className={`${
                          active ? "bg-gray-800 text-white" : "text-gray-300"
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        SHA-256
                      </button>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>

            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-4 py-2"
            >
              <span>{loading ? "Cracking..." : "Crack Password"}</span>
            </HoverBorderGradient>
          </form>
        </div>

        {loading && (
          <div className="mt-10 text-center">
            <div>Loading... Please wait.</div>
            <div
              className="progress-bar-container"
              style={{
                marginTop: "10px",
                width: "100%",
                backgroundColor: "#ddd",
                borderRadius: "5px",
              }}
            >
              <div
                className="progress-bar"
                style={{
                  width: `${progress}%`,
                  height: "20px",
                  backgroundColor: "#4caf50",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div>{progress}% Completed</div>
            <TextGenerateEffect
              words="A dictionary attack is being performed. This means we're checking a list of common passwords one by one to see if any of them matches the hashed value you provided. Hackers often use this technique because many people use predictable passwords. The software systematically tries each password until it finds a match or runs out of options."
              className="mt-6"
            />
          </div>
        )}

        {result && (
          <div className="mt-20 text-center text-white">
            {isStrongPassword ? (
              <>
                <strong>Krypto could not crack your password</strong>
                <div
                  style={{
                    marginTop: "10px",
                    fontWeight: "bold",
                    color: "#4caf50",
                  }}
                >
                  Congratulations, you have a strong password.
                </div>
              </>
            ) : (
              <>
                <strong>Krypto has cracked your password successfully!</strong>
                <div style={{ marginTop: "10px", fontWeight: "bold" }}>
                  Cracked Password:{" "}
                  <span style={{ color: "#4caf50" }}>{result}</span>
                </div>
                <div style={{ marginTop: "20px" }}>
                  Your password is bland, weak, and vulnerable. Let's add some
                  salt.
                </div>
                <div style={{ marginTop: "20px" }}>
                  <strong>Suggested Salted Variations:</strong>
                  <ul>
                    {saltedSuggestions.map((suggestion, index) => (
                      <li key={index} className="text-green-400 font-semibold">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
                <TextGenerateEffect
                  words="Salting is a process used to make passwords more secure by adding random data (called salt) to the end of a password. This makes it much harder for attackers to crack the password using dictionary attacks because the password now has a unique salt. Each salted variation is different, making the password stronger."
                  className="mt-6"
                />
              </>
            )}
          </div>
        )}

        {error && (
          <div className="mt-20 text-center text-red-500">Error: {error}</div>
        )}
      </WavyBackground>
    </section>
  );
};

export default CrackYourPassword;
