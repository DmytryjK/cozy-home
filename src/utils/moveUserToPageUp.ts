const moveUserToPageUp = (selectorId = 'catalog-content', offset = -80) => {
    const catalogProductsHtml = document.getElementById(selectorId);
    if (!catalogProductsHtml) return;
    let yOffset;
    if (offset) {
        yOffset = window.screen.width > 991 ? offset || -80 : -50;
    } else {
        yOffset = 0;
    }
    const y =
        catalogProductsHtml.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
};

export default moveUserToPageUp;
