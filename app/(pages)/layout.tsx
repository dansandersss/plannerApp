import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import TodoList from "@/components/TodoList/TodoList";
import Navbar from "@/components/NavBar/Navbar";
import GlobalProvider from "@/context/GlobalProvider";
import { SidebarProvider } from "@/components/Sidebar/SidebarContext";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Task Flow",
  description: "The best way to keep your tasks straight",
  icons: {
    icon: "/icons/Taskflow_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${roboto.className} bg-dark-2 text-white bg-white`}>
        <SidebarProvider>
          <GlobalProvider>
            <main className="main">
              <div className="w-full flex fixed z-40 items-center bg-[#F8F8F8] shadow-md">
                <Navbar />
              </div>
              <div className="flex justify-between text-black h-full relative z-10 top-0 lg:top-20">
                <div className="sm:h-auto w-full sm:w-[30%] md:w-[25%] lg:w-[20%] fixed z-50">
                  <Sidebar />
                </div>

                <div className="flex items-center lg:hidden flex-col">
                  <div className="w-[90%]">{children}</div>
                  <div className="w-[70%]">
                    <TodoList />
                  </div>
                </div>

                <div className="w-[55%] hidden lg:block relative z-20 left-[19%]">
                  {children}
                </div>

                <div className="w-[25%] hidden lg:block">
                  <TodoList />
                </div>
              </div>
            </main>
          </GlobalProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
