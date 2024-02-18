import { useCallback, useEffect, Dispatch, SetStateAction, memo } from 'react';
import { useFormik, FormikErrors } from 'formik';
import SubmitButton from '../../shared-components/SubmitButton/SubmitButton';
import formValidation from '../../../../utils/formValidation';
import {
    EmailInput,
    PhoneNumberInput,
    FirstNameInput,
    LastNameInput,
} from '../../../../shared-components/FormComponents/Inputs';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import debounce from '../../../../utils/debounce';
import { setClientContacts } from '../../../../store/reducers/orderSlice';
import {
    resetUserLoginStatus,
    resetUserNewPasswordLoading,
} from '../../../../store/reducers/authSlice';
import {
    getUserProfileData,
    resetUserProfileDataStatus,
} from '../../../../store/reducers/userActionsSlice';
import type { OrderData } from '../../../../types/types';
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
    setCustomerForm: Dispatch<SetStateAction<any>>;
};

const CustomerForm = (props: Props) => {
    const { handleSubmit, setCustomerForm } = props;
    const dispatch = useAppDispatch();
    const loginLoading = useAppSelector((state) => state.auth.loginLoading);
    const userData = useAppSelector(
        (state) => state.userActions.userProfileData
    );
    const userDataLoading = useAppSelector(
        (state) => state.userActions.loadingUserPersonalInfo
    );
    const newPasswordLoading = useAppSelector(
        (state) => state.auth.newPasswordLoading
    );
    const cartTotal = useAppSelector((state) => state.cart.cartTotal);
    const localOrderData: OrderData | null = JSON.parse(
        localStorage.getItem('orderData') || JSON.stringify(null)
    );

    const debouncedUpdateOrderContacts = useCallback(
        debounce((values) => {
            dispatch(setClientContacts({ ...values }));
        }, 800),
        []
    );

    const formik3 = useFormik({
        initialValues: {
            firstName: localOrderData?.firstName || '',
            lastName: localOrderData?.lastName || '',
            phoneNumber: localOrderData?.phoneNumber || '',
            email: localOrderData?.email || '',
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};
            const validationFields = [
                'firstName',
                'lastName',
                'phoneNumber',
                'email',
            ];

            debouncedUpdateOrderContacts(values);
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
            if (
                cartTotal &&
                cartTotal.totalQuantityToCheckout !== 0 &&
                localOrderData &&
                localOrderData?.orderItems &&
                localOrderData.orderItems.length > 0
            ) {
                handleSubmit(true);
                dispatch(setClientContacts({ ...values }));
                resetForm();
            }
            if (
                !cartTotal ||
                cartTotal.totalQuantityToCheckout === 0 ||
                !localOrderData?.orderItems ||
                localOrderData.orderItems.length === 0
            ) {
                alert('не можна зробити замовлення, якщо відсутні товари');
            }
        },
    });

    useEffect(() => {
        setCustomerForm(formik3);
    }, []);

    useEffect(() => {
        if (loginLoading !== 'succeeded') return;
        if (localOrderData?.firstName) {
            formik3.setValues({
                firstName: localOrderData?.firstName || '',
                lastName: localOrderData?.lastName || '',
                phoneNumber: localOrderData?.phoneNumber || '',
                email: localOrderData?.email || '',
            });
        }
    }, [loginLoading]);

    useEffect(() => {
        if (loginLoading !== 'succeeded' && newPasswordLoading !== 'succeeded')
            return;
        dispatch(getUserProfileData());
    }, [loginLoading, newPasswordLoading]);

    useEffect(() => {
        if (userDataLoading === 'succeeded' && userData) {
            formik3.setValues({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                phoneNumber: userData.phoneNumber || '',
                email: userData.email || '',
            });
            dispatch(resetUserProfileDataStatus());
            dispatch(resetUserLoginStatus());
            dispatch(resetUserNewPasswordLoading());
        }
    }, [userData, userDataLoading]);

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

export default memo(CustomerForm);
