import nextId from 'react-id-generator';
import ErrorMessageValidation from '../../Header/Auth/ErrorMessageValidation/ErrorMessageValidation';
import './LastNameInput.scss';

const LastNameInput = ({ formik }: { formik: any }) => {
    return (
        <div className="lastName">
            <label className="lastName__label">
                <span>Ваше прізвище*</span>
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

export default LastNameInput;
