import classnames from 'classnames';
import { ForwardedRef, forwardRef, HTMLInputTypeAttribute } from 'react';
import styles from './Input.module.scss';

interface InputProps {
    className?: string;
    invalid?: boolean;
    type?: HTMLInputTypeAttribute;
    withCounter?: boolean;
}

const Input = forwardRef(
    (
        {
            className,
            invalid,
            type = 'text',
            withCounter = false,
            ...props
        }: InputProps,
        ref: ForwardedRef<HTMLInputElement>
    ) => (
        <input
            ref={ref}
            type={type}
            {...props}
            className={classnames(className, styles.input, {
                [styles.error]: invalid,
                [styles.counter]: withCounter,
            })}
        />
    )
);

export { Input };
