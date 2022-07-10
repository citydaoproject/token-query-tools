import { Command } from 'commander';

const { version } = require('../../../package.json');

export interface ProgramSubCommand {
  parent?: ProgramSubCommand;

  opts(): ProgramOptions;
}

export interface ProgramOptions {}

export const extractProgramOptions = (cmd: ProgramSubCommand): ProgramOptions => {
  if (cmd.parent) {
    return extractProgramOptions(cmd.parent);
  }

  return cmd.opts();
};

export const program = new Command().name('token-query-tools').description('Commands to query tokens').version(version);

export const print = (...args: any[]) => {
  console.log(...args);
};

export const printLines = (lines: any[]) => {
  lines.forEach((line) => console.log(line));
};

export const asInt = (x) => parseInt(x, 10);
