import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Image } from "@heroui/image";
import { Button } from '@heroui/button';

const buttonBaseStyles = "rounded-full hover:rounded-full";

const ChainIcon = ({ iconUrl, name, background, size = 20 }: {
  iconUrl?: string;
  name?: string;
  background?: string;
  size?: number;
}) => (
  <div
    style={{
      background,
      width: size,
      height: size,
      borderRadius: 999,
      overflow: 'hidden',
      marginRight: 4,
    }}
  >
    {iconUrl && (
      <Image
        alt={`${name ?? 'Chain'} icon`}
        src={iconUrl}
        style={{ width: size, height: size }}
      />
    )}
  </div>
);

const GradientButton = ({ children, onClick, variant = 'flat' }: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'flat' | 'ghost';
}) => (
  <Button
    onPress={onClick}
    variant={variant}
    className={`${buttonBaseStyles} flex items-center`}
  >
    {children}
  </Button>
);

export function WalletComponents() {
  return <ConnectButtonWalletComponents />;
}

export const ConnectButtonWalletComponents = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        if (!mounted) {
          return (
            <div
              aria-hidden="true"
              style={{
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />
          );
        }

        const connected = account && chain;

        if (!connected) {
          return (
            <GradientButton onClick={openConnectModal} variant="flat">
              Connect Wallet
            </GradientButton>
          );
        }

        if (chain?.unsupported) {
          return (
            <GradientButton onClick={openChainModal}>
              Wrong network
            </GradientButton>
          );
        }

        return (
          <div className="flex-row flex gap-3 z-50">
            <GradientButton onClick={openChainModal}>
              {chain.hasIcon && (
                <div className='min-w-5'>
                  <ChainIcon
                    iconUrl={chain.iconUrl}
                    name={chain.name}
                    background={chain.iconBackground}
                  />
                </div>
              )}
              <span className='max-w-32 truncate'>
                {chain.name}
              </span>
            </GradientButton>

            <GradientButton onClick={openAccountModal}>
              {account.displayName}
              {account.displayBalance && ` (${account.displayBalance})`}
            </GradientButton>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};