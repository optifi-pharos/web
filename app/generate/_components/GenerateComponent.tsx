"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import CreateWalletContent from "./CreateWalletContent";
import QuestionnaireContent from "./QuestionnaireContent";
import GeneratedContent from "./GeneratedContent";
import { useAccount } from "wagmi";
import { useAddressAI } from "@/hooks/query/useAddressAI";
import Loading from "@/components/loader/loading";
import useGenerateContent from "@/hooks/query/api/useGeneratedContent";
import TransferContent from "./TransferContent";
import { usePTTBalanceAI } from "@/hooks/query/usePTTBalanceAI";

const GenerateComponent: React.FC = () => {
  const { riskSaved: risk, idProtocolSaved: protocolId } = useGenerateContent();
  const { isConnected } = useAccount();
  const { addressAI, laAI } = useAddressAI();
  const { formatted } = usePTTBalanceAI({ address: addressAI });

  const hasBalance = formatted !== undefined && Number(formatted) >= 0.01;
  const noBalance = formatted !== undefined && Number(formatted) < 0.01;

  if (laAI) return <Loading className="z-[90]" />;

  const timelineData = [
    {
      title: "Create Wallet AI",
      content: <CreateWalletContent addressAI={addressAI} />,
    },
    {
      title: "Transfer Tokens",
      content: !isConnected ? (
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
          Connect your wallet to see the generated content.
        </p>
      ) : addressAI ? (
        <TransferContent addressAI={addressAI} />
      ) : (
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
          You need to create a wallet AI first to transfer Pharos tokens.
        </p>
      ),
    },
    {
      title: "Fill Questionnaire",
      content: !isConnected ? (
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
          Connect your wallet to see the generated content.
        </p>
      ) : addressAI && hasBalance ? (
        <QuestionnaireContent />
      ) : noBalance ? (
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
          You need to transfer Pharos tokens to your wallet AI first.
        </p>
      ) : (
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
          You need to create a wallet AI first to automate the staking.
        </p>
      ),
    },
    {
      title: "Generated Content",
      content: !isConnected ? (
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
          Connect your wallet to see the generated content.
        </p>
      ) : risk && protocolId && hasBalance ? (
        <GeneratedContent risk={risk} protocolId={protocolId} />
      ) : noBalance ? (
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
          You need to transfer Pharos tokens to your wallet AI first.
        </p>
      ) : (
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
          You need to fill the questionnaire first.
        </p>
      ),
    },
  ];

  return <Timeline data={timelineData} />;
};

export default GenerateComponent;