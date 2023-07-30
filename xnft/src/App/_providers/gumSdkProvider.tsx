
import { GumProvider, SessionWalletProvider, UploaderProvider, useSessionKeyManager } from '@gumhq/react-sdk';
import { AnchorWallet, useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useGumSDK } from '../_hooks/useGumSDK';
import React from 'react';
interface GumSDKProviderProps {
  children: React.ReactNode;
}

const GumSDKProvider: React.FC<GumSDKProviderProps> = ({ children }) => {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet() as AnchorWallet;
  const sdk = useGumSDK();
  const sessionWallet = useSessionKeyManager(anchorWallet, connection, "devnet");

  if (!sdk) {
    return null;
  }

  return (
    <GumProvider sdk={sdk}>
      <SessionWalletProvider sessionWallet={sessionWallet}>
        <UploaderProvider
            uploaderType="arweave"
            connection={connection}
            cluster="devnet"
          >
            {children}
        </UploaderProvider>
      </SessionWalletProvider>
    </GumProvider>
  );
};

export default GumSDKProvider;