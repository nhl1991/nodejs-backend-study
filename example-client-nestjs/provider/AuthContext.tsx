"use client";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

interface AuthContext {
    user: User | null,
    loading: boolean,
    setUser: Dispatch<SetStateAction<User|null>>
}

interface User {
    id: number,
    email: string,
    username: string,
    createdDt: number,
}

// useAuth.ts
export const AuthContext = createContext<AuthContext|null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState(true);

  // 앱 처음 로드될 때 한 번만 실행
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/test-auth", { credentials: "include" });
        if (!res.ok) {
          setUser(null);
        } else {
          const data = await res.json();
          setUser(data.user); // Nest /test-guard2에서 온 req.user
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
