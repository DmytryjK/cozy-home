import { useEffect } from 'react';
import { useFormik, FormikErrors } from 'formik';
import nextId from 'react-id-generator';
import SubmitButton from '../../shared-components/SubmitButton/SubmitButton';
import ErrorMessageValidation from '../../../../shared-components/Header/Auth/ErrorMessageValidation/ErrorMessageValidation';
import formValidation from '../../../../utils/formValidation';
import {
    EmailInput,
    PhoneNumberInput,
    FirstNameInput,
    LastNameInput,
} from '../../../../shared-components/FormComponents/Inputs';
import './CustomerForm.scss';

interface FormValues {
    [key: string]: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
}

type Props = {
    handleSubmit: (isRegular: boolean) => void;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
};

const CustomerForm = (props: Props) => {
    const { handleSubmit, firstName, lastName, phoneNumber, email } = props;
    const formik3 = useFormik({
        initialValues: {
            firstName: firstName || '',
            lastName: lastName || '',
            phoneNumber: phoneNumber || '',
            email: email || '',
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};
            const validationFields = [
                'firstName',
                'lastName',
                'phoneNumber',
                'email',
            ];

            validationFields.forEach((fieldName: string) => {
                const error = formValidation(fieldName, values[fieldName]);
                if (error) {
                    if (fieldName !== 'email') {
                        errors[fieldName] = error;
                    } else if (values[fieldName]) {
                        errors[fieldName] = error;
                    }
                }
            });

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            alert(JSON.stringify(values, null, 2));
            handleSubmit(true);
            resetForm();
        },
    });

    return (
        <form
            className="customer-form"
            onSubmit={formik3.handleSubmit}
            noValidate
        >
            <div className="customer-form__item">
                <FirstNameInput formik={formik3} />
            </div>
            <div className="customer-form__item">
                <LastNameInput formik={formik3} />
            </div>
            <div className="customer-form__item">
                <PhoneNumberInput formik={formik3} />
            </div>
            <div className="customer-form__item">
                <EmailInput formik={formik3} />
            </div>
            <div className="button-wrapper">
                <SubmitButton title="Далі" />
            </div>
        </form>
    );
};

export default CustomerForm;
