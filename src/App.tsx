import { getDefaultWaasConnectors, KitProvider } from "@0xsequence/kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { chains } from "~/helpers";
import { KitCheckoutProvider } from "@0xsequence/kit-checkout";
import "react-toastify/dist/ReactToastify.css";
import { SequenceBoilerplate } from "boilerplate-design-system";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";

import { Connected } from "~/views/Connected";
import { NotConnected } from "~/views/NotConnected";

import { Chain, Transport } from "viem";
import { allNetworks, findNetworkConfig } from "@0xsequence/network";
import { defaultChainId } from "./config/sales/salesConfigs";

import { Toaster } from "sonner";

import "@0xsequence/design-system/styles.css";
import { useNetworkBalance } from "~/hooks/useNetworkBalance";

const queryClient = new QueryClient();

function getTransportConfigs(
  chains: [Chain, ...Chain[]],
): Record<number, Transport> {
  return chains.reduce(
    (acc, chain) => {
      const network = findNetworkConfig(allNetworks, chain.id);
      if (network) acc[chain.id] = http(network.rpcUrl);
      return acc;
    },
    {} as Record<number, Transport>,
  );
}

export default function Layout() {
  const projectAccessKey = import.meta.env.VITE_PROJECT_ACCESS_KEY;
  const waasConfigKey = import.meta.env.VITE_WAAS_CONFIG_KEY;

  const connectors = getDefaultWaasConnectors({
    waasConfigKey,
    google: false,
    apple: false,
    walletConnect: false,
    defaultChainId,
    appName: "Party Barrage",
    projectAccessKey,
  });

  const transports = getTransportConfigs(chains);

  const config = createConfig({
    transports,
    connectors,
    chains,
  });

  const kitConfig = {
    projectAccessKey,
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <KitProvider config={kitConfig}>
          <KitCheckoutProvider>
            <Toaster />
            <App />
          </KitCheckoutProvider>
        </KitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function App() {
  const { isConnected, address, chainId } = useAccount();
  const balance = useNetworkBalance({ address, chainId });

  return (
    <SequenceBoilerplate
      githubUrl="https://github.com/babanini95/barrage-erc1155-primary-sales"
      name="Barrage ERC1155 Primary Sales"
      description="Perform primary sales of 1155 NFTs using Sequence."
      wagmi={{ useAccount, useDisconnect, useSwitchChain }}
      faucetUrl="https://party-barrage-sample.vercel.app/"
      balance={balance ? `${balance}` : false}
      docsUrl="https://sequence.xyz/"

    >
      {isConnected ? <Connected /> : <NotConnected />}
    </SequenceBoilerplate>
  );
}
