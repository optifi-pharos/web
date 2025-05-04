import React from 'react'
import { useAccount } from 'wagmi'
import { WalletComponents } from '../wallet';

export default function ButtonConnectWallet({
  children
}: {
  children?: React.ReactNode
}) {
  const { isConnected } = useAccount();

  return (
    <>
      {!isConnected ? (
        <>
          <WalletComponents />
        </>
      ) : (
        <>
          {children}
        </>
      )}
    </>
  )
}
