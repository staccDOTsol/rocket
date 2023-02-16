import {
    ConnectionProvider,
    WalletProvider,
  } from "@solana/wallet-adapter-react";
  import {
    PhantomWalletAdapter
  } from "@solana/wallet-adapter-phantom";
  import { clusterApiUrl } from "@solana/web3.js";
  import React, { FC, useMemo } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
  
  export const DEFAULT_ENDPOINT =
    process.env.NEXT_PUBLIC_SOLANA_URL || "https://api.devnet.solana.com";
  
  // Default styles that can be overridden by your app
  require("@solana/wallet-adapter-react-ui/styles.css");
  
  export const Wallet: any = ({ children }: any) => {
    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded
    const wallets = useMemo(
      () => [
        new PhantomWalletAdapter()
      ],
      []
    );
  
    return (
      <ConnectionProvider endpoint={DEFAULT_ENDPOINT}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
          {children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    );
  };