interface ImageDtoList {
    id: string;
    imagePath: string;
    color: string;
}
export interface ProductCardType {
    skuCode: string;
    name: string;
    shortDescription: string;
    price: number;
    priceWithDiscount: number | null;
    discount: number | null;
    imageDtoList: ImageDtoList[];
}
export interface ProductCategory {
    id: string;
    name: string;
}

export interface PopularItemsInitialState {
    products: ProductCardType[];
    categories: ProductCategory[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: null | unknown;
}

export interface NewItemsInitialState {
    products: ProductCardType[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: null | unknown;
}
