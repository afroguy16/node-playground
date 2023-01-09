import path from "path";

export const rootDirectory = path.dirname(require.main!.filename);

export const isEmpty = (array: Array<unknown>) => array.length < 1;
