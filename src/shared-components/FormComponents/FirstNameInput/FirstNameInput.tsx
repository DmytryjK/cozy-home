import { memo } from 'react';
import nextId from 'react-id-generator';
import ErrorMessageValidation from '../../Header/Auth/ErrorMessageValidation/ErrorMessageValidation';
import './FirstNameInput.scss';

const FirstNameInput = ({
    formik,
    additionalClassName,
    isLabelShow,
    placeholder,
}: {
    formik: any;
    additionalClassName?: string;
    isLabelShow?: boolean;
    placeholder?: string;
}) => {
    return (
        <div className="firstName">
            <label className="firstName__label">
                {isLabelShow ? <span>Ваше ім’я*</span> : ''}
                <input
                    className={`firstName__input ${additionalClassName}`}
                    id={nextId('first-name')}
                    name="firstName"
                    type="text"
                    placeholder={placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    required
                />
            </label>
            {formik.touched.firstName && formik.errors.firstName ? (
                <ErrorMessageValidation message={formik.errors.firstName} />
            ) : null}
        </div>
    );
};
FirstNameInput.defaultProps = {
    additionalClassName: '',
    isLabelShow: true,
    placeholder: 'Ім’я',
};
export default memo(FirstNameInput);
