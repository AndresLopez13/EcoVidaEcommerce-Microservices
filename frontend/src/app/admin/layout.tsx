// "use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Separator } from "@/components/ui/separator";
import SideBar from "@/components/custom/sidebar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Comerce",
  description: "Arquitectura de software",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <div>
        <header className="flex flex-col justify-between p-4">
          <h2 className="text-2xl font-semibold">Admin Panel</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Panel administrador de la tienda
          </p>
        </header>
        <Separator />
        <div className="flex items-start justify-start">
          <div className="w-1/6">
            <SideBar />
          </div>
          <div className="w-5/6">
            <div className="pl-16 pt-4">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
