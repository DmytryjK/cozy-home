interface ImageDtoList {
    id: string;
    imagePath: string;
}

interface ColorDtoList {
    id: string;
    name: string;
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

export type Loading = 'idle' | 'pending' | 'succeeded' | 'failed';
