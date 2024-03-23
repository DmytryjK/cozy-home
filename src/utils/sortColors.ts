import type { ColorDtoList } from '../types/types';

const sortColorsByAvailability = (colorDtoList: ColorDtoList[]) => {
    const colorDtoSort: ColorDtoList[] = JSON.parse(
        JSON.stringify(colorDtoList)
    );
    return colorDtoSort.sort((a, b) => {
        const valuesOfAvailability = [
            'Немає в наявності',
            'Закінчується',
            'В наявності',
        ];
        const compareA = valuesOfAvailability.indexOf(a.quantityStatus);
        const compareB = valuesOfAvailability.indexOf(b.quantityStatus);
        if (compareA < compareB) {
            return 1;
        }
        if (compareA > compareB) {
            return -1;
        }
        return 0;
    });
};

export default sortColorsByAvailability;
