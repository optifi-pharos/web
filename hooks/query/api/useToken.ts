import { useQuery } from '@tanstack/react-query';
import { ListTokenResponse } from '@/types/api/token.types';

interface Token {
  tokens: ListTokenResponse;
}

export const useToken = () => {
  const { data, isLoading, refetch, error } = useQuery<Token>({
    queryKey: ['token'],
    queryFn: async () => {
      const response = await fetch(`/api/token`)
      if (!response.ok) {
        throw new Error("Failed to fetch token data")
      }
      return response.json()
    },
  });

  const datas: ListTokenResponse = data?.tokens || [];

  return {
    tData: datas,
    tLoading: isLoading,
    tRefetch: refetch,
    tError: error,
  }
};