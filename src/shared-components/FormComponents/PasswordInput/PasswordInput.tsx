import { useState } from 'react';
import nextId from 'react-id-generator';
import ShowHidePusswordBtn from '../ShowHidePusswordBtn/ShowHidePusswordBtn';
import ErrorMessageValidation from '../../Header/Auth/ErrorMessageValidation/ErrorMessageValidation';
import './PasswordInput.scss';

const PasswordInput = ({
    formik,
    isLabelShow,
    additionalClassName,
}: {
    formik: any;
    isLabelShow?: boolean;
    additionalClassName?: string;
}) => {
    const [isPassShow, setIsPassShow] = useState<boolean>(false);
    return (
        <div className="password">
            <label className="password__label">
                {isLabelShow ? <span>Пароль*</span> : ''}
                <span className="password__input-wrapper">
                    <input
                        className={`password__input ${additionalClassName}`}
                        id={nextId('password')}
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        type={isPassShow ? 'text' : 'password'}
                        placeholder="Пароль"
                        autoComplete="new-password"
                        required
                    />
                    <ShowHidePusswordBtn
                        setIsPasswordHide={setIsPassShow}
                        isPasswordHide={isPassShow}
                    />
                </span>
            </label>
            {formik.touched.password && formik.errors.password ? (
                <ErrorMessageValidation message={formik.errors.password} />
            ) : null}
        </div>
    );
};

PasswordInput.defaultProps = {
    isLabelShow: true,
    additionalClassName: '',
};

export default PasswordInput;
