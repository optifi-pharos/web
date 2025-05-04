import { OPTIFinanceABI } from "@/lib/abis/OPTIFinanceABI";
import { denormalize, valueToBigInt } from "@/lib/bignumber";
import { ADDRESS_OPTIFI } from "@/lib/constants";
import { config } from "@/lib/wagmi";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { erc20Abi } from "viem";
import { useAccount } from "wagmi";
import {
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";

type Status = "idle" | "loading" | "success" | "error";

export const useSwap = () => {
  const { address: userAddress } = useAccount();

  const [steps, setSteps] = useState<
    Array<{
      step: number;
      status: Status;
      error?: string;
    }>
  >([
    { step: 1, status: "idle" },
    { step: 2, status: "idle" },
  ]);

  const [txHash, setTxHash] = useState<HexAddress | null>(null);

  const mutation = useMutation({
    mutationFn: async ({
      addressTokenIn,
      addressTokenOut,
      amount,
      decimals,
    }: {
      addressTokenIn: HexAddress;
      addressTokenOut: HexAddress;
      amount: string;
      decimals: number;
    }) => {
      try {
        // Reset steps
        setSteps([
          { step: 1, status: "idle" },
          { step: 2, status: "idle" },
        ]);

        if (!amount || !userAddress) {
          throw new Error("Invalid parameters");
        }

        const dAmount = denormalize(amount, decimals);

        setSteps((prev) =>
          prev.map((item) =>
            item.step === 1 ? { ...item, status: "loading" } : item
          )
        );

        await writeContract(config, {
          address: addressTokenIn,
          abi: erc20Abi,
          functionName: "approve",
          args: [ADDRESS_OPTIFI, valueToBigInt(dAmount + 10)],
        });

        // const approveHash = await writeContract(config, {
        //   address: addressTokenIn,
        //   abi: erc20Abi,
        //   functionName: "approve",
        //   args: [ADDRESS_OPTIFI, valueToBigInt(dAmount + 10)],
        // });

        // const approveReceipt = await waitForTransactionReceipt(config, {
        //   hash: approveHash,
        // });

        // if (approveReceipt.status !== "success") {
        //   throw new Error("Approval transaction failed");
        // }

        setSteps((prev) =>
          prev.map((item) =>
            item.step === 1 ? { ...item, status: "success" } : item
          )
        );

        setSteps((prev) =>
          prev.map((item) =>
            item.step === 2 ? { ...item, status: "loading" } : item
          )
        );

        const swapHash = await writeContract(config, {
          address: ADDRESS_OPTIFI,
          abi: OPTIFinanceABI,
          functionName: "swap",
          args: [addressTokenIn, addressTokenOut, valueToBigInt(dAmount)],
        });

        setTxHash(swapHash);

        const swapReceipt = await waitForTransactionReceipt(config, {
          hash: swapHash,
        });

        if (swapReceipt.status !== "success") {
          throw new Error("Swap transaction failed");
        }

        setSteps((prev) =>
          prev.map((item) =>
            item.step === 2 ? { ...item, status: "success" } : item
          )
        );

        return swapReceipt;
      } catch (e) {
        console.error("Swap Error", e);

        setSteps((prev) =>
          prev.map((step) =>
            step.status === "loading"
              ? { ...step, status: "error", error: (e as Error).message }
              : step
          )
        );

        throw e;
      }
    },
  });

  return { steps, mutation, txHash };
};
