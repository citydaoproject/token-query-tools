import { fetchCitizenOwners, fetchNFTOwners } from '../actions/fetch';
import { program, ProgramSubCommand } from './cmd';

interface NFTOwnersParams {
  address: string;
  outputFile: string;
  byOwner?: boolean;
}

program
  .command('nft-owners')
  .description('Query NFT owners. Note: currently only works with ERC721 NFTs')
  .requiredOption('--address <address>', 'The NFT address')
  .requiredOption('--output-file <file>', 'The file to store the NFT owner addresses per ID')
  .option('--by-owner', 'Builds a map by owner')
  .action(({ address, outputFile, byOwner }: NFTOwnersParams, cmd: ProgramSubCommand) =>
    fetchNFTOwners(address, outputFile, { byOwner }),
  );

interface CitizenOwnersParams {
  address: string;
  outputFile: string;
  totalsByOwner?: boolean;
}

program
  .command('citizen-owners')
  .description('Query citizen owners. Note: currently only works with ERC1155-based citizen tokens')
  .option('--address <address>', 'The citizen token address', '0x7EeF591A6CC0403b9652E98E88476fe1bF31dDeb')
  .requiredOption('--output-file <file>', 'The file to store the token owner addresses per ID')
  .option('--totals-by-owner', 'Builds a map of the totals by owner')
  .action(({ address, outputFile, totalsByOwner }: CitizenOwnersParams, cmd: ProgramSubCommand) =>
    fetchCitizenOwners(address, outputFile, { totalsByOwner }),
  );
