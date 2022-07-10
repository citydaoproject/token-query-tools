export interface NFTOwner {
  nftId: string;
  ownerAddress: string;
}

export interface CitizenOwner {
  ownerAddress: string;
  first: number;
  founder: number;
  citizen: number;
}

export interface CitizenOwnerCounts {
  [ownerAddress: string]: number;
}

export enum CitizenTokenType {
  first = 7,
  founder = 69,
  citizen = 42,
}

export interface OwnerWithNFTs {
  ownerAddress: string;
  nftIds: string[];
}

export const groupNFTsWithOwners = (owners: NFTOwner[]): OwnerWithNFTs[] =>
  sortOwnersWithNFTs(
    [
      ...owners
        .reduce((nftsByOwner, { ownerAddress, nftId }) => {
          if (!nftsByOwner.has(ownerAddress)) {
            nftsByOwner.set(ownerAddress, { ownerAddress, nftIds: [] });
          }
          nftsByOwner.get(ownerAddress)!.nftIds.push(nftId);
          return nftsByOwner;
        }, new Map<string, OwnerWithNFTs>())
        .values(),
    ].map(sortNFTIds),
  );

const sortOwnersWithNFTs = (ownersWithNFTs: OwnerWithNFTs[]) =>
  ownersWithNFTs.sort((first, second) => {
    if (first.nftIds.length !== second.nftIds.length) {
      return second.nftIds.length - first.nftIds.length;
    }

    if (first.ownerAddress < second.ownerAddress) {
      return -1;
    }

    if (first.ownerAddress > second.ownerAddress) {
      return 1;
    }

    return 0;
  });

const sortNFTIds = ({ ownerAddress, nftIds }: OwnerWithNFTs) => ({
  ownerAddress,
  nftIds: nftIds.sort((first, second) => parseInt(first, 10) - parseInt(second, 10)),
});
