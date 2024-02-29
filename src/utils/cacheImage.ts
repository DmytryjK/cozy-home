async function cacheImage(imageUrl: string) {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const cache = await caches.open('image-cache');
        await cache.put(imageUrl, new Response(blob));
    } catch (error) {
        console.error('Failed to cache image:', error);
    }
}

async function getCachedImage(imageUrl: string) {
    try {
        const cache = await caches.open('image-cache');
        const cachedResponse = await cache.match(imageUrl);
        if (cachedResponse) {
            // Если изображение найдено в кэше, возвращаем его
            const blob = await cachedResponse.blob();
            return URL.createObjectURL(blob);
        }
        // Если изображение не найдено в кэше, возвращаем исходный URL
        return imageUrl;
    } catch (error) {
        console.error('Failed to get cached image:', error);
        // В случае ошибки также возвращаем исходный URL
        return imageUrl;
    }
}

export { cacheImage, getCachedImage };
