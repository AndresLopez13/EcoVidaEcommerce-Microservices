"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: "Inicio" , href: "/"},
    { id: 2, text: "Productos", href: "/products" },
    { id: 4, text: "Salir", href: "/logout" },
    // { id: 5, text: "About" },
  ];

  return (
    <div className="bg-slate-50 flex justify-evenly items-center h-fit w-full md:w-11/12 mt-1 px-4   text-black rounded-lg drop-shadow-lg ">
      {/* Logo */}
      <h1 className="w-full text-3xl font-bold text-black">Logo</h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 w-fit  rounded-xl cursor-pointer duration-300 hover:underline"
          >
            <Link href={item.href} passHref>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? "☰" : "☰"}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-3/5 h-screen  bg-white ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <h1 className="w-full text-3xl font-bold  m-4">Logo</h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b  hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer"
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
