export type GlobalFiltersQuery = {
    [key: string]:
        | string
        | string[]
        | number
        | boolean
        | { id: string; name: string; countOfProducts: number }[]
        | null
        | undefined;
    countOfProducts?: number;
    countOfPages?: number;
    parentCategoryId?: string;
    subCategoryId?: string;
    subCategories?: string[];
    colors?: string[];
    materials?: string[];
    collections?: string[];
    sale?: boolean | null;
    transformation?: boolean | null;
    heightAdjustment?: boolean | null;
    priceMin?: string;
    priceMax?: string;
    weightMin?: number;
    weightMax?: number;
    heightMin?: number;
    heightMax?: number;
    widthMin?: number;
    widthMax?: number;
    depthMin?: number;
    depthMax?: number;
    numberOfDoorsMin?: number;
    numberOfDoorsMax?: number;
    numberOfDrawersMin?: number;
    numberOfDrawersMax?: number;
    bedLengthMin?: number;
    bedLengthMax?: number;
    bedWidthMin?: number;
    bedWidthMax?: number;
    maxLoad?: string[];
};

export interface FilterOptions {
    [key: string]:
        | string
        | number
        | boolean
        | { id: string; name: string; countOfProducts: number }[];
    countOfPages: number;
    parentCategoryId: string;
    subCategories: { id: string; name: string; countOfProducts: number }[];
    colors: { id: string; name: string; countOfProducts: number }[];
    materials: { id: string; name: string; countOfProducts: number }[];
    collections: { id: string; name: string; countOfProducts: number }[];
    sale: boolean;
    transformation: boolean;
    heightAdjustment: boolean;
    priceMin: string;
    priceMax: string;
    weightMin: number;
    weightMax: number;
    heightMin: number;
    heightMax: number;
    widthMin: number;
    widthMax: number;
    depthMin: number;
    depthMax: number;
    numberOfDoorsMin: number;
    numberOfDoorsMax: number;
    numberOfDrawersMin: number;
    numberOfDrawersMax: number;
    bedLengthMin: number;
    bedLengthMax: number;
    bedWidthMin: number;
    bedWidthMax: number;
    maxLoad: string;
}
