import type { CartData } from '../types/types';
import type { ProductsInfoToCheckout } from '../store/reducers/cartSlice';

const transformCartDataToCheckoutFormat = (
    cartData: CartData[],
    productsLocalCheckout: ProductsInfoToCheckout[]
) => {
    return cartData.map((item) => {
        const {
            name,
            skuCode,
            colorHex,
            price,
            priceWithDiscount,
            colorName,
            quantity,
            availableProductQuantity,
        } = item;
        let localItemQuantity = 1;
        if (
            productsLocalCheckout.some((localItem: any) => {
                if (
                    localItem.skuCode === skuCode &&
                    localItem.colorHex === colorHex &&
                    localItem.quantityToCheckout > 1
                ) {
                    localItemQuantity = localItem.quantityToCheckout;
                    return true;
                }
                return undefined;
            })
        ) {
            return {
                productName: name,
                skuCode,
                colorHex,
                colorName,
                price: (priceWithDiscount || price) * localItemQuantity,
                quantityToCheckout: localItemQuantity,
            };
        }
        return {
            productName: name,
            skuCode,
            colorHex,
            colorName,
            price: priceWithDiscount || price,
            quantityToCheckout: availableProductQuantity
                ? quantity || 1
                : availableProductQuantity,
        };
    });
};

export default transformCartDataToCheckoutFormat;
