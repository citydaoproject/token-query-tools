import { PathLike } from 'fs';
import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { prettyJSONFiles } from './config';

export const mkdirs = (dirname: string) => mkdir(dirname, { recursive: true });

export const writeDataToFile = async (data: any, outputFile: string) => {
  await mkdirs(path.dirname(outputFile));
  await writeFile(outputFile, stringify(data));
};

const stringify = (data: any) => (prettyJSONFiles ? JSON.stringify(data, undefined, 2) : JSON.stringify(data));

export const readDataFromFile = async <T>(inputFile: PathLike): Promise<T> => {
  const resultJson = await readFile(inputFile);
  return JSON.parse(resultJson.toString());
};
