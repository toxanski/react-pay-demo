import { PayForm } from '@components';
import styles from './Pay.module.scss';

export function Pay() {
    return (
        <div className={styles.page}>
            {/* <Card className={styles.cardPay}> */}
            <PayForm title="Оплата банковской картой" />
            {/* </Card> */}
        </div>
    );
}
