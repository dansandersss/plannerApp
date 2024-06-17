"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import { checkAuth } from "@/lib/appwrite";

export default function Main() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false); // Состояние для проверки аутентификации
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        router.push("/login");
      } else {
        setAuthenticated(true);
        setTimeout(() => setLoading(false), 2000); // Запуск загрузчика после успешной аутентификации
      }
    };

    authenticate();
  }, [router]);

  useEffect(() => {
    if (authenticated && !loading) {
      router.push("/dashboard");
    }
  }, [authenticated, loading, router]);

  return (
    <>
      <div>
        {authenticated && loading ? (
          <div>
            <Loader loadingTime={2} />
          </div>
        ) : null}
      </div>
    </>
  );
}
