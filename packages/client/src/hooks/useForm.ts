import { ChangeEvent, FormEvent, useState } from 'react';

type IErrors<T> = Partial<Record<keyof T, string>>;

interface IValidation {
    required?: {
        value: boolean;
        message: string;
    };
    pattern?: {
        value: string;
        message: string;
    };
    custom?: {
        isValid: (value: string) => boolean;
        message: string;
    };
}

interface UseFormParams<T> {
    initialValues: T;
    validations?: Record<keyof T, IValidation>;
}

interface UseFormReturnType<T> {
    fields: T;
    errors: IErrors<T> | undefined;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (
        e: React.FormEvent<HTMLFormElement>,
        onSubmit: () => void
    ) => void;
    resetFields: () => void;
}

export const useForm = <T extends Record<keyof T, string>>({
    initialValues,
    validations,
}: UseFormParams<T>): UseFormReturnType<T> => {
    const [fields, setFields] = useState<T>(initialValues);
    const [errors, setErrors] = useState<IErrors<T> | undefined>(undefined);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
    };

    const handleSubmit = (
        e: FormEvent<HTMLFormElement>,
        onSubmit: () => void
    ) => {
        e.preventDefault();

        let formValid = true;
        const newErrors: IErrors<T> = {};

        if (validations) {
            // мб переделать через Object.[keys,values,entries]
            // eslint-disable-next-line guard-for-in
            for (const key in validations) {
                const value = fields[key];
                const currentValidation = validations[key];

                if (
                    currentValidation?.custom &&
                    !currentValidation.custom?.isValid(value)
                ) {
                    console.log(24);
                    formValid = false;
                    newErrors[key] = currentValidation.custom.message;
                }

                const pattern = currentValidation?.pattern;
                if (pattern?.value && !RegExp(pattern.value).test(value)) {
                    console.log(123);

                    formValid = false;
                    newErrors[key] = pattern.message;
                }

                if (currentValidation?.required?.value && !value) {
                    console.log(90);
                    formValid = false;
                    newErrors[key] = currentValidation.required.message;
                }
            }
        }

        // console.log('formValid', formValid);

        if (!formValid) {
            setErrors(newErrors);
            console.log('@errors', errors);

            return;
        }

        setErrors(undefined);
        onSubmit();
    };

    const resetFields = () => setFields(initialValues);

    return { fields, errors, handleInputChange, handleSubmit, resetFields };
};
