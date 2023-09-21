"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "./(components)/global/LoadingScreen";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    return router.push("/dashboard");
  }, []);

  return <LoadingScreen />;
}
