const formValidation = (
    fieldName: string,
    fieldValue: string,
    isRequired = true
) => {
    let error = '';
    const requiredMessage = "Це поле обов'язкове для заповнення";
    const phoneNumberRegex = /^\+38 \(\d{3}\) \d{3} - \d{2} - \d{2}$/;

    if (fieldName === 'firstName') {
        if (!fieldValue) {
            error = requiredMessage;
        } else if (fieldValue.length < 2 || fieldValue.length > 32) {
            error = 'Поле має містити від 2-х до 32-х символів';
        } else if (!/^[a-zA-ZА-Яа-яёЁЇїІіЄєҐґ]+$/g.test(fieldValue)) {
            error = 'В даному полі мають бути тільки букви';
        }
    }

    if (fieldName === 'lastName') {
        if (!fieldValue) {
            error = requiredMessage;
        } else if (fieldValue.length < 2 || fieldValue.length > 32) {
            error = 'Поле має містити від 2-х до 32-х символів';
        } else if (!/^[a-zA-ZА-Яа-яёЁЇїІіЄєҐґ]+$/g.test(fieldValue)) {
            error = 'В даному полі мають бути тільки букви';
        }
    }

    if (fieldName === 'phoneNumber') {
        if (fieldValue === '+38 (___) ___ - __ - __' || !fieldValue) {
            error = requiredMessage;
        } else if (!phoneNumberRegex.test(fieldValue)) {
            error =
                'введіть повний номер телефону, наприклад +38 099 999 99 99';
        }
    }
    if (fieldName === 'password' || fieldName === 'oldpassword') {
        if (fieldValue) {
            if (
                !/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{4,}/g.test(
                    fieldValue
                )
            ) {
                if (/[А-Яа-яёЁЇїІіЄєҐґ]/g.test(fieldValue)) {
                    error = 'Використовуйте латинські літери';
                } else {
                    error =
                        'Пароль має складатись з великих, малих літер, цифр та спецсимволів';
                }
            } else if (/[А-Яа-яёЁЇїІіЄєҐґ]/g.test(fieldValue)) {
                error = 'Використовуйте латинські літери';
            } else if (fieldValue.length < 8) {
                error = 'Мін. довжина паролю - 8 символів';
            } else if (/\s/g.test(fieldValue)) {
                error = 'Пароль не має містити пробілів';
            }
        }
        if (isRequired) {
            if (!fieldValue) {
                error = requiredMessage;
            }
        }
    }

    if (fieldName === 'email') {
        if (!fieldValue && isRequired) {
            error = requiredMessage;
        } else if (
            fieldValue &&
            !/^(?=.{0,64}@(\S))[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]{1,})$/i.test(
                fieldValue
            )
        ) {
            error = 'Введіть коректний емейл, наприклад example@domain.com';
        }
    }

    if (fieldName === 'birthdate') {
        const currentDate = fieldValue.split('.');
        const currentDay = new Date().getDate();
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        const inputDateSummary =
            +currentDate[0] + +currentDate[1] + +currentDate[2];
        const currentDateSummary = currentDay + currentMonth + currentYear;

        if (currentDate[0] !== '') {
            if (+currentDate[0] > 31 || +currentDate[0] < 1) {
                error = 'введіть коректний день народження';
            } else if (+currentDate[1] > 12 || +currentDate[1] < 1) {
                error = 'введіть коректний місяць народження';
            } else if (
                +currentDate[2] > currentYear ||
                +currentDate[2] < 1900
            ) {
                error = 'введіть коректний рік народження';
            } else if (
                +currentDate[2] >= currentYear &&
                (inputDateSummary > currentDateSummary ||
                    +currentDate[1] > currentMonth)
            ) {
                error = 'дата народження не може бути більша за поточну';
            }
        }
    }

    return error || undefined;
};

export default formValidation;
