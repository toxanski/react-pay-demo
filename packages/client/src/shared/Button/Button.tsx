import classnames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: JSX.Element | JSX.Element[] | string;
    className?: string;
}

export function Button({ children, className, ...props }: ButtonProps) {
    return (
        <button
            type="submit"
            className={classnames(styles.button, className)}
            {...props}
        >
            {children}
        </button>
    );
}
