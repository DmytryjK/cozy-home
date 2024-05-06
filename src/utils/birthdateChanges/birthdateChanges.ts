export const reverseBirthdayForServer = (birthdate: string) => {
    return birthdate.split('.').reverse().toString().replaceAll(',', '-');
};

export const reverseBirthdayFromServer = (birthdate: string) => {
    return birthdate.split('-').reverse().toString().replaceAll(',', '.');
};
