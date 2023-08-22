import React, { useState, ChangeEvent, useEffect } from 'react';
import './CommentTextarea.scss';

const CommentTextarea: React.FC = () => {
    const [comment, setComment] = useState<string>('');
    const [isMaxCharactersExceeded, setIsMaxCharactersExceeded] =
        useState(false);
    const maxLength = 500;

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value;

        if (inputText.length <= maxLength) {
            setComment(inputText);
        }
    };

    useEffect(() => {
        setIsMaxCharactersExceeded(comment.length >= 490);
    }, [comment]);

    return (
        <div className="comment-textarea">
            <textarea
                cols={30}
                rows={10}
                className="customers-review__modal_inputs_input_comment"
                placeholder="Ваш комментарий"
                value={comment}
                onChange={handleTextareaChange}
            />
            <div
                className={`character-count ${
                    isMaxCharactersExceeded ? 'exceeded' : ''
                }`}
            >
                {comment.length}/{maxLength}
            </div>
        </div>
    );
};

export default CommentTextarea;
