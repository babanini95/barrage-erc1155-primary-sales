import { useMemo } from "react";
import { useReadContract, useReadContracts } from "wagmi";

import { SALES_CONTRACT_ABI } from "~/config/sales/salesContractAbi";
import { NFT_TOKEN_CONTRACT_ABI } from "~/config/nft-token/nftTokenContractAbi";

import { calculateMintedPercentage, getSaleConfiguration } from "~/helpers";

// UI - Library

interface SalesDetailsData {
  cost: bigint;
  endtime: bigint;
  merkleRoot: string;
  startTime: bigint;
  supplyCap: bigint;
}


export function useNFTSales({ chainId }: { chainId?: number }) {
  // Setup the sale configuration based on the chainId
  const saleConfiguration = useMemo(
    () => getSaleConfiguration(chainId),
    [chainId],
  );

  // Fetch the contract info

  // Fetch the currency data

  // Fetch the global sale details data
  const {
    data: globalSaleDetailsData,
    // isLoading: tokenSaleDetailsDataIsLoading,
  } = useReadContract({
    abi: SALES_CONTRACT_ABI,
    functionName: "globalSaleDetails",
    chainId: chainId,
    address: saleConfiguration.salesContractAddress,
  });

  // Fetch the token sale details data
  const { data: tokenSaleDetailsData } = useReadContracts({
    contracts: [{
      abi: SALES_CONTRACT_ABI,
      address: saleConfiguration.salesContractAddress,
      functionName: "tokenSaleDetails",
      args: [0],
      chainId: chainId
    },
    {
      abi: SALES_CONTRACT_ABI,
      address: saleConfiguration.salesContractAddress,
      functionName: "tokenSaleDetails",
      args: [1],
      chainId: chainId
    },
    {
      abi: SALES_CONTRACT_ABI,
      address: saleConfiguration.salesContractAddress,
      functionName: "tokenSaleDetails",
      args: [2],
      chainId: chainId
    }]
  });

  // Fetch the total minted NFTs
  const { data: nftsMinted } = useReadContract({
    abi: NFT_TOKEN_CONTRACT_ABI,
    functionName: "totalSupply",
    chainId: chainId,
    address: saleConfiguration.nftTokenAddress,
  });

  // Fetch the total minted NFTs each tokenId
  const { data: nftsMintedTokenEachId } = useReadContracts({
    contracts: [{
      abi: NFT_TOKEN_CONTRACT_ABI,
      address: saleConfiguration.nftTokenAddress,
      functionName: "tokenSupply",
      chainId: chainId,
      args: [0]
    },
    {
      abi: NFT_TOKEN_CONTRACT_ABI,
      address: saleConfiguration.nftTokenAddress,
      functionName: "tokenSupply",
      chainId: chainId,
      args: [1]
    },
    {
      abi: NFT_TOKEN_CONTRACT_ABI,
      address: saleConfiguration.nftTokenAddress,
      functionName: "tokenSupply",
      chainId: chainId,
      args: [2]
    }]
  });

  const totalSupply =
    (globalSaleDetailsData as SalesDetailsData)?.supplyCap?.toString() ||
    0;

  // const totalSupplyPerId = tokenSaleDetailsData?.map((tokenSaleData) => (tokenSaleData.result as SalesDetailsData)?.supplyCap?.toString() || 0);

  // const totalMintedPerId = nftsMintedTokenEachId?.map((nftsMintedData) => nftsMintedData?.toString() || 0);

  // const totalMintedNftsPercentagePerId = totalMintedPerId?.map((nftMinted) => )
  const tokenSaleDetailPerId = tokenSaleDetailsData?.map((tokenSaleData) => tokenSaleData?.result as SalesDetailsData);
  const nftsMintedPerId = nftsMintedTokenEachId?.map((nftsMintedData) => nftsMintedData?.result?.toString() || 0);
  const tokenSupplyPerId = tokenSaleDetailPerId?.map((tokenSaleData) => (tokenSaleData as SalesDetailsData)?.supplyCap?.toString() || 0);

  const totalMintedNftsPercentage = calculateMintedPercentage(
    Number(nftsMinted),
    Number(totalSupply),
  );

  const totalMintedNftsPercentagePerId = nftsMintedPerId?.map((nftMinted, index) => calculateMintedPercentage(
    Number(nftMinted),
    Number(tokenSupplyPerId ? tokenSupplyPerId[index] : 0),
  ));

  return {
    totalMintedPercentage: Number(totalMintedNftsPercentage),
    totalNftMinted: Number(nftsMinted),
    totalNftSupply: Number(totalSupply),
    // array of data of each tokenId
    totalMintedPercentagePerId: totalMintedNftsPercentagePerId,
    totalNftMintedPerId: nftsMintedPerId?.map((nftMinted) => Number(nftMinted)),
    totalNftSupplyPerId: tokenSupplyPerId?.map((supply) => Number(supply)),
  };
}
