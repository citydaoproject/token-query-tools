export interface NFTOwner {
  nftId: string;
  ownerAddress: string;
}

export interface OwnerNFTs {
  [ownerAddress: string]: string[];
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

interface OwnerAndNFTs {
  ownerAddress: string;
  nftIds: string[];
}

export const groupNFTsByOwner = (owners: NFTOwner[]): OwnerNFTs =>
  buildObject(
    [
      ...owners
        .reduce((nftsByOwner, { ownerAddress, nftId }) => {
          if (!nftsByOwner.has(ownerAddress)) {
            nftsByOwner.set(ownerAddress, { ownerAddress, nftIds: [] });
          }
          nftsByOwner.get(ownerAddress)!.nftIds.push(nftId);
          return nftsByOwner;
        }, new Map<string, OwnerAndNFTs>())
        .values(),
    ].map(sortNFTIds),
    ({ ownerAddress, nftIds }) => [ownerAddress, nftIds],
  );

const sortNFTIds = ({ ownerAddress, nftIds }: OwnerAndNFTs) => ({
  ownerAddress,
  nftIds: nftIds.sort((first, second) => parseInt(first, 10) - parseInt(second, 10)),
});

export type TypedObject<K extends string, V> = {
  [key in K]: V;
};

const buildObject = <O, K extends string, V>(objects: O[], extract: (o: O) => [K, V]): TypedObject<K, V> =>
  objects.reduce((result, currentValue) => {
    const [k, v] = extract(currentValue);
    result[k] = v;
    return result;
  }, {} as TypedObject<K, V>);
