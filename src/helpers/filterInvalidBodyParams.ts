import { FiltersBody } from '../types/catalogFiltersTypes';

const filterInvalidBodyParams = (body: FiltersBody) => {
    const temporaryBody = Object.entries(body).filter((param) => {
        if (Array.isArray(param[1]) && param[1].length <= 0) {
            return false;
        }
        if (typeof param[1] === 'string' && param[1].trim() === '')
            return false;
        return true;
    });

    const filtersBodyFiltered: FiltersBody = {};
    temporaryBody.forEach((item) => {
        const key = item[0];
        const value = item[1];
        filtersBodyFiltered[key] = value;
    });
    return filtersBodyFiltered;
};

export default filterInvalidBodyParams;
