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

export type Loading = 'idle' | 'pending' | 'succeeded' | 'failed';
