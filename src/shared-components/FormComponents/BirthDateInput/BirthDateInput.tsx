import nextId from 'react-id-generator';
import InputMask from 'react-input-mask';
import ErrorMessageValidation from '../../Header/Auth/ErrorMessageValidation/ErrorMessageValidation';
import './BirthDateInput.scss';

const BirthDateInput = ({ formik }: { formik: any }) => {
    return (
        <div className="birthdate">
            <label className="birthdate__label">
                <span>Дата народження</span>
                <InputMask
                    mask="99.99.9999"
                    className="birthdate__input"
                    id={nextId('birth-date')}
                    name="birthdate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.birthdate}
                    placeholder="дд/мм/рррр"
                />
            </label>
            {formik.touched.birthdate && formik.errors.birthdate ? (
                <ErrorMessageValidation message={formik.errors.birthdate} />
            ) : null}
        </div>
    );
};

export default BirthDateInput;
