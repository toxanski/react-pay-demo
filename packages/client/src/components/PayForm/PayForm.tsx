import {
    FormControl,
    Input,
    FormLabel,
    FormErrorMessage,
    FormGroup,
    Button,
} from '@shared';
import classnames from 'classnames';
import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { normalizeCardNumber } from '../../lib/normalizeCardNumber';
import { normalizeCardDate } from '../../lib/normalizeCardDate';
import { INPUT_REQUIRED_MESSAGE } from './PayForm.consts';
import styles from './PayForm.module.scss';

interface PayFormInputs {
    cardNum: number;
    date: string;
    code: number;
    userInfo: string;
}

interface PayFormProps {
    title: string;
}

export function PayForm({ title }: PayFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PayFormInputs>({
        mode: 'onChange',
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleSubmit(() => {
            // логика после сабмита
        })(e);
    };

    return (
        <form className={styles.payForm} onSubmit={onSubmit}>
            <fieldset>
                <legend className={styles.payFormTitle}>{title}</legend>

                <div className={styles.payFormBody}>
                    <FormControl classNames={styles.payFormControl}>
                        <Input
                            type="tel"
                            maxLength={22}
                            invalid={!!errors.cardNum?.message}
                            {...register('cardNum', {
                                required: INPUT_REQUIRED_MESSAGE,
                                minLength: {
                                    value: 16,
                                    message: 'Минимальная длина 13',
                                },
                                onChange(event) {
                                    const {
                                        target: { value },
                                    } = event;
                                    event.target.value =
                                        normalizeCardNumber(value);
                                },
                            })}
                        />
                        <FormLabel htmlFor="cardNum">Номер карты</FormLabel>
                        <FormErrorMessage error={errors.cardNum} />
                    </FormControl>

                    <FormGroup>
                        <FormControl
                            classNames={classnames(
                                styles.payFormControl,
                                styles.payFormDate
                            )}
                        >
                            <Input
                                type="tel"
                                maxLength={5}
                                invalid={!!errors.date?.message}
                                {...register('date', {
                                    required: INPUT_REQUIRED_MESSAGE,
                                    onChange(event) {
                                        const {
                                            target: { value },
                                        } = event;

                                        event.target.value =
                                            normalizeCardDate(value);
                                    },
                                    pattern: {
                                        value: /^(0[1-9]|1[0-2])\/(2[1-6])$/,
                                        message: 'Введите валидную дату',
                                    },
                                })}
                            />
                            <FormLabel htmlFor="date">Месяц/Год</FormLabel>
                            <FormErrorMessage error={errors.date} />
                        </FormControl>
                        <FormControl
                            classNames={classnames(
                                styles.payFormControl,
                                styles.payFormCvv
                            )}
                        >
                            <Input
                                type="number"
                                inputMode="numeric"
                                maxLength={3}
                                max="999"
                                min="000"
                                pattern="[0-9]*"
                                invalid={!!errors.code?.message}
                                className={styles.payFormCvv}
                                {...register('code', {
                                    required: INPUT_REQUIRED_MESSAGE,
                                    // pattern: {
                                    //     value: /[0-9]*/g,
                                    //     message: 'Не валидный код',
                                    // },
                                })}
                            />
                            <FormLabel htmlFor="code">Код</FormLabel>
                            <FormErrorMessage error={errors.code} />
                        </FormControl>
                    </FormGroup>

                    <FormControl classNames={styles.payFormControl}>
                        <Input
                            invalid={!!errors.userInfo?.message}
                            {...register('userInfo', {
                                required: INPUT_REQUIRED_MESSAGE,
                                pattern: {
                                    value: /^[а-яА-Яa-zA-Z ]*$/,
                                    message: 'Введите корректное имя',
                                },
                            })}
                        />
                        <FormLabel htmlFor="userInfo">Владелец карты</FormLabel>
                        <FormErrorMessage error={errors.userInfo} />
                    </FormControl>

                    <Button type="submit">Оплатить</Button>
                </div>
            </fieldset>
        </form>
    );
}
