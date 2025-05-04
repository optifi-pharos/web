import ModalTransactionCustom from "@/components/modal/modal-transaction-custom";
import { useMintAI } from "@/hooks/mutation/api/useMintAI";
import { cn } from "@/lib/utils";
import { ListTokenResponse, TokenResponse } from "@/types/api/token.types";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Wallet } from "lucide-react";
import { useCallback, useState } from "react";

export function FaucetComponent({
  token,
}: {
  token?: ListTokenResponse;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {token?.map((item, index) => (
        <Feature
          key={index}
          index={index}
          token={item}
          buttonColor={"success"}
        />
      ))}
    </div>
  );
}

const Feature = ({
  index,
  token,
  buttonColor
}: {
  index: number;
  token: TokenResponse;
  buttonColor: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { mutation: mintMutation, result } = useMintAI();

  const handleMint = async () => {
    mintMutation.mutate({
      asset_id: token.symbol.toLowerCase(),
      amount: "1000"
    }, {
      onSuccess: () => {
        setIsModalOpen(true);
      }
    });
  }

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800 items-center justify-center",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="flex w-full justify-center items-center">
        <Image src={token?.logo} alt={token.name} width={50} height={50} className="mx-auto rounded-full" />
      </div>

      <Button
        variant="flat"
        color={buttonColor as "success" | "secondary" | "warning" | "primary" | "default" | "danger" | undefined}
        className={cn("mt-4 mx-10", `flex flex-row items-center`)}
        onPress={handleMint}
      >
        <Wallet className="w-4 h-4" />
        <span>Claim 1000 ${token.symbol}</span>
      </Button>

      <ModalTransactionCustom
        isOpen={isModalOpen}
        setIsOpen={closeModal}
        status={mintMutation.status || ""}
        data={result?.txhash || ""}
        errorMessage={mintMutation.error?.message || undefined}
        name='mint'
      />
    </div>
  );
};