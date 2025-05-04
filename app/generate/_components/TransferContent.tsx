import React from 'react'
import SendEDU from './SendEDU'

export default function TransferContent({
  addressAI
}: {
  addressAI: HexAddress
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal">
        You need to transfer native EDU Testnet tokens to your AI wallet to cover gas fees for transactions.
      </p>
      <SendEDU toAddress={addressAI}/>
    </div>
  )
}
