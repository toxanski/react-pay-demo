import classnames from 'classnames';
import styles from './FormControl.module.scss';

interface FormControlProps {
    children: JSX.Element | JSX.Element[];
    classNames?: string;
}

export function FormControl({ children, classNames }: FormControlProps) {
    return (
        <div className={classnames(classNames, styles.control)}>{children}</div>
    );
}
