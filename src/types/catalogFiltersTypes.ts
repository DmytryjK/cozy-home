export type GlobalFiltersQuery = {
    extraEndpoint?: string;
    id?: string;
    page?: string;
    size?: string;
    fieldName?: string;
    direction?: 'asc' | 'desc';
    parentCategoryId?: string;
    categoriesIds?: string;
    colorsIds?: string[];
    materialsIds?: string;
    collectionsIds?: string;
    priceMin?: string;
    priceMax?: string;
    sale?: 'true' | 'false';
    weightMin?: string;
    weightMax?: string;
    heightMin?: string;
    heightMax?: string;
    widthMin?: string;
    widthMax?: string;
    depthMin?: string;
    depthMax?: string;
    numberOfDoorsMin?: string;
    numberOfDoorsMax?: string;
    numberOfDrawersMin?: string;
    numberOfDrawersMax?: string;
    bedLengthMin?: string;
    bedLengthMax?: string;
    bedWidthMin?: string;
    bedWidthMax?: string;
    loadMin?: string;
    loadMax?: string;
};