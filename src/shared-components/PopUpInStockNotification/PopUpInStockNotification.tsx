import { useEffect, useState } from 'react';
import './PopUpInStockNotification.scss';

const PopUpInStockNotification = () => {
    const MAX_QUANTITY_OF_CHARS = 300;
    const [currentTextAtCommentField, setCurrentTextAtCommentField] =
        useState<string>('');
    const [isLimitCharClassActive, setIsLimitCharClassActive] =
        useState<boolean>(false);

    useEffect(() => {
        if (currentTextAtCommentField.length === MAX_QUANTITY_OF_CHARS) {
            setIsLimitCharClassActive(true);
        } else {
            setIsLimitCharClassActive(false);
        }
    }, [currentTextAtCommentField]);

    return (
        <div className="inStock-window">
            <h2 className="inStock-window__title">
                Ми повідомимо вам, як тільки товар з'явиться
            </h2>
            <form
                className="inStock-window__form inStock-form"
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="inStock-form__inputs-wrapper">
                    <input
                        className="inStock-form__name"
                        type="text"
                        placeholder="Ваше ім’я*"
                        required
                    />
                    <input
                        className="inStock-form__phone"
                        type="text"
                        placeholder="Номер телефона*"
                        required
                    />
                </div>
                <div className="inStock-form__comment-wrapper">
                    <textarea
                        className="inStock-form__comment"
                        id="inStock-form__comment"
                        name="comments"
                        cols={30}
                        rows={10}
                        value={currentTextAtCommentField}
                        maxLength={MAX_QUANTITY_OF_CHARS}
                        onChange={(e) => {
                            if (
                                currentTextAtCommentField.length <
                                MAX_QUANTITY_OF_CHARS
                            ) {
                                setCurrentTextAtCommentField(e.target.value);
                            } else {
                                setCurrentTextAtCommentField(
                                    e.target.value.slice(
                                        0,
                                        MAX_QUANTITY_OF_CHARS
                                    )
                                );
                            }
                        }}
                        placeholder="Ваш коментар"
                    />
                    <span
                        className={`inStock-form__comment-counter comment-counter ${
                            isLimitCharClassActive ? 'active' : null
                        }`}
                    >
                        <span className="comment-counter__current-value">
                            {currentTextAtCommentField.length}
                        </span>
                        /
                        <span className="comment-counter__max-value">
                            {MAX_QUANTITY_OF_CHARS}
                        </span>
                    </span>
                </div>
                <button className="inStock-form__submit" type="submit">
                    Відправити
                </button>
            </form>
        </div>
    );
};

export default PopUpInStockNotification;
