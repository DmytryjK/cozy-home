import { memo } from 'react';
import nextId from 'react-id-generator';
import InputMask from 'react-input-mask';
import ErrorMessageValidation from '../../Header/Auth/ErrorMessageValidation/ErrorMessageValidation';
import './PhoneNumberInput.scss';

const PhoneNumberInput = ({
    formik,
    isLabelShow,
    placeholder,
}: {
    formik: any;
    isLabelShow?: boolean;
    placeholder?: string;
}) => {
    return (
        <div className="phone-number">
            <label className="phone-number__label">
                {isLabelShow ? <span>Телефон*</span> : ''}
                <InputMask
                    mask="+38 (999) 999 - 99 - 99"
                    className="phone-number__input"
                    id={nextId('phoneNumber')}
                    type="phone"
                    name="phoneNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                    placeholder={placeholder}
                    required
                />
            </label>
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <ErrorMessageValidation message={formik.errors.phoneNumber} />
            ) : null}
        </div>
    );
};

PhoneNumberInput.defaultProps = {
    isLabelShow: true,
    placeholder: '+38 (___) ___ - __ - __',
};

export default memo(PhoneNumberInput);
