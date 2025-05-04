"use client";

import { subtitle } from '@/components/primitives'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import React from 'react'
import { useToken } from '@/hooks/query/api/useToken';
import WalletConnection from '@/components/wallet-connection';
import { useAccount } from 'wagmi';
import { FaucetComponent } from './_components/FaucetComponents';

export default function Page() {
  const { tData } = useToken();
  const { isConnected } = useAccount();

  return (
    <section id='faucet' className='w-full'>
      {isConnected ?
        <div className="py-5 overflow-x-hidden w-full">
          <div className="flex flex-col gap-3 items-start">
            <div className="flex flex-col items-start justify-start pb-5">
              <motion.span
                className={cn(subtitle({ sizeText: "xl" }), "font-bold text-start")}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Faucet
              </motion.span>
              <motion.span
                className={cn(subtitle(), "text-start")}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Claims your faucet for testing purpose here.
              </motion.span>
            </div>
            <div>
              <FaucetComponent token={tData} />
            </div>
          </div>
        </div>
        :
        <div className='flex w-full items-center justify-center relative'>
          <WalletConnection />
        </div>
      }
    </section>
  )
}