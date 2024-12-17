import React from 'react';
import { FormProvider } from 'react-hook-form';

function Form({ schema, onSubmit, defaultValues = {}, methods, children }) {
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='w-full'>
                {children}
            </form>
        </FormProvider>
    );
}

export default Form;