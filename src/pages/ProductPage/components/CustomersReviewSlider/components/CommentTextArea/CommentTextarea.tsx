import React, { useState, ChangeEvent, useEffect } from 'react';
import './CommentTextarea.scss';

interface CommentTextareaProps {
    formik?: any;
}

const CommentTextarea: React.FC<CommentTextareaProps> = ({
    formik,
}: {
    formik?: any;
}) => {
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
        setIsMaxCharactersExceeded(comment.length >= maxLength);
    }, [comment]);

    return (
        <div className="comment-textarea">
            <textarea
                name="comment"
                cols={30}
                rows={10}
                maxLength={500}
                className="customers-review__modal_inputs_input_comment"
                placeholder="Ваш комментарий"
                value={formik ? formik.values.comment : comment}
                onChange={formik ? formik.handleChange : handleTextareaChange}
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

CommentTextarea.defaultProps = {
    formik: undefined,
};

export default CommentTextarea;
