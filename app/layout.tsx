import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

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
    <html className="dark">
      <body className={`${roboto.className} bg-white text-white`}>
        {children}
      </body>
    </html>
  );
}
