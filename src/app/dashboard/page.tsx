"use client"
import { useUser } from "@/hooks/useUser";

export default function Dashboard() {
  const user = useUser();
  if (!user) return <div>Not authorized</div>;

  return <div>Welcome, {user?.email}!</div>;
}
