const moveUserToPageUp = () => {
    const catalogProductsHtml = document.getElementById('catalog-content');
    if (!catalogProductsHtml) return;
    const yOffset = -70;
    const y =
        catalogProductsHtml.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
    window.scrollTo({ top: y, behavior: 'auto' });
};

export default moveUserToPageUp;
