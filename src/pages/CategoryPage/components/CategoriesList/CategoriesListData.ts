import photo1 from '../../../../assets/images/categories/1.png';
import photo2 from '../../../../assets/images/categories/2.png';
import photo3 from '../../../../assets/images/categories/3.png';
import photo4 from '../../../../assets/images/categories/4.png';
import photo5 from '../../../../assets/images/categories/5.png';
import photo6 from '../../../../assets/images/categories/6.png';
import photo7 from '../../../../assets/images/categories/7.png';
import photo8 from '../../../../assets/images/categories/8.png';

const categoriesData = () => {
    return [
        {
            parentId: '1',
            parentName: 'Крісла',
            categoryImagePath: photo1,
            list: [
                {
                    id: '11',
                    name: 'М’які крісла',
                },
                {
                    id: '11',
                    name: 'Крісла-качалки',
                },
                {
                    id: '11',
                    name: 'Підвісні крісла',
                },
            ],
        },
        {
            parentId: '2',
            parentName: 'Дивани',
            categoryImagePath: photo2,
            list: [
                {
                    id: '11',
                    name: 'Прямі дивани',
                },
                {
                    id: '11',
                    name: 'Прямі дивани',
                },
                {
                    id: '11',
                    name: 'Прямі дивани',
                },
            ],
        },
        {
            parentId: '3',
            parentName: 'Столи',
            categoryImagePath: photo3,
            list: [
                {
                    id: '11',
                    name: 'Обідні столи',
                },
                {
                    id: '11',
                    name: 'Компютерні столи',
                },
                {
                    id: '11',
                    name: 'Кавові столики',
                },
            ],
        },
        {
            parentId: '4',
            parentName: 'Стільці',
            categoryImagePath: photo4,
            list: [
                {
                    id: '11',
                    name: 'Барні стільці',
                },
                {
                    id: '11',
                    name: "Дерев'яні лавки",
                },
                {
                    id: '11',
                    name: 'Банкетки',
                },
                {
                    id: '11',
                    name: 'Стільці з ротангу',
                },
                {
                    id: '11',
                    name: "Дерев'яні стільці",
                },
            ],
        },
        {
            parentId: '5',
            parentName: 'Шафи',
            categoryImagePath: photo5,
            list: [
                {
                    id: '11',
                    name: 'Гардеробні шафи',
                },
                {
                    id: '11',
                    name: 'Шафи-купе',
                },
                {
                    id: '11',
                    name: 'Шафи для кухні',
                },
                {
                    id: '11',
                    name: 'Книжкові шафи',
                },
                {
                    id: '11',
                    name: 'Вбудовані шафи',
                },
            ],
        },
        {
            parentId: '6',
            parentName: 'Комоди',
            categoryImagePath: photo6,
            list: [
                {
                    id: '11',
                    name: 'Комоди з дверцятами',
                },
                {
                    id: '11',
                    name: 'Пеленальні комоди',
                },
                {
                    id: '11',
                    name: 'Комоди з 2-3 шухлядами',
                },
                {
                    id: '11',
                    name: 'Комоди з 4 шухлядами та більше',
                },
            ],
        },
        {
            parentId: '7',
            parentName: 'Ліжка',
            categoryImagePath: photo7,
            list: [
                {
                    id: '11',
                    name: 'Односпальні ліжка',
                },
                {
                    id: '11',
                    name: 'Двоспальні ліжка',
                },
                {
                    id: '11',
                    name: 'Дитячі ліжка',
                },
            ],
        },
        {
            parentId: '8',
            parentName: 'Декор',
            categoryImagePath: photo8,
            list: [
                {
                    id: '11',
                    name: 'Подушки та покривала',
                },
                {
                    id: '11',
                    name: 'Картини та постери',
                },
                {
                    id: '11',
                    name: 'Дзеркала',
                },
                {
                    id: '11',
                    name: 'Свічки та світильники',
                },
                {
                    id: '11',
                    name: 'Горщики та вази',
                },
                {
                    id: '11',
                    name: 'Текстильні елементи',
                },
            ],
        },
    ];
};

export default categoriesData;
