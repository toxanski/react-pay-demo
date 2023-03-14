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
    pan: number;
    expire: string;
    cvc: number;
    cardholder: string;
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
                            id="pan"
                            invalid={!!errors.pan?.message}
                            {...register('pan', {
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
                        <FormLabel htmlFor="pan">Номер карты</FormLabel>
                        <FormErrorMessage error={errors.pan} />
                    </FormControl>

                    <FormGroup>
                        <FormControl
                            classNames={classnames(
                                styles.payFormControl,
                                styles.payFormExpire
                            )}
                        >
                            <Input
                                type="tel"
                                id="expire"
                                maxLength={5}
                                invalid={!!errors.expire?.message}
                                {...register('expire', {
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
                            <FormLabel htmlFor="expire">Месяц/Год</FormLabel>
                            <FormErrorMessage error={errors.expire} />
                        </FormControl>
                        <FormControl
                            classNames={classnames(
                                styles.payFormControl,
                                styles.payFormCvc
                            )}
                        >
                            <Input
                                type="password"
                                autoComplete="off"
                                id="cvc"
                                maxLength={3}
                                invalid={!!errors.cvc?.message}
                                {...register('cvc', {
                                    required: INPUT_REQUIRED_MESSAGE,
                                    onChange(event) {
                                        event.target.value =
                                            event.target.value.replace(
                                                /\D/,
                                                ''
                                            );
                                    },
                                    // NOTE: minLength работает некорректно
                                    pattern: {
                                        value: /[0-9]{3}/,
                                        message: INPUT_REQUIRED_MESSAGE,
                                    },
                                })}
                            />
                            <FormLabel htmlFor="cvc">Код</FormLabel>
                            <FormErrorMessage error={errors.cvc} />
                        </FormControl>
                    </FormGroup>

                    <FormControl classNames={styles.payFormControl}>
                        <Input
                            id="cardholder"
                            className={styles.payFormCardHolderField}
                            invalid={!!errors.cardholder?.message}
                            {...register('cardholder', {
                                required: INPUT_REQUIRED_MESSAGE,
                                pattern: {
                                    value: /^[a-zA-Z]+\s[a-zA-Z]+$/,
                                    message: 'Введите корректное имя',
                                },
                            })}
                        />
                        <FormLabel htmlFor="cardholder">
                            Владелец карты
                        </FormLabel>
                        <FormErrorMessage error={errors.cardholder} />
                    </FormControl>

                    <Button type="submit">Оплатить</Button>
                </div>
            </fieldset>
        </form>
    );
}
