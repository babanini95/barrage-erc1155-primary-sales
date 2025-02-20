import { useReadContract } from "wagmi";

import { useContractInfo } from "../hooks/data";
import { SALES_CONTRACT_ABI } from "../config/sales/salesContractAbi";
import { erc20Abi } from "viem";
import { UnpackedSaleConfigurationProps } from "~/helpers";

export const useSalesCurrency = (
  saleConfiguration: UnpackedSaleConfigurationProps,
) => {
  const { data: paymentTokenData, isLoading: paymentTokenIsLoading } =
    useReadContract({
      abi: SALES_CONTRACT_ABI,
      functionName: "paymentToken",
      chainId: saleConfiguration.chainId,
      address: saleConfiguration.salesContractAddress,
    });

  const { data: paymentTokenSymbolData } = useReadContract({
    abi: erc20Abi,
    functionName: "symbol",
    chainId: saleConfiguration.chainId,
    address: saleConfiguration.nftTokenAddress,
  })

  const paymentTokenAddress = (paymentTokenData as string) || "";
  const paymentTokenSymbol = (paymentTokenSymbolData as string) || "";

  const {
    data: currencyContractInfoData,
    isLoading: currencyContractInfoIsLoading,
  } = useContractInfo(saleConfiguration.chainId, paymentTokenAddress);

  return {
    data: currencyContractInfoData,
    isLoading: paymentTokenIsLoading || currencyContractInfoIsLoading,
    symbol: paymentTokenSymbol,
  };
};
