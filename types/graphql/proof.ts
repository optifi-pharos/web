import { z } from "zod";

export const ProofResponseSchema = z.object({
  items: z.array(
    z.object({
      taskIndex: z.string(),
      signature: z.string(),
      task_stakingAddress: z.string(),
      task_accountAddress: z.string(),
      transactionHash: z.string(),
    })
  )
});

export const ProofSchema = z.object({
  taskIndex: z.string(),
  signature: z.string(),
  task_stakingAddress: z.string(),
  task_accountAddress: z.string(),
  transactionHash: z.string(),
});

export type ProofResponse = z.infer<typeof ProofResponseSchema>;
export type Proof = z.infer<typeof ProofSchema>;