interface ImageDtoList {
    id: string;
    imagePath: string;
}

interface ColorDtoList {
    id: string;
    name: string;
}

export interface DtoDataByCategory {
    catalogFilterParametersDto: CatalogFilterParametersType;
    productsDto: ProductCardType[];
}

export interface ProductCardType {
    skuCode: string;
    name: string;
    shortDescription: string;
    price: number;
    priceWithDiscount: number | null;
    discount: number | null;
    imageDtoList: ImageDtoList[];
    colorDtoList: ColorDtoList[];
}

export interface CatalogFilterParametersType {
    booleanTypes: string[];
    categories: string[];
    collections: string[];
    colors: string[];
    countOfProducts: number;
    materials: { [key: string]: number };
    numericalParameters: { name: string; minValue: number; maxValue: number };
}

export type Loading = 'idle' | 'pending' | 'succeeded' | 'failed';
