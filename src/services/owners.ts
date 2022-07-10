export interface NFTOwner {
  nftId: string;
  ownerAddress: string;
}

export interface OwnerNFTs {
  [ownerAddress: string]: string[];
}

export interface TokenOwner {
  tokenId: string;
  ownerAddress: string;
  amount: string;
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
  first = '7',
  founder = '69',
  citizen = '42',
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

export const buildCitizenOwners = (owners: TokenOwner[]): CitizenOwner[] => [
  ...owners
    .reduce((tokensByOwner, { ownerAddress, tokenId, amount }) => {
      const amountNum = parseInt(amount, 0);

      let citizen = tokensByOwner.get(ownerAddress) || { ownerAddress, first: 0, founder: 0, citizen: 0 };
      switch (tokenId) {
        case CitizenTokenType.first:
          citizen = { ...citizen, first: amountNum };
          break;

        case CitizenTokenType.founder:
          citizen = { ...citizen, founder: amountNum };
          break;

        case CitizenTokenType.citizen:
          citizen = { ...citizen, citizen: amountNum };
          break;

        default:
          console.warn(`Unknown token ${tokenId} found for address ${ownerAddress}`);
      }

      tokensByOwner.set(ownerAddress, citizen);

      return tokensByOwner;
    }, new Map<string, CitizenOwner>())
    .values(),
];

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
