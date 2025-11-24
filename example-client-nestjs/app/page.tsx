"use client";
import AuthenticatedComponent from "@/components/authComponent";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <p>Loading...</p>;
  if (!user) router.push("/login");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        {user ? (
          <>
            <p>{user.username}</p>
            <AuthenticatedComponent />
          </>
        ) : null}
      </main>
    </div>
  );
}
