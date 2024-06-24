"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

interface LoadingWrapperProps {
  children: ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  if (loading) {
    return <Loader loadingTime={2} />;
  }

  return <>{children}</>;
};

export default LoadingWrapper;
