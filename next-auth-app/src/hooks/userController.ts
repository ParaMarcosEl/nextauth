"use client";

import { useState } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
};

export type CreateUserDTO = Omit<User, "id">;
export type UpdateUserDTO = Partial<Omit<User, "id">>;

export function useUserController() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUser = async (id: string): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/users/${id}`);
      if (!res.ok) throw new Error("Failed to fetch user");
      const data: User = await res.json();
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: CreateUserDTO): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) throw new Error("Failed to create user");
      const data: User = await res.json();
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, updates: UpdateUserDTO): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update user");
      const data: User = await res.json();
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loading,
    error,
  };
}
