type CyrillicToLatin = {
    [key: string]: string;
};

const transliterate = (text: string) => {
    const cyrillicToLatinMap: CyrillicToLatin = {
        а: 'a',
        б: 'b',
        в: 'v',
        г: 'h',
        д: 'd',
        е: 'e',
        ё: 'e',
        ж: 'zh',
        з: 'z',
        и: 'y',
        й: 'i',
        к: 'k',
        л: 'l',
        м: 'm',
        н: 'n',
        о: 'o',
        п: 'p',
        р: 'r',
        с: 's',
        т: 't',
        у: 'u',
        ф: 'f',
        х: 'kh',
        ц: 'ts',
        ч: 'ch',
        ш: 'sh',
        щ: 'shch',
        ы: 'y',
        э: 'e',
        ю: 'iu',
        я: 'ia',
        ь: ' ',
        ъ: ' ',
        і: 'i',
        ї: 'i',
        є: 'ie',
        ґ: 'g',
        А: 'a',
        Б: 'b',
        В: 'v',
        Г: 'h',
        Д: 'd',
        Е: 'e',
        Ё: 'e',
        Ж: 'zh',
        З: 'z',
        И: 'y',
        Й: 'i',
        К: 'k',
        Л: 'l',
        М: 'm',
        Н: 'n',
        О: 'o',
        П: 'p',
        Р: 'r',
        С: 's',
        Т: 't',
        У: 'u',
        Ф: 'f',
        Х: 'kh',
        Ц: 'ts',
        Ч: 'ch',
        Ш: 'sh',
        Щ: 'shch',
        Ы: 'y',
        Э: 'e',
        Ю: 'iu',
        Я: 'ia',
        І: 'i',
        Ї: 'i',
        Є: 'ie',
        Ґ: 'g',
    };
    const regExp = /\r?\n|\r/g;
    return text
        .replace(' ', '-')
        .split('')
        .map((char: string) => cyrillicToLatinMap[char] || char)
        .join('')
        .toLowerCase()
        .replace(' ', '')
        .replace(regExp, '');
};

export default transliterate;
