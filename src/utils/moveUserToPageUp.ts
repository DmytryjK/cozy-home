const moveUserToPageUp = () => {
    const catalogProductsHtml = document.getElementById('catalog-content');
    if (!catalogProductsHtml) return;
    const yOffset = window.screen.width > 991 ? -70 : -50;
    const y =
        catalogProductsHtml.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
};

export default moveUserToPageUp;
