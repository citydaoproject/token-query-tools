import { writeDataToFile } from '../../services/files';
import { fetchAllNFTOwners } from '../../services/moralis';
import { print } from '../commands/cmd';

export interface FetchNFTOwnersOptions {
  asMap?: boolean;
}

export const fetchNFTOwners = async (address: string, outputFile: string, { asMap }: FetchNFTOwnersOptions = {}) => {
  print(`Fetching NFT ${address} data into '${outputFile}'...`);

  const results = await fetchAllNFTOwners(address);
  await writeDataToFile(results, outputFile);

  print('Done.');
};

export const fetchCitizenOwners = async (address: string, outputFile: string) => {
  print(`Fetching Citizen ${address} data into '${outputFile}'...`);

  // todo: fix

  const results = await fetchAllNFTOwners(address);
  await writeDataToFile(results, outputFile);

  print('Done.');
};
