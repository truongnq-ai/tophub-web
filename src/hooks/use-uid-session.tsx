"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { setActiveUidCookieAction, getActiveUidCookieAction } from "@/actions/players";

export interface SavedAccount {
  uid: string;
  nickname: string;
  server_id: string;
  added_at: number;
}

interface UidSessionContextType {
  activeAccount: SavedAccount | null;
  savedAccounts: SavedAccount[];
  isLoaded: boolean;
  selectAccount: (account: SavedAccount) => Promise<void>;
  saveAccount: (account: SavedAccount) => Promise<void>;
  removeSavedAccount: (uid: string) => Promise<void>;
  logout: () => Promise<void>;
}

const STORAGE_KEY = "tophub_saved_accounts";

const UidSessionContext = createContext<UidSessionContextType>({
  activeAccount: null,
  savedAccounts: [],
  isLoaded: false,
  selectAccount: async () => {},
  saveAccount: async () => {},
  removeSavedAccount: async () => {},
  logout: async () => {},
});

function safeReadStorage(): SavedAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function safeWriteStorage(accounts: SavedAccount[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
  } catch {
    // Graceful fallback if storage quota exceeded or disabled
  }
}

export function UidSessionProvider({ children }: { children: React.ReactNode }) {
  const [savedAccounts, setSavedAccounts] = useState<SavedAccount[]>([]);
  const [activeAccount, setActiveAccount] = useState<SavedAccount | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage & Cookie on mount
  useEffect(() => {
    const loadSession = async () => {
      const stored = safeReadStorage();
      setSavedAccounts(stored);

      try {
        const activeUidCookie = await getActiveUidCookieAction();
        if (activeUidCookie && stored.length > 0) {
          const match = stored.find((a) => a.uid === activeUidCookie);
          if (match) {
            setActiveAccount(match);
          }
        }
      } catch {
        // Non-blocking cookie read failure
      } finally {
        setIsLoaded(true);
      }
    };

    loadSession();
  }, []);

  const selectAccount = useCallback(async (account: SavedAccount) => {
    setActiveAccount(account);
    await setActiveUidCookieAction(account.uid);
  }, []);

  const saveAccount = useCallback(
    async (account: SavedAccount) => {
      const current = safeReadStorage();
      const existingIdx = current.findIndex((a) => a.uid === account.uid);
      let updated: SavedAccount[];
      if (existingIdx >= 0) {
        updated = [...current];
        updated[existingIdx] = { ...updated[existingIdx], ...account };
      } else {
        updated = [account, ...current];
      }
      safeWriteStorage(updated);
      setSavedAccounts(updated);
      await selectAccount(account);
    },
    [selectAccount]
  );

  const removeSavedAccount = useCallback(
    async (uid: string) => {
      const current = safeReadStorage();
      const updated = current.filter((a) => a.uid !== uid);
      safeWriteStorage(updated);
      setSavedAccounts(updated);

      if (activeAccount?.uid === uid) {
        setActiveAccount(null);
        await setActiveUidCookieAction(null);
      }
    },
    [activeAccount]
  );

  const logout = useCallback(async () => {
    setActiveAccount(null);
    await setActiveUidCookieAction(null);
  }, []);

  return (
    <UidSessionContext.Provider
      value={{
        activeAccount,
        savedAccounts,
        isLoaded,
        selectAccount,
        saveAccount,
        removeSavedAccount,
        logout,
      }}
    >
      {children}
    </UidSessionContext.Provider>
  );
}

export function useUidSession() {
  return useContext(UidSessionContext);
}
