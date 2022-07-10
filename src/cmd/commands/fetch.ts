import { fetchCitizenOwners, fetchNFTOwners } from '../actions/fetch';
import { program, ProgramSubCommand } from './cmd';

interface NFTOwnersParams {
  address: string;
  outputFile: string;
}

program
  .command('nft-owners')
  .description('Query NFT owners. Note: currently only works with ERC721 NFTs')
  .requiredOption('--address <address>', 'The NFT address')
  .requiredOption('--output-file <file>', 'The file to store the NFT owner addresses per ID')
  .action(({ address, outputFile }: NFTOwnersParams, cmd: ProgramSubCommand) => fetchNFTOwners(address, outputFile));

program
  .command('citizen-owners')
  .description('Query citizen owners. Note: currently only works with ERC1155-based citizen tokens')
  .requiredOption('--address <address>', 'The citizen token address')
  .requiredOption('--output-file <file>', 'The file to store the token owner addresses per ID')
  .action(({ address, outputFile }: NFTOwnersParams, cmd: ProgramSubCommand) =>
    fetchCitizenOwners(address, outputFile),
  );
