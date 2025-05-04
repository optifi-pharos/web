import { z } from "zod";

export const TransfersResponseSchema = z.object({
  items: z.array(
    z.object({
      from: z.string(),
      to: z.string(),
      value: z.string(),
      transactionHash: z.string(),
    })
  )
});

export const TransfersSchema = z.object({
  from: z.string(),
  to: z.string(),
  value: z.string(),
  transactionHash: z.string(),
});

export type TransfersResponse = z.infer<typeof TransfersResponseSchema>;
export type Transfers = z.infer<typeof TransfersSchema>;