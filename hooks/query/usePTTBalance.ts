import { pharos } from '@/lib/wagmi'
import { useBalance, useAccount } from 'wagmi'

export function usePTTBalance({
  address = undefined
}: {
  address?: HexAddress
} = {}) { 
  const { address: userAddress } = useAccount()

  const usedAddress = address || userAddress

  const {
    data: balance,
    isLoading,
    isError,
    refetch,
  } = useBalance({
    address: usedAddress,
    chainId: pharos.id,
    query: {
      enabled: !!usedAddress,
    }
  })

  return {
    balance,
    formatted: balance?.formatted,
    symbol: balance?.symbol,
    isLoading,
    isError,
    refetch,
  }
}
