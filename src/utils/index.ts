import path from "path";

// TODO - remove rootDirectory because it's not in use in the application
export const rootDirectory = path.dirname(require.main!.filename);

export const isEmpty = (array: Array<unknown>) => array.length < 1;
