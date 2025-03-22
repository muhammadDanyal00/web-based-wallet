"use client";

import { useState } from "react";
import { generateMnemonic, deriveWalletFromMnemonic } from "../utils/wallet";
import { getBalance } from "../utils/blockchain"; // Import getBalance

export const useWallet = () => {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [wallets, setWallets] = useState<
    {
      publicKey: string;
      privateKey: string;
      showPrivateKey: boolean;
      balance: number | null;
    }[]
  >([]);

  const initializeMnemonic = () => {
    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);
    localStorage.setItem("solanaMnemonic", newMnemonic);
  };

  const createWallet = () => {
    if (!mnemonic) {
      initializeMnemonic();
    }
    const newWallet = deriveWalletFromMnemonic(mnemonic, wallets.length);
    setWallets((prev) => [
      ...prev,
      { ...newWallet, showPrivateKey: false, balance: null },
    ]);
  };

  const togglePrivateKeyVisibility = (index: number) => {
    setWallets((prev) =>
      prev.map((wallet, i) =>
        i === index ? { ...wallet, showPrivateKey: !wallet.showPrivateKey } : wallet
      )
    );
  };

  const clearWallets = () => {
    setWallets([]);
    setMnemonic("");
    localStorage.removeItem("solanaMnemonic");
  };

  const updateBalance = async (index: number, publicKey: string) => {
    const balance = await getBalance(publicKey); // Use getBalance
    setWallets((prev) =>
      prev.map((wallet, i) =>
        i === index ? { ...wallet, balance } : wallet
      )
    );
  };

  return {
    mnemonic,
    wallets,
    createWallet,
    togglePrivateKeyVisibility,
    clearWallets,
    updateBalance,
  };
};