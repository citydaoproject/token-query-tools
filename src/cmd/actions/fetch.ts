import { writeDataToFile } from '../../services/files';
import { fetchAllNFTOwners, fetchAllTokenOwners } from '../../services/moralis';
import { buildCitizenOwners, groupNFTsByOwner } from '../../services/owners';
import { print } from '../commands/cmd';

export interface FetchNFTOwnersOptions {
  byOwner?: boolean;
}

export const fetchNFTOwners = async (address: string, outputFile: string, { byOwner }: FetchNFTOwnersOptions = {}) => {
  print(`Fetching NFT ${address} data into '${outputFile}'...`);

  const results = await fetchAllNFTOwners(address);

  if (byOwner) {
    await writeDataToFile(groupNFTsByOwner(results), outputFile);
  } else {
    await writeDataToFile(results, outputFile);
  }

  print('Done.');
};

export interface FetchCitizenOwnersOptions {
  totalsByOwner?: boolean;
}

export const fetchCitizenOwners = async (
  address: string,
  outputFile: string,
  { totalsByOwner }: FetchCitizenOwnersOptions = {},
) => {
  print(`Fetching Citizen ${address} data into '${outputFile}'...`);

  const results = buildCitizenOwners(await fetchAllTokenOwners(address));
  if (totalsByOwner) {
    // todo: fix

    await writeDataToFile(results, outputFile);
  } else {
    await writeDataToFile(results, outputFile);
  }

  print('Done.');
};
