import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import TodoList from "@/components/TodoList/TodoList";
import Navbar from "@/components/NavBar/Navbar";
import GlobalProvider from "@/context/GlobalProvider";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

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
      <body className={`${roboto.className} bg-dark-2 text-white bg-white`}>
        <GlobalProvider>
          <main style={{ height: "calc(100vh - 72px)" }}>
            <div className="w-full flex fixed z-40 items-center bg-[#F8F8F8] shadow-md">
              <Navbar />
            </div>
            <div className="flex justify-between text-black h-full relative z-10 top-20">
              <div className="w-[20%] fixed">
                <Sidebar />
              </div>

              <div className="w-[55%] relative z-20 left-[19%]">{children}</div>

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
