import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Separator } from "@/components/ui/separator";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SideBar from "@/components/custom/sidebar";
import Navbar from "@/components/custom/navbar";

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
      <div className="flex flex-col justify-center items-center  md:px-4 ">
          <Navbar />
        <div className="flex items-start justify-start">
          <div className="pl-16 pt-4">{children}</div>
        </div>
      </div>
    </>
  );
}
