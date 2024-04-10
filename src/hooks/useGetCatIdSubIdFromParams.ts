const useGetCatIdSubIdFromParams = (categoryParams?: string) => {
    const categoryId: string | undefined = categoryParams
        ?.substring(
            categoryParams.indexOf('categoryId='),
            categoryParams.indexOf('&subId') !== -1
                ? categoryParams.indexOf('&subId')
                : categoryParams.length
        )
        .replace('categoryId=', '');
    const subcategoryId: string | undefined = categoryParams
        ?.substring(
            categoryParams.indexOf('&subId') !== -1
                ? categoryParams.indexOf('&subId')
                : categoryParams.length,
            categoryParams.length
        )
        .replace('&subId=', '');
    return { categoryId, subcategoryId };
};

export default useGetCatIdSubIdFromParams;
