/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';
import fs from 'fs';

export function printFile(content: any, fileName: string) {
  try {
    const buffer = Buffer.from(content, 'binary');

    const dir =
      process.env.NODE_ENV === 'test'
        ? path.resolve(__dirname, '..', '..', '__tests__', 'recipes')
        : `C:\\\\gresppro-x64\\backend\\commands\\commandsCreate\\`;

    fs.writeFile(
      `${dir}/${fileName}.rtf`,
      buffer,
      { encoding: 'utf-8', flag: 'w' },
      () => { },
    );
    return;
  } catch (error) {
    throw new Error(error.message);
  }
}
