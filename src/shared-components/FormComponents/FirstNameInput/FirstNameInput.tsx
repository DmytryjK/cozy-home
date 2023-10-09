import nextId from 'react-id-generator';
import ErrorMessageValidation from '../../Header/Auth/ErrorMessageValidation/ErrorMessageValidation';
import './FirstNameInput.scss';

const FirstNameInput = ({ formik }: { formik: any }) => {
    return (
        <div className="firstName">
            <label className="firstName__label">
                <span>Ваше ім’я*</span>
                <input
                    className="firstName__input"
                    id={nextId('first-name')}
                    name="firstName"
                    type="text"
                    placeholder="Ім’я"
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

export default FirstNameInput;
