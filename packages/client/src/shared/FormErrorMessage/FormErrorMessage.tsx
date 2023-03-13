import classnames from 'classnames';
import { FieldError } from 'react-hook-form';
import styles from './FormErrorMessage.module.scss';

interface FormErrorMessageProps {
    error?: FieldError;
}

export function FormErrorMessage({ error }: FormErrorMessageProps) {
    return (
        <span
            className={classnames({
                [styles.error]: error?.message,
            })}
        >
            {error?.message}
        </span>
    );
}
