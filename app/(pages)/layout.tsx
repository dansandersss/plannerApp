import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import TodoList from "@/components/TodoList/TodoList";
import Navbar from "@/components/NavBar/Navbar";
import GlobalProvider from "@/context/GlobalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Flow",
  description: "The best way to keep your thoughts clean",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${inter.className} bg-dark-2 text-white bg-white`}>
        <GlobalProvider>
          <main style={{ height: "calc(100vh - 72px)" }}>
            <div className="w-full flex fixed  z-10 items-center bg-[#F8F8F8] shadow-md">
              <Navbar />
            </div>
            <div className="flex justify-between text-black h-full relative top-20">
              <div className="w-[20%] fixed">
                <Sidebar />
              </div>
              <div className="w-[55%] relative left-[20%]">{children}</div>
              <div className="w-[25%]">
                <TodoList />
              </div>
            </div>
          </main>
        </GlobalProvider>
      </body>
    </html>
  );
}
