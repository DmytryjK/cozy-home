import type Swiper from 'swiper';

export type Test = {
    id: number;
};

export type TSwiper = Swiper & {
    slides: {
        swiperSlideSize: number;
    }[];
};
