interface MintedProgressBarProps {
  mintedPercentage: number;
  mintedValue: number;
  supplyValue: number;
  totalMintedPercentage?: number;
  showTotalMintedPercentage?: boolean;
  tokenId?: number;
  showtokenId?: boolean;
}

export const MintedProgressBar = ({
  mintedPercentage,
  mintedValue,
  supplyValue,
  totalMintedPercentage,
  showTotalMintedPercentage = false,
  tokenId,
  showtokenId = false,
}: MintedProgressBarProps) => {
  return (
    <div className="flex flex-col gap-1 " style={{ marginBottom: "1rem" }}>
      <div className="flex justify-between">
        {showtokenId ? (
          <span className="text-12 font-medium">Token ID: {tokenId} </span>
        ) : null}
        <span className="text-12 font-medium">
          {mintedValue}/{supplyValue} Minted
        </span>
        {showTotalMintedPercentage ? (
          <span className="text-12 font-medium">{mintedPercentage}%</span>
        ) : null}
      </div>

      <div className="w-full h-[12px] rounded-full overflow-hidden bg-grey-700 relative">
        <div
          className="absolute left-0 h-full rounded-full z-[100] bg-indigo-400"
          style={{
            width: `${mintedPercentage}%`,
            transition: "width 0.5s ease-in-out",
          }}
        ></div>
        {totalMintedPercentage ? (
          <div
            className="absolute left-0 h-full rounded-full z-[50] bg-grey-500"
            style={{
              width: `${totalMintedPercentage}%`,
              transition: "width 0.5s ease-in-out",
            }}
          ></div>
        ) : null}
      </div>
    </div>
  );
};
