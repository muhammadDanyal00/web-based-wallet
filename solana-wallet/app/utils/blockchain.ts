import { Connection, PublicKey, LAMPORTS_PER_SOL  } from "@solana/web3.js";

// Connect to the Solana Devnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// Get wallet balance
export const getBalance = async (publicKey: string) => {
  const balance = await connection.getBalance(new PublicKey(publicKey));
  return balance / LAMPORTS_PER_SOL; // Convert lamports to SOL
};