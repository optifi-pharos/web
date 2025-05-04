"use client"

import {
  useSendTransaction,
  useWaitForTransactionReceipt
} from "wagmi"
import { parseEther } from "viem"
import { useEffect, useState } from "react"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import ModalTransactionCustom from "@/components/modal/modal-transaction-custom"
import { usePTTBalance } from "@/hooks/query/usePTTBalance"
import { usePTTBalanceAI } from "@/hooks/query/usePTTBalanceAI"
import { useAddressAI } from "@/hooks/query/useAddressAI"
import { Loader } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SendPTT({ toAddress }: { toAddress: `0x${string}` }) {
  const [amount, setAmount] = useState("0.05")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [maxBaseFee, setMaxBaseFee] = useState("0.012")
  const [priorityFee, setPriorityFee] = useState("1.5")
  const [gasLimit, setGasLimit] = useState("6885602")
  const [totalGasFee, setTotalGasFee] = useState<string | null>(null)

  const { formatted, symbol } = usePTTBalance()
  const { addressAI } = useAddressAI()
  const { formatted: aiFormatted } = usePTTBalanceAI({ address: addressAI })

  const {
    data: txHash,
    sendTransaction,
    isPending: isSending,
    status,
    error,
  } = useSendTransaction()

  const {
    isLoading: isWaiting,
    isSuccess: isSuccessReceipt,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  })

  useEffect(() => {
    const base = parseFloat(maxBaseFee)
    const priority = parseFloat(priorityFee)
    const limit = parseFloat(gasLimit)

    if (!isNaN(base) && !isNaN(priority) && !isNaN(limit)) {
      const fee = (base + priority) * limit
      const feeInEdu = fee * 1e-9
      setTotalGasFee(feeInEdu.toFixed(9))
    }
  }, [maxBaseFee, priorityFee, gasLimit])

  useEffect(() => {
    if (txHash && isSuccessReceipt) {
      setIsModalOpen(true)
    }
  }, [txHash, isSuccessReceipt])

  const handleSend = () => {
    sendTransaction({
      to: toAddress,
      value: parseEther(amount)
    })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const totalAmount = parseFloat(amount || "0")
  const gasFee = parseFloat(totalGasFee || "0")
  const totalSpend = totalAmount + gasFee
  const userBalance = parseFloat(formatted || "0")

  const isDisabled =
    isSending ||
    !toAddress ||
    !amount ||
    totalAmount < 0.01 ||
    isNaN(totalSpend) ||
    userBalance < totalSpend

  return (
    <div className="max-w-md w-full bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-md space-y-6">
      <div className="flex flex-wrap justify-between">
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-1">
            Your Wallet Balance
          </p>
          <p className="text-lg font-semibold">
            {parseFloat((formatted || "0").toString()).toFixed(4)} {symbol}
          </p>
        </div>

        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-1">
            AI Wallet Balance
          </p>
          <p className="text-lg font-semibold">
            {parseFloat((aiFormatted || "0").toString()).toFixed(4)} {symbol}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Input
          type="number"
          min="0.05"
          step="0.05"
          placeholder="Enter amount to send"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full"
        />
        <p className="text-xs text-neutral-500">
          Minimum: 0.05 PTT. Recommended: 0.1 PTT.
        </p>
      </div>

      <div className="border rounded-xl p-4 space-y-4 bg-neutral-100 dark:bg-neutral-800">
        <p className="font-semibold text-sm text-neutral-800 dark:text-white flex items-center gap-1">
          Network Fee (Gas Fee)
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-neutral-700 dark:text-neutral-300 mb-1 block">
              Max Base Fee (PTT)
            </label>
            <Input
              type="number"
              step="0.000001"
              placeholder="0.012"
              value={maxBaseFee}
              disabled
              onChange={(e) => setMaxBaseFee(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-700 dark:text-neutral-300 mb-1 block">
              Priority Fee (PTT)
            </label>
            <Input
              type="number"
              step="0.000001"
              placeholder="1.5"
              value={priorityFee}
              disabled
              onChange={(e) => setPriorityFee(e.target.value)}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm text-neutral-700 dark:text-neutral-300 mb-1 block">
              Gas Limit
            </label>
            <Input
              type="number"
              step="1"
              placeholder="6885602"
              value={gasLimit}
              disabled
              onChange={(e) => setGasLimit(e.target.value)}
            />
          </div>
        </div>

        <div className="text-sm text-neutral-600 dark:text-neutral-300">
          Estimated gas fee:{" "}
          <span className="font-semibold text-orange-500 dark:text-orange-400">
            {parseFloat(totalGasFee || "0.00").toFixed(4) || "0.000000"} PTT
          </span>{" "}
          <span className="text-neutral-400">(≈ $0.00)</span>
        </div>

        <p className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed">
          Note: This only estimates the gas fee. The actual fee may vary based on network conditions.
        </p>
      </div>


      <Button
        onPress={handleSend}
        disabled={isDisabled}
        type="button"
        variant="solid"
        color="warning"
        className={cn("w-full transition-colors", isDisabled && "opacity-50 hover:bg-yellow-500/70 cursor-not-allowed")}
      >
        {isSending || isWaiting ? (
          <div className="flex items-center justify-center gap-2">
            <Loader className="animate-spin" />
            Sending...
          </div>
        ) : (
          "Send PTT"
        )}
      </Button>

      <p className="text-sm text-neutral-300">
        Note: If you don&apos;t have any PTT tokens, you can claim them from faucet{" "}
        <a
          href="https://hackquest.io.com/"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          Hackquest Faucet
        </a>
      </p>

      <ModalTransactionCustom
        isOpen={isModalOpen}
        setIsOpen={handleCloseModal}
        data={txHash || ""}
        name="transfer"
        status={status || ""}
        errorMessage={error?.message || undefined}
      />
    </div>
  )
}