import { memo } from 'react';
import nextId from 'react-id-generator';
import ErrorMessageValidation from '../../Header/Auth/ErrorMessageValidation/ErrorMessageValidation';
import './EmailInput.scss';

const EmailInput = ({
    formik,
    required,
    isLabelShow,
    additionalClassName,
}: {
    formik: any;
    required?: boolean;
    isLabelShow?: boolean;
    additionalClassName?: string;
}) => {
    return (
        <div className="email">
            <label className="email__label">
                {isLabelShow ? (
                    <span>{required ? 'Email*' : 'Email'}</span>
                ) : (
                    ''
                )}
                <input
                    className={`email__input ${additionalClassName}`}
                    id={nextId('email')}
                    style={{ marginTop: isLabelShow ? '14px' : '0' }}
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    type="email"
                    placeholder="example@gmail.com"
                    autoComplete="username"
                    required={required}
                />
            </label>
            {formik.touched.email && formik.errors.email ? (
                <ErrorMessageValidation message={formik.errors.email} />
            ) : null}
        </div>
    );
};

EmailInput.defaultProps = {
    required: true,
    isLabelShow: true,
    additionalClassName: '',
};

export default memo(EmailInput);
