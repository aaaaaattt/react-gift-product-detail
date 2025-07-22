import { useEffect, useState, type ReactNode } from "react";
import { UserInfoContext } from "@/context/UserInfoContext";
import type { User } from "@/context/UserInfoContext";
import { STORAGE_KEYS } from "@/constants/storageKyes";

export function UserInfoProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const s = sessionStorage.getItem(STORAGE_KEYS.USER_INFO);
    if (s) {
      return JSON.parse(s);
    } else {
      return null;
    }
  });
  useEffect(() => {
    if (user) {
      sessionStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.USER_INFO);
    }
  }, [user]);

  return (
    <UserInfoContext.Provider value={{ user, setUser }}>
      {children}
    </UserInfoContext.Provider>
  );
}
