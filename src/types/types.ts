export interface ImageDtoList {
    id: string;
    imagePath: string;
    color: string;
}

export interface ColorDtoList {
    id: string;
    name: string;
    quantityStatus: string;
}

export interface NavigationCategory {
    name: string;
    id: string;
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
    favorite: boolean | null;
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
    colors: ColorDtoList[] | [];
    averageRating: number;
    countOfReviews: number;
    favorite: boolean | null;
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
    priceWithDiscount: number | null;
    imagePath: string;
    colorName: string;
    colorHex: string;
    availableProductQuantity: number;
    quantityStatus: string;
    quantity?: number;
    favorite?: boolean;
    productName?: string;
};

export type OrderDataOrderItems = {
    productSkuCode: string;
    colorHex: string;
    quantity: number;
    price: number;
};

export type OrderDataOrderDelivery = {
    city?: string;
    paymentMethod?: string;
    street?: string;
    house?: string;
    apartment?: string;
    comment?: string;
    deliveryCompanyName?: string;
    region?: string;
    postOffice?: string;
    deliveryType?: string;
};

export type OrderData = {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    delivery?: OrderDataOrderDelivery | Record<string, never>;
    orderItems?: OrderDataOrderItems[] | [];
};
