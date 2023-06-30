import type Swiper from 'swiper';

export type Test = {
    id: number;
};

export type TSwiper = Swiper & {
    slides: {
        swiperSlideSize: number;
    }[];
};

interface ColorObj {
    colorName: string;
    photoPath: string;
}
export interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    discountPrice: string;
    discount: number;
    category: string;
    colors: ColorObj[];
}
