const pluralizeUkrainian = (number: number, wordForms: string[]) => {
    // example 'товар', 'товари', 'товарів'
    let result = `${number}`;
    if (number % 10 === 1 && number % 100 !== 11) {
        result += ` ${wordForms[0]}`;
    } else if (
        [2, 3, 4].includes(number % 10) &&
        ![12, 13, 14].includes(number % 100)
    ) {
        result += ` ${wordForms[1]}`;
    } else {
        result += ` ${wordForms[2]}`;
    }

    return result;
};

export default pluralizeUkrainian;
