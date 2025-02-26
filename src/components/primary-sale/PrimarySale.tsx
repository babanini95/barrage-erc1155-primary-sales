import { Image } from "boilerplate-design-system";
import { MintedProgressBar } from "~/components/minted-progress-bar/MintedProgressBar";

type Collection = {
  name?: string;
  image?: string;
  description?: string;
};

type MintingDetails = {
  totalMintedPercentage: number;
  totalNftMinted: number;
  totalNftSupply: number;
  totalMintedPercentagePerId: number[] | undefined;
  totalNftMintedPerId: number[] | undefined;
  totalNftSupplyPerId: number[] | undefined;
};

type PrimarySaleProps = {
  collection: Collection;
  minting: MintingDetails;
};

export function PrimarySale({ collection, minting }: PrimarySaleProps) {
  return (
    <div className="flex gap-4 w-full sm:flex-row flex-col text-left">
      {collection.image ? (
        <Image
          src={collection.image}
          alt={collection.name}
          className="sm:w-[8rem] w-full max-w-[28rem] mx-auto aspect-square rounded-[0.5rem]"
        />
      ) : null}
      <div className="flex flex-col items-start w-full">
        <div className="flex items-start flex-col flex-1 gap-2">
          <h3 className="text-20 font-bold leading-tight">{collection.name}</h3>
          {collection.description ? (
            <p className="text-14">{collection.description}</p>
          ) : null}
        </div>
        <div className="mt-auto mb-0 w-full pt-4">
          {/* <MintedProgressBar
            mintedPercentage={minting.totalMintedPercentage}
            mintedValue={minting.totalNftMinted}
            supplyValue={minting.totalNftSupply}
            showTotalMintedPercentage
          /> */}
          <>
            {
              minting.totalMintedPercentagePerId ? (
                minting.totalMintedPercentagePerId.map((mintedPercentage, index) => (
                  <MintedProgressBar
                    key={index}
                    mintedPercentage={mintedPercentage}
                    mintedValue={minting.totalNftMintedPerId ? minting.totalNftMintedPerId[index] : 0}
                    supplyValue={minting.totalNftSupplyPerId ? minting.totalNftSupplyPerId[index] : 0}
                    showTotalMintedPercentage
                    tokenId={index}
                    showtokenId={true}
                  />
                ))
              ) : null
            }
          </>
        </div>
      </div>
    </div>
  );
}
