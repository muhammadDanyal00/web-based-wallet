import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";

// Generate a single mnemonic phrase
export const generateMnemonic = () => {
  return bip39.generateMnemonic();
};

// Derive a wallet from the mnemonic and an index
export const deriveWalletFromMnemonic = (mnemonic: string, index: number) => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const path = `m/44'/501'/${index}'/0'`; // Derivation path for Solana
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const keypair = Keypair.fromSeed(derivedSeed);

  return {
    publicKey: keypair.publicKey.toString(),
    privateKey: Buffer.from(keypair.secretKey).toString("hex"),
    keypair, // Include the Keypair object for blockchain interactions
  };
};