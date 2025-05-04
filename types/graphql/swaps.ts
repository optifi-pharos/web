import { z } from "zod";

export const SwapsResponseSchema = z.object({
  items: z.array(
    z.object({
      user: z.string(),
      amount: z.string(),
      tokenIn: z.string(),
      tokenOut: z.string(),
      transactionHash: z.string(),
    })
  )
});

export const SwapsSchema = z.object({
  user: z.string(),
  amount: z.string(),
  tokenIn: z.string(),
  tokenOut: z.string(),
  transactionHash: z.string(),
});

export type SwapsResponse = z.infer<typeof SwapsResponseSchema>;
export type Swaps = z.infer<typeof SwapsSchema>;