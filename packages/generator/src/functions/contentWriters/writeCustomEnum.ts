import { ExtendedDMMFEnum } from '../../classes';
import { type ContentWriterOptions } from '../../types';
import { writeZodImport } from '..';
import { getConfig } from '../../config';

export const writeCustomEnum = (
  {
    fileWriter: { writer, writeImport },
    getSingleFileContent = false,
  }: ContentWriterOptions,
  { name, values }: ExtendedDMMFEnum,
) => {
  const { useMultipleFiles } = getConfig();

  if (useMultipleFiles && !getSingleFileContent) {
    writeZodImport(writeImport);
  }

  writer.blankLine().write(`export enum ${name} {`);
  values.forEach((value) => {
    writer.write(`${value} = '${value}',`);
  });
  writer.write(`}`);
  writer.blankLine().write(`export const ${name}Schema = z.nativeEnum(${name});`);
  writer.blankLine().write(`export type ${name}Type = z.infer<typeof ${name}Schema>;`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${name}Schema;`);
  }
};
