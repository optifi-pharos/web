"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@heroui/button';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/modal';
import { Avatar } from '@heroui/avatar';
import { Card, CardBody } from '@heroui/card';
import { useStaking } from '@/hooks/query/useStaking';
import { useAccountBalance } from '@/hooks/query/useAccountBalance';
import { useAccount } from 'wagmi';
import AddressSwitcher from '../switch/switch-address';
import { useTransfer } from '@/hooks/mutation/useTransfer';
import ModalTransactionCustom from '../modal/modal-transaction-custom';

interface Token {
  idProtocol: string;
  addressToken: string;
  nameToken: string;
  logo: string;
  apy: number;
  chain: string;
}

interface TransferCardProps {
  recipientAddress?: string;
}

const TransferCard: React.FC<TransferCardProps> = () => {
  const { sData } = useStaking();
  const { address } = useAccount();
  const { mutation, txHash } = useTransfer();

  const [selectedAddress, setSelectedAddress] = useState(address);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [isTokenModalOpen, setIsTokenModalOpen] = useState<boolean>(false);

  const uniqueTokens = useMemo(() => {
    if (!sData) return [];
    
    const uniqueTokenMap = new Map<string, Token>();
    
    sData.forEach(token => {
      if (!uniqueTokenMap.has(token.addressToken)) {
        uniqueTokenMap.set(token.addressToken, token);
      }
    });
    
    return Array.from(uniqueTokenMap.values());
  }, [sData]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (uniqueTokens.length > 0 && !selectedToken) {
      setSelectedToken(uniqueTokens[0]);
    }
  }, [uniqueTokens, selectedToken]);

  const { bNormalized: balance, bRefetch: balanceRefetch } = useAccountBalance({
    token: selectedToken?.addressToken as HexAddress,
    decimal: 6
  });

  useEffect(() => {
    if (selectedToken) balanceRefetch();
  }, [selectedToken, balanceRefetch]);

  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token);
    setIsTokenModalOpen(false);
  };

  const validateTransfer = () => {
    const currentBalance = parseFloat(balance?.toString() || '0');
    const transferAmount = parseFloat(amount || '0');

    return (
      !!selectedToken &&
      !!amount &&
      transferAmount > 0 &&
      transferAmount <= currentBalance
    );
  };
  
  const handleAddressChange = (newAddress: HexAddress) => {
    setSelectedAddress(newAddress);
    balanceRefetch();
  };

  const handleTransfer = () => {
    if (validateTransfer()) {
      mutation.mutate({
        addressToken: selectedToken?.addressToken as HexAddress,
        amount: amount,
        toAddress: selectedAddress as HexAddress
      });
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <AddressSwitcher onAddressChange={handleAddressChange} />
      <Card className="p-0.2 rounded-[20px] bg-background/50">
        <CardBody>
          <div className="flex flex-col gap-4">
            <div className="p-5 py-7 rounded-[20px] border-1 border-gray-600">
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col items-start">
                  <span className="text-gray-400">Amount to Transfer</span>
                  <input
                    type="string"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value)) {
                        setAmount(value);
                      }
                    }}
                    className="text-2xl font-bold w-full bg-transparent outline-none py-2"
                  />
                  <span className="text-right text-sm text-gray-500">
                    Balance: {balance || '0.00'}
                  </span>
                </div>
                <Button
                  variant="faded"
                  onPress={() => setIsTokenModalOpen(true)}
                >
                  {selectedToken ? (
                    <div className="flex items-center">
                      <Avatar
                        src={selectedToken.logo}
                        alt={selectedToken.nameToken}
                        className="w-6 h-6 mr-2"
                      />
                      {selectedToken.nameToken}
                    </div>
                  ) : (
                    'Select Token'
                  )}
                  <ChevronDown size={16} className="ml-2" />
                </Button>
              </div>
            </div>
            
            <Button
              onPress={handleTransfer}
              disabled={!validateTransfer()}
              color="warning"
              variant="solid"
            >
              Transfer
            </Button>
          </div>
        </CardBody>
      </Card>

      <Modal
        isOpen={isTokenModalOpen}
        onOpenChange={setIsTokenModalOpen}
      >
        <ModalContent>
          <ModalHeader>Select Token</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              {uniqueTokens.map((token, idx) => (
                <Button
                  key={idx}
                  variant="bordered"
                  color="default"
                  onPress={() => handleTokenSelect(token)}
                  className="flex flex-row justify-center items-center p-3"
                >
                  <Avatar
                    src={token.logo}
                    alt={token.nameToken}
                    className="w-4 h-4"
                  />
                  <div className="text-center">
                    <h4 className="font-semibold">{token.nameToken}</h4>
                  </div>
                </Button>
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ModalTransactionCustom
        isOpen={isModalOpen}
        setIsOpen={handleCloseModal}
        data={txHash || ""}
        name="transfer"
        status={mutation.status || ""}
        errorMessage={mutation.error?.message || undefined}
      />
    </div>
  );
};

export default TransferCard;