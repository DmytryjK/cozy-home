import { useState } from 'react';
import nextId from 'react-id-generator';
import ShowHidePusswordBtn from '../ShowHidePusswordBtn/ShowHidePusswordBtn';
import ErrorMessageValidation from '../../Header/Auth/ErrorMessageValidation/ErrorMessageValidation';
import './PasswordInput.scss';

const PasswordInput = ({
    formik,
    isLabelShow,
    additionalClassName,
    name,
    label,
    isRequired,
}: {
    formik: any;
    isLabelShow?: boolean;
    additionalClassName?: string;
    name?: string;
    label?: string;
    isRequired?: boolean;
}) => {
    const [isPassShow, setIsPassShow] = useState<boolean>(false);
    return (
        <div className="password">
            <label className="password__label">
                {isLabelShow ? <span>{label}</span> : ''}
                <span className="password__input-wrapper">
                    <input
                        className={`password__input ${additionalClassName}`}
                        id={nextId('password')}
                        name={name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values[name || 'password']}
                        type={isPassShow ? 'text' : 'password'}
                        placeholder={label}
                        autoComplete="new-password"
                        required={isRequired}
                    />
                    <ShowHidePusswordBtn
                        setIsPasswordHide={setIsPassShow}
                        isPasswordHide={isPassShow}
                    />
                </span>
            </label>
            {formik.touched[name || 'password'] &&
            formik.errors[name || 'password'] ? (
                <ErrorMessageValidation
                    message={formik.errors[name || 'password']}
                />
            ) : null}
        </div>
    );
};

PasswordInput.defaultProps = {
    isLabelShow: true,
    additionalClassName: '',
    name: 'password',
    label: 'Пароль*',
    isRequired: true,
};

export default PasswordInput;
