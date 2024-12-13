import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function Form({ schema, onSubmit, defaultValues=[], children }) {

    useEffect(() => {
        console.log("defaultValues", defaultValues)
    }, []);

    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='w-full'>
                {children}
            </form>
        </FormProvider>
    );
}

export default Form;