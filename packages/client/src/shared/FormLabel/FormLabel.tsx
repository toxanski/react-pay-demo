import classnames from 'classnames';
import styles from './FormLabel.module.scss';

interface FormLabelProps {
    htmlFor: string;
    children: JSX.Element | string;
    className?: string;
}

export function FormLabel({ htmlFor, children, className }: FormLabelProps) {
    return (
        <label
            className={classnames(className, styles.label)}
            htmlFor={htmlFor}
        >
            {children}
        </label>
    );
}
