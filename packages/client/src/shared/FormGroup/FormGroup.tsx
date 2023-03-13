import classnames from 'classnames';
import styles from './FormGroup.module.scss';

interface FormGroupProps {
    className?: string;
    children: JSX.Element[];
}

export function FormGroup({ className, children }: FormGroupProps) {
    return (
        <div className={classnames(styles.group, className)}>{children}</div>
    );
}
