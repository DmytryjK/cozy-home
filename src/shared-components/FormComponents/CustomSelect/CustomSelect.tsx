import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import nextId from 'react-id-generator';
import './CustomSelect.scss';

type SelectFields = {
    title: string;
    fieldName: string;
};

type Props = {
    selectFields: SelectFields[];
    defaulTitle: string;
    selectNameOptions: string;
    selectedValue: string;
    onChange: (value: string) => void;
};

const CustomSelect = (props: Props) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const {
        selectFields,
        defaulTitle,
        selectNameOptions,
        selectedValue,
        onChange,
    } = props;
    const [activeOption, setActiveOption] = useState<string>(selectedValue);

    const closeSelect = (e: any) => {
        if (
            !e.target.closest('.select__custom-fields') &&
            !e.target.closest('.select__custom')
        ) {
            setIsActive(false);
        }
    };

    useEffect(() => {
        if (isActive) {
            document.addEventListener('click', closeSelect);
        }

        return () => document.removeEventListener('click', closeSelect);
    }, [isActive]);

    useEffect(() => {
        onChange(activeOption);
    }, [activeOption]);

    useEffect(() => {
        setActiveOption(selectedValue);
    }, [selectedValue]);

    const renderSortFields = () => {
        return selectFields.map((field, index) => {
            const { title, fieldName } = field;
            return (
                <div className="select__field" key={nextId('select-field')}>
                    <input
                        className="select__input"
                        id={`input-${fieldName}${index}`}
                        type="radio"
                        name={selectNameOptions}
                        checked={title === activeOption}
                        value={title}
                        onChange={(e) => setActiveOption(e.target.value)}
                    />
                    <label
                        className="select__label"
                        htmlFor={`input-${fieldName}${index}`}
                    >
                        {title}
                    </label>
                </div>
            );
        });
    };
    return (
        <div className="select">
            <div className={`select__custom ${isActive ? 'active' : ''}`}>
                <button
                    className="select__open-btn"
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                >
                    <span className="select-btn__current-option">
                        {activeOption || defaulTitle}
                    </span>
                </button>
                <fieldset className="select__custom-fields">
                    {renderSortFields()}
                </fieldset>
            </div>
        </div>
    );
};

export default CustomSelect;
