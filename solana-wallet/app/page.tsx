"use client";

import { useState } from "react";
import { useWallet } from "./hooks/useWallet";

export default function Home() {
  const {
    mnemonic,
    wallets,
    createWallet,
    togglePrivateKeyVisibility,
    clearWallets,
    updateBalance,
  } = useWallet();
  const [showNotification, setShowNotification] = useState(false);

  const handleCreateWallet = () => {
    createWallet();
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="container">
      <h1>Solana Web-Based Wallet</h1>
      <button onClick={handleCreateWallet} className="button">
        Generate New Wallet
      </button>

      {wallets.length > 0 && (
        <button
          onClick={clearWallets}
          className="button"
          style={{ backgroundColor: wallets.length > 1 ? "#ff6b6b" : "#4a90e2" }}
        >
          {wallets.length > 1 ? "Clear All Wallets" : "Clear"}
        </button>
      )}

      {showNotification && (
        <div className="notification">
          <p>Wallet created successfully!</p>
        </div>
      )}

      {mnemonic && (
        <div className="mnemonic-card">
          <h2>Your Mnemonic Phrase</h2>
          <div className="mnemonic">
            {mnemonic.split(" ").map((word, i) => (
              <span key={i}>{word}</span>
            ))}
          </div>
          <p style={{ color: "red", marginTop: "10px" }}>
            ⚠️ Save this phrase securely. It can be used to recover all wallets.
          </p>
        </div>
      )}

      {wallets.map((wallet, index) => (
        <div key={index} className="wallet-card">
          <h2>Wallet {index + 1}</h2>
          <p>
            <strong>Public Key:</strong> {wallet.publicKey}
          </p>
          <p>
            <strong>Private Key:</strong>{" "}
            <span className="private-key">
              {wallet.showPrivateKey ? wallet.privateKey : "••••••••••••"}
            </span>
            <button
              onClick={() => togglePrivateKeyVisibility(index)}
              className="eye-button"
            >
              {wallet.showPrivateKey ? "👁️" : "👁️‍🗨️"}
            </button>
          </p>
          <p className="balance">
            <strong>Balance:</strong>{" "}
            {wallet.balance !== null ? `${wallet.balance} SOL` : "Loading..."}
          </p>
          <button
            onClick={() => updateBalance(index, wallet.publicKey)}
            className="button"
          >
            Refresh Balance
          </button>
        </div>
      ))}
    </div>
  );
}