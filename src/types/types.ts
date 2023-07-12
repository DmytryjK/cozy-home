import type Swiper from 'swiper';

export type Test = {
    id: number;
};

export type TSwiper = Swiper & {
    slides: {
        swiperSlideSize: number;
    }[];
};

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
