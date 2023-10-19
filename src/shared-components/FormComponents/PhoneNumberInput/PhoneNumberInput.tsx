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
                    id={nextId('phone')}
                    type="phone"
                    name="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    placeholder={placeholder}
                    required
                />
            </label>
            {formik.touched.phone && formik.errors.phone ? (
                <ErrorMessageValidation message={formik.errors.phone} />
            ) : null}
        </div>
    );
};

PhoneNumberInput.defaultProps = {
    isLabelShow: true,
    placeholder: '+38 (___) ___ - __ - __',
};

export default PhoneNumberInput;
