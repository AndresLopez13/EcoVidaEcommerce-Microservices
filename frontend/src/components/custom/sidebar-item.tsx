"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBarItem({
  text,
  icon,
  href,
}: {
  text: string;
  icon: string;
  href: string;
}) {
  const pathname =  usePathname();
  return (
    <li className={`py-2  px-4 rounded-md ${pathname === href ? 'bg-slate-200':''} `}>
      <Link className={`text-black hover:underline font-semibold`} href={href}>
        {text}
      </Link>
    </li>
  );
}
