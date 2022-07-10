import { RateLimiter } from 'limiter';
import Moralis from 'moralis/node';
import { moralisApplicationId, moralisPageLimit, moralisRateLimitPerMinute, moralisServerUrl } from './config';
import { NFTOwner } from './owners';

export const fetchAllNFTOwners = async (address: string): Promise<NFTOwner[]> =>
  fetchAll((cursor) => fetchNFTOwners(address, cursor));

const fetchNFTOwners = async (address: string, cursor?: string): Promise<MoralisResults<NFTOwner>> => {
  const response = await Moralis.Web3API.token.getNFTOwners({ address, chain: 'eth', limit: moralisPageLimit, cursor });

  return {
    data: response.result?.map(({ token_id, owner_of }) => ({ nftId: token_id, ownerAddress: owner_of })) || [],
    cursor: response.cursor,
    page: response.page || 0,
    pageSize: response.page_size || 0,
    total: response.total || 0,
  };
};

interface MoralisResults<T> {
  data: T[];
  cursor?: string;
  page: number;
  pageSize: number;
  total: number;
}

const fetchAll = async <T, R extends MoralisResults<T>>(fetch: (cursor?: string) => Promise<R>): Promise<T[]> => {
  const limiter = new RateLimiter({ tokensPerInterval: moralisRateLimitPerMinute, interval: 'minute' });

  await Moralis.start({ serverUrl: moralisServerUrl, appId: moralisApplicationId });

  const allResults: T[] = [];

  let cursor: string | undefined = undefined;
  do {
    try {
      await limiter.removeTokens(1);
      const partialResults = await fetch(cursor);
      allResults.push(...partialResults.data);

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

const calcNumPages = (partialResults: MoralisResults<any>) =>
  Math.floor(partialResults.total / partialResults.pageSize) +
  (partialResults.total % partialResults.pageSize != 0 ? 1 : 0);
