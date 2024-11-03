import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SparklesPreview } from "./ui/sparklespreview";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { FlipWords } from "./ui/flip-words";
import "@/app/globals.css";
const Hero = () => {
  const words = ["SHA1", "SHA256", "MD5"];

  return (
    <section id="home" className="pb-0 pt-16 relative z-10">
      {/* Background Animation */}
      <SparklesPreview />

      {/* Content */}
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="relative flex justify-center items-center mb-[-20px] md:mb-[-80px]">
          <Image
            src="/logo.png"
            alt="CryptCat Logo"
            width={160}
            height={160}
            className="mb-4 max-w-[100px] sm:max-w-[120px] md:max-w-[140px] lg:max-w-[160px]"
            style={{ transform: "translateX(-1.5cm)" }}
          />
        </div>

        <p className="text-2xl md:text-4xl lg:text-8xl text-white font-bold inter-var text-center">
          CryptCat
        </p>
        <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
          Password Hashcracking Visualizer
        </p>

        <div className="mt-10 flex justify-center space-x-8">
          <Link href="/password-hasher" passHref>
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-4 py-2"
            >
              <span>Hash your Password</span>
            </HoverBorderGradient>
          </Link>

          <Link href="/crack-your-password" passHref>
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-4 py-2"
            >
              <span>Crack your Password</span>
            </HoverBorderGradient>
          </Link>
        </div>

        <div className="h-[calc(40rem-1cm)] flex justify-center items-center px-4 mt-[-1cm]">
          <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
            Crack
            <FlipWords words={words} />
            hashes with cryptCat
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
