"use client";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const path = usePathname();

  return (
    <header className="relative shadow-md flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <Link
            className="flex-none text-xl font-semibold  focus:outline-none focus:opacity-80"
            href="/"
            aria-label="Brand"
          >
            <span className="inline-flex items-center gap-x-2 text-xl font-semibold ">
              <Image
                src={logo}
                width={50}
                height={50}
                alt="logo"
                priority
              ></Image>
              Next level meals
            </span>
          </Link>
        </div>
        <div
          id="hs-navbar-example"
          className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
          aria-labelledby="hs-navbar-example-collapse"
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            <Link
              href="/"
              className={`font-medium  text-[#1A1A1A] focus:outline-none${
                path == "/" ? " text-[#F59E0B]" : " text-[#1A1A1A]"
              }`}
              aria-current="page"
            >
              Home
            </Link>

            <Link
              href="/meals"
              className={`font-medium  text-[#1A1A1A] focus:outline-none${
                path.startsWith("/meals")
                  ? " text-[#F59E0B]"
                  : " text-[#1A1A1A]"
              }`}
              aria-current="page"
            >
              Browse Meals
            </Link>
            <Link
              className={`font-medium  text-[#1A1A1A] focus:outline-none${
                path.startsWith("/community")
                  ? " text-[#F59E0B]"
                  : " text-[#1A1A1A]"
              }`}
              href="/community"
            >
              Foodies Community
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
