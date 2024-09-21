"use client";
import React from "react";
import { TextSpan } from "@/components/TextSpan";
import Link from "next/link";

export default function NavBar() {
  const slogan = "Tokenize your Art".split("");

  return (
    <header className="bg-custom-black text-white sticky top-0 z-[100] h-14 w-full border-b border-custom-black">
      <div className="justify-between w-full h-full items-center px-[25px] flex">
        <Link href="/">
          <img src="/logo.png" className="w-11" />
        </Link>
        <Link
          className="flex text-custom-white hover:text-white focus:text-white no-underline"
          href="/dashboard"
        >
          Dashboard
        </Link>

        <div className="text-custom-white hidden lg:flex">
          {slogan.map((letter, index) => (
            <TextSpan key={index}>
              {letter === " " ? "\u00A0" : letter}
            </TextSpan>
          ))}
        </div>
      </div>
    </header>
  );
}
