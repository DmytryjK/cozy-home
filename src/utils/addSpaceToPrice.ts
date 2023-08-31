const addSpaceToPrice = (price: number) => {
    if (price >= 1000) {
        const temporary = price;
        const res = temporary.toLocaleString().replaceAll(',', ' ');
        return res;
    }
    return price;
};

export default addSpaceToPrice;
