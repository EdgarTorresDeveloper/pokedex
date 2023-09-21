"use client";
import React from "react";
import Image from "next/image";

export default function LoadingScreen() {
  return (
    <>
      <div className="container-loading">
        <div className="section-loading">
          <Image
            src={"/assets/logo.png"}
            className="img-logo-full"
            alt="pokemon-logo"
            width={150}
            height={50}
          />

          <Image
            src={"/assets/icons/load.svg"}
            className="loading-image"
            alt="loading"
            width={100}
            height={90}
          />
        </div>
      </div>
    </>
  );
}
