"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import { checkAuth } from "@/lib/appwrite";

export default function Main() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };

    authenticate();
  }, [router]);

  useEffect(() => {
    if (!loading) {
      router.push("/dashboard");
    }
  }, [loading, router]);

  if (loading) {
    return <Loader loadingTime={2} />;
  }

  return null;
}
