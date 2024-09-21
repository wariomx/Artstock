import React from "react";
import MaxWidthWrapper from "@/components/MaxWidhWrapper";
import { TextSpan } from "@/components/TextSpan";

export default function Home() {
  const art = "ART TOKENIZATION".split("");
  const defiArt = "LIQUIDITY FOR YOUR ART".split("");

  return (
    <div className="bg-black">
      <div
        className="w-full h-30 bg-image-1 bg-cover bg-center flex justify-center items-center p-[25px]
      "
      >
        <MaxWidthWrapper className="pt-[20px]">
          <img src="/logo.png" className="w-3/4 mx-auto my-auto lg:w-1/2" />
          <div className="  flex items-center flex-col md:flex-row gap-6 mt-10 mb-10 text-green-400 justify-center">
            <div className="md:text-2xl xl:text-3xl flex">
              {art.map((letter, index) => (
                <TextSpan key={index}>
                  {letter === " " ? "\u00A0" : letter}
                </TextSpan>
              ))}
            </div>

            <div className="md:text-2xl xl:text-3xl flex">
              {defiArt.map((letter, index) => (
                <TextSpan key={index}>
                  {letter === " " ? "\u00A0" : letter}
                </TextSpan>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      <section className="bg-custom-white py-24 text-custom-black">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-green-500">
              Working with Bitcoin Proof of Work Security <br /> - Rootstock -
            </h2>
            <video autoPlay loop muted className="w-1/2 h-auto">
              <source src="bit.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </MaxWidthWrapper>
      </section>

      <section>
        <div className="p-[25px]">
          <MaxWidthWrapper className="text-center">
            <h1 className="text-3xl text-green-500">TEAM</h1>
            <div className="flex pt-[20px] items-start justify-between mr-10 ml-10 pl-10 pr-10">
              <div className="">
              <div className="w-20">
                  <img src="wario.jpg" />
                </div>
                <p className="font-bold text-green-500">Mario</p>
                <p>Web3 Dev</p>
              </div>
              <div className="mr-3">
                <div className="w-20">
                  <img src="remco.jpg" />
                </div>
                <p className="font-bold text-green-500">Remco</p>
                <p>Junior Dev</p>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
      </section>
    </div>
  );
}
