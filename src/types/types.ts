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
    productQuantityStatus: string;
}

export interface ProductInformationType {
    categoryName: string;
    subCategoryName: string;
    skuCode: string;
    name: string;
    description: string;
    price: number;
    discount: string;
    priceWithDiscount: number | null;
    colors:
        | [
              {
                  id: string;
                  name: string;
                  quantityStatus: string;
              }
          ]
        | [];
    averageRating: number;
    countOfReviews: number;
    reviews:
        | [
              {
                  userName: string;
                  review: string;
                  rating: number;
                  data: string;
              }
          ]
        | null;
    images:
        | [
              {
                  id: string;
                  mainImage: boolean;
                  desktopImagePath: string;
                  sliderImagePath: string;
                  mobileImagePath: string;
              }
          ]
        | [];
    materials: string[];
    collection:
        | {
              id: string;
              name: string;
          }
        | Record<string, never>;
    transformation: boolean;
    heightAdjustment: boolean;
    weight: number;
    height: number;
    width: number;
    depth: number;
    numberOfDoors: number;
    numberOfDrawers: number;
    bedLength: number;
    bedWidth: number;
    maxLoad: number;
    quantityStatus: string;
}

export type Loading = 'idle' | 'pending' | 'succeeded' | 'failed';
export type ErrorType = unknown | null;

export type CartData = {
    skuCode: string;
    name: string;
    price: number;
    priceWithDiscount: number;
    imagePath: string;
    colorName: string;
    colorHex: string;
    availableProductQuantity: number;
    quantityStatus: string;
};
