import { RateLimiter } from 'limiter';
import Moralis from 'moralis/node';
import { moralisApplicationId, moralisRateLimitPerMinute, moralisServerUrl } from './config';
import { NFTOwner } from './owners';

export const fetchAllNFTOwners = async (address: string): Promise<NFTOwner[]> => {
  const limiter = new RateLimiter({ tokensPerInterval: moralisRateLimitPerMinute, interval: 'minute' });

  await Moralis.start({ serverUrl: moralisServerUrl, appId: moralisApplicationId });

  const allResults: NFTOwner[] = [];

  let cursor: string | undefined = undefined;
  do {
    try {
      await limiter.removeTokens(1);
      const partialResults = await fetchNFTOwners(address, cursor);
      allResults.push(...partialResults.owners);

      console.log(`Fetched page ${partialResults.page} of ${calcNumPages(partialResults)}`);

      cursor = partialResults.cursor;
    } catch (e) {
      if (e.message.startsWith('Too many requests')) {
        console.warn('Too many requests. Waiting 5 seconds...');
        await limiter.removeTokens(limiter.getTokensRemaining());
        await new Promise((resolve) => {
          setTimeout(resolve, 5000);
        });
      } else {
        throw e;
      }
    }
  } while (cursor);

  return allResults;
};

interface MoralisResults {
  cursor?: string;
  page: number;
  pageSize: number;
  total: number;
}

interface FetchNFTOwnersResults extends MoralisResults {
  owners: NFTOwner[];
}

const fetchNFTOwners = async (address: string, cursor?: string): Promise<FetchNFTOwnersResults> => {
  const response = await Moralis.Web3API.token.getNFTOwners({ address, chain: 'eth', limit: 99, cursor });

  return {
    owners: response.result?.map(({ token_id, owner_of }) => ({ nftId: token_id, ownerAddress: owner_of })) || [],
    cursor: response.cursor,
    page: response.page || 0,
    pageSize: response.page_size || 0,
    total: response.total || 0,
  };
};

const calcNumPages = (partialResults: FetchNFTOwnersResults) =>
  Math.floor(partialResults.total / partialResults.pageSize) +
  (partialResults.total % partialResults.pageSize != 0 ? 1 : 0);
