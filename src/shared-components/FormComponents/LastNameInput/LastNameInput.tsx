import { memo } from 'react';
import nextId from 'react-id-generator';
import ErrorMessageValidation from '../../Header/Auth/ErrorMessageValidation/ErrorMessageValidation';
import './LastNameInput.scss';

const LastNameInput = ({
    formik,
    isLabelShow,
}: {
    formik: any;
    isLabelShow?: boolean;
}) => {
    return (
        <div className="lastName">
            <label className="lastName__label">
                {isLabelShow ? <span>Ваше прізвище*</span> : ''}
                <input
                    className="lastName__input"
                    id={nextId('last-name')}
                    name="lastName"
                    type="text"
                    placeholder="Прізвище"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    required
                />
            </label>
            {formik.touched.lastName && formik.errors.lastName ? (
                <ErrorMessageValidation message={formik.errors.lastName} />
            ) : null}
        </div>
    );
};

LastNameInput.defaultProps = {
    isLabelShow: true,
};

export default memo(LastNameInput);
