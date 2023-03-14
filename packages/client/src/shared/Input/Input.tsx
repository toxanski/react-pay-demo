import classnames from 'classnames';
import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    invalid?: boolean;
    withCounter?: boolean;
}

const Input = forwardRef(
    (
        { className, invalid, withCounter = false, ...props }: InputProps,
        ref: ForwardedRef<HTMLInputElement>
    ) => (
        <input
            ref={ref}
            {...props}
            className={classnames(className, styles.input, {
                [styles.error]: invalid,
                [styles.counter]: withCounter,
            })}
        />
    )
);

export { Input };
