"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContexts";

export function useGoogleLogin(redirectPath?: string) {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const token = await login();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error(`로그인 실패 (${response.status})`);

      const userData = await response.json();

      if (userData.role === "admin") {
        router.push("/admin");
      } else {
        router.push(redirectPath || "/");
      }
    } catch (err: any) {
      console.error("로그인 실패:", err);
      alert(err.message || "로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleGoogleLogin, isLoading };
}