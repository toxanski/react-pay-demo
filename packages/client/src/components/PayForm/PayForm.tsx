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
                            type="number"
                            invalid={!!errors.cardNum?.message}
                            {...register('cardNum', {
                                required: INPUT_REQUIRED_MESSAGE,
                                minLength: {
                                    value: 13,
                                    message: 'Минимальная длина 13',
                                },
                                maxLength: {
                                    value: 19,
                                    message: 'Максимальная длина 19',
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
                                invalid={!!errors.date?.message}
                                {...register('date', {
                                    required: INPUT_REQUIRED_MESSAGE,
                                    // pattern: {

                                    // }
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
                                invalid={!!errors.code?.message}
                                {...register('code', {
                                    required: INPUT_REQUIRED_MESSAGE,
                                    // pattern: {

                                    // }
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
