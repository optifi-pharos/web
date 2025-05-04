import { z } from "zod";

export const WithdrawsResponseSchema = z.object({
  items: z.array(
    z.object({
      amount: z.string(),
      transactionHash: z.string(),
      withdrawer: z.string(),
    })
  )
});

export const WithdrawsSchema = z.object({
  amount: z.string(),
  transactionHash: z.string(),
  withdrawer: z.string(),
});

export type WithdrawsResponse = z.infer<typeof WithdrawsResponseSchema>;
export type Withdraws = z.infer<typeof WithdrawsSchema>;