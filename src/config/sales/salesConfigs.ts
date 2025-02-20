type SaleConfiguration = {
  nftTokenAddress: `0x${string}`;
  salesContractAddress: `0x${string}`;
  chainId: number;
  itemsForSale: string[];
};

export const salesConfigs: SaleConfiguration[] = [
  {
    nftTokenAddress: "0xab4fb36ba3511f5c825f2d0ea3927d7773fff1a1",
    salesContractAddress: "0x90f432c8d033a37eac963cab3d4535461924d7a4",
    chainId: 11155111,
    itemsForSale: ["0", "1", "2"],
  }
];

// This value must match one of the chainIds present in your salesConfigurations.
export const defaultChainId = 11155111; //polygonAmoy
