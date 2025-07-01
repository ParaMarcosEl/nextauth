"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { setUser, clearUser } from "@/lib/slices/userSlice";

export default function SessionSync() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(setUser({
        id: session.user.id ?? "", // fallback to empty string if null
        name: session.user.name ?? "",
        email: session.user.email ?? "",
      }));
    } else if (status === "unauthenticated") {
      dispatch(clearUser());
    }
  }, [session, status, dispatch]);

  return null; // this component doesn’t render anything
}
