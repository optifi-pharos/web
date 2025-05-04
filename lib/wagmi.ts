import { siteConfig } from '@/config/site';
import {
  getDefaultConfig,
  Chain
} from '@rainbow-me/rainbowkit'

export const pharos = {
  id: 50002,
  name: 'Pharos Devnet',
  nativeCurrency: { name: 'Pharos Token', symbol: 'PTT', decimals: 18 },
  iconUrl: "https://res.cloudinary.com/dutlw7bko/image/upload/v1745240985/hackthon/pharos_zdfrra.png",
  iconBackground: '#fff',
  rpcUrls: {
    default: { http: ["https://devnet.dplabs-internal.com"] },
    public: { http: ["https://devnet.dplabs-internal.com"] }
  },
  blockExplorers: {
    default: { name: 'PharosScan', url: "https://pharosscan.xyz" },
  },
  testnet: true,
} as const satisfies Chain;

export const config = getDefaultConfig({
  appName: siteConfig.name as string,
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string || '',
  chains: [pharos],
})