const formValidation = (fieldName: string, fieldValue: string) => {
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

    if (fieldName === 'phone') {
        if (fieldValue === '+38 (___) ___ - __ - __' || !fieldValue) {
            error = requiredMessage;
        } else if (!phoneNumberRegex.test(fieldValue)) {
            error =
                'введіть повний номер телефону, наприклад +38 099 999 99 99';
        }
    }
    if (fieldName === 'password') {
        if (!fieldValue) {
            error = requiredMessage;
        } else if (
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

    if (fieldName === 'email') {
        if (!fieldValue) {
            error = requiredMessage;
        } else if (
            // !/^(?=.{0,64}@(\S))[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{1,})(\S[a-zA-Z0-9_])$/i.test(
            //     fieldValue
            // )
            !/^(?=.{0,64}@(\S))[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]{1,})$/i.test(
                fieldValue
            )
        ) {
            error = 'Введіть коректний емейл, наприклад example@domain.com';
        }
    }

    return error || undefined;
};

export default formValidation;
