import { useEffect, useState } from 'react';
import { useFormik, FormikErrors } from 'formik';
import { openPopUpNotification } from '../../../../store/reducers/modalsSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
    FirstNameInput,
    PhoneNumberInput,
} from '../../../FormComponents/Inputs';
import formValidation from '../../../../utils/formValidation';
import Modal from '../../../Modal/Modal';
import './PopUpInStockNotification.scss';

type FormValues = {
    [key: string]: string;
    firstName: string;
    phoneNumber: string;
    comment: string;
};

const PopUpInStockNotification = () => {
    const MAX_QUANTITY_OF_CHARS = 300;
    const dispatch = useAppDispatch();
    const isPopUpOpenStore = useAppSelector(
        (state) => state.modals.isPopUpNotificationOpen
    );
    const [isNotificationPopUpShow, setIsNotificationPopUpShow] =
        useState<boolean>(isPopUpOpenStore);
    const [currentTextAtCommentField, setCurrentTextAtCommentField] =
        useState<string>('');
    const [isLimitCharClassActive, setIsLimitCharClassActive] =
        useState<boolean>(false);

    const [isSubmitedFormNotification, setIsSubmitedFormNotification] =
        useState<boolean>(false);

    useEffect(() => {
        if (isPopUpOpenStore === isNotificationPopUpShow) return;
        setIsNotificationPopUpShow(isPopUpOpenStore);
    }, [isPopUpOpenStore]);

    useEffect(() => {
        if (isNotificationPopUpShow === isPopUpOpenStore) return;
        dispatch(openPopUpNotification(isNotificationPopUpShow));
    }, [isNotificationPopUpShow]);

    useEffect(() => {
        if (currentTextAtCommentField.length === MAX_QUANTITY_OF_CHARS) {
            setIsLimitCharClassActive(true);
        } else {
            setIsLimitCharClassActive(false);
        }
    }, [currentTextAtCommentField]);

    const formik10 = useFormik({
        initialValues: {
            firstName: '',
            phoneNumber: '',
            comment: '',
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};

            const validationFields = ['firstName', 'phoneNumber'];

            validationFields.forEach((fieldName: string) => {
                const error = formValidation(fieldName, values[fieldName]);
                if (error) {
                    errors[fieldName] = error;
                }
            });

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            setIsSubmitedFormNotification(true);
            alert(JSON.stringify(values, null, 2));
            resetForm();
        },
    });

    useEffect(() => {
        if (isNotificationPopUpShow === false || isPopUpOpenStore === false) {
            formik10.resetForm();
            setCurrentTextAtCommentField('');
        }
    }, [isNotificationPopUpShow, isPopUpOpenStore]);

    return (
        <Modal
            active={isNotificationPopUpShow}
            setActive={setIsNotificationPopUpShow}
            isDataLoadedToServer={isSubmitedFormNotification}
            setisDataLoadedToServer={setIsSubmitedFormNotification}
            isSubmitedText="Ваш запит прийнято!"
            maxwidth="884px"
        >
            <div className="inStock-window">
                <h2 className="inStock-window__title">
                    Ми повідомимо вам, як тільки товар з'явиться
                </h2>
                <form
                    className="inStock-window__form inStock-form"
                    onSubmit={formik10.handleSubmit}
                    noValidate
                >
                    <div className="inStock-form__inputs-wrapper">
                        <FirstNameInput
                            formik={formik10}
                            isLabelShow={false}
                            placeholder="Ваше ім’я*"
                        />
                        <PhoneNumberInput
                            formik={formik10}
                            isLabelShow={false}
                            placeholder="Номер телефона*"
                        />
                    </div>
                    <div className="inStock-form__comment-wrapper">
                        <textarea
                            className="inStock-form__comment"
                            id="inStock-form__comment"
                            name="comment"
                            cols={30}
                            rows={10}
                            value={formik10.values.comment}
                            maxLength={MAX_QUANTITY_OF_CHARS}
                            onChange={(e) => {
                                if (
                                    currentTextAtCommentField.length <
                                    MAX_QUANTITY_OF_CHARS
                                ) {
                                    setCurrentTextAtCommentField(
                                        e.target.value
                                    );
                                    formik10.handleChange(e);
                                } else {
                                    setCurrentTextAtCommentField(
                                        e.target.value.slice(
                                            0,
                                            MAX_QUANTITY_OF_CHARS
                                        )
                                    );
                                }
                            }}
                            placeholder="Ваш коментар"
                        />
                        <span
                            className={`inStock-form__comment-counter comment-counter ${
                                isLimitCharClassActive ? 'active' : null
                            }`}
                        >
                            <span className="comment-counter__current-value">
                                {currentTextAtCommentField.length}
                            </span>
                            /
                            <span className="comment-counter__max-value">
                                {MAX_QUANTITY_OF_CHARS}
                            </span>
                        </span>
                    </div>
                    <button className="inStock-form__submit" type="submit">
                        Відправити
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default PopUpInStockNotification;
