export interface CombinedFilters {
    [key: string]: {
        title: string;
        type: string;
        option1?: { optionTitle: string; boolean: boolean };
        option2?: { optionTitle: string; boolean: boolean };
        'до 100 кг'?: {
            value: string;
        };
        '100-200 кг'?: {
            value: string;
        };
        'от 200 кг'?: {
            value: string;
        };
    };
}

const filtersData = () => {
    const filterData: CombinedFilters = {
        colors: {
            title: 'Кольори',
            type: 'colors',
        },
        collections: {
            title: 'Колекція',
            type: 'checkboxes',
        },
        materials: {
            title: 'Матеріали',
            type: 'checkboxes',
        },
        subCategories: {
            title: 'Вид',
            type: 'checkboxes',
        },
        bedLengthMax: {
            title: 'Довжина спального місця (см)',
            type: 'range',
        },
        bedWidthMax: {
            title: 'Ширина спального місця (см)',
            type: 'range',
        },
        depthMax: {
            title: 'Глибина (см)',
            type: 'range',
        },
        maxLoad: {
            title: 'Навантаження (кг)',
            type: 'checkboxes',
            'до 100 кг': {
                value: '99',
            },
            '100-200 кг': {
                value: '100-200',
            },
            'от 200 кг': {
                value: '201',
            },
        },
        priceMax: {
            title: 'Ціна (грн)',
            type: 'range',
        },
        heightMax: {
            title: 'Висота (см)',
            type: 'range',
        },
        widthMax: {
            title: 'Ширина (см)',
            type: 'range',
        },
        numberOfDoorsMax: {
            title: 'Кількість дверей (шт)',
            type: 'range',
        },
        numberOfDrawersMax: {
            title: 'Кількість шухляд (шт)',
            type: 'range',
        },
        sale: {
            title: 'SALE',
            type: 'boolean',
            option1: { optionTitle: 'Акції', boolean: true },
            option2: { optionTitle: 'Усі товари', boolean: false },
        },
        transformation: {
            title: 'Механізм трансформації',
            type: 'boolean',
            option1: { optionTitle: 'Розкладний', boolean: true },
            option2: { optionTitle: 'Не розкладний', boolean: false },
        },
        heightAdjustment: {
            title: 'Регулювання за висотою',
            type: 'boolean',
            option1: { optionTitle: 'Є регулювання', boolean: true },
            option2: { optionTitle: 'Немає регулювання', boolean: false },
        },
    };
    return { ...filterData };
};

export default filtersData;
