import { MockStakingABI } from "@/lib/abis/MockStakingABI";
import { denormalize, valueToBigInt } from "@/lib/bignumber";
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

export const useStake = () => {
  const { address: userAddress } = useAccount();

  const [steps, setSteps] = useState<
    Array<{
      step: number;
      status: Status;
      error?: string;
    }>
  >([
    {
      step: 1,
      status: "idle",
    },
  ]);

  const [txHash, setTxHash] = useState<HexAddress | null>(null);

  const mutation = useMutation({
    mutationFn: async ({
      days,
      addressSpender,
      addressToken,
      amount,
      decimals
    }: {
      days: string;
      addressSpender: HexAddress;
      addressToken: HexAddress;
      amount: string;
      decimals: number;
    }) => {
      try {
        // Reset steps
        setSteps([{ step: 1, status: "idle" }]);

        if (!amount || !userAddress) {
          throw new Error("Invalid parameters");
        }

        const dAmount = denormalize(amount || "0", decimals);

        setSteps((prev) =>
          prev.map((item) => {
            if (item.step === 1) {
              return { ...item, status: "loading" };
            }
            return item;
          })
        );

        const approveHash = await writeContract(config, {
          address: addressToken,
          abi: erc20Abi,
          functionName: "approve",
          args: [
            addressSpender,
            valueToBigInt(dAmount + 10),
          ],
        });

        await waitForTransactionReceipt(config, {
          hash: approveHash,
        });

        setSteps((prev) =>
          prev.map((item) => {
            if (item.step === 1) {
              return { ...item, status: "success" };
            }
            return item;
          })
        );

        const txHash = await writeContract(config, {
          address: addressSpender,
          abi: MockStakingABI,
          functionName: "stake",
          args: [
            days,
            dAmount,
          ],
        });

        setTxHash(txHash);

        const result = await waitForTransactionReceipt(config, {
          hash: txHash,
        });

        setSteps((prev) =>
          prev.map((item) => {
            if (item.step === 1) {
              return { ...item, status: "success" };
            }
            return item;
          })
        );

        return result;
      } catch (e) {
        console.error("Bid Error", e);

        setSteps((prev) =>
          prev.map((step) => {
            if (step.status === "loading") {
              return { ...step, status: "error", error: (e as Error).message };
            }
            return step;
          })
        );

        throw e;
      }
    },
  });

  return { steps, mutation, txHash };
};