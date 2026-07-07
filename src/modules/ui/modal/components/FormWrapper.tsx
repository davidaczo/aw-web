import { Form, FormikContextType, FormikProvider } from 'formik';
import { FC, PropsWithChildren } from 'react';

type FormWrapperProps = {
 formik: FormikContextType<unknown>,
};

export const FormWrapper: FC<PropsWithChildren<FormWrapperProps>> = ({ formik, children }) => (
	<FormikProvider value={formik}>
		<Form>{children}</Form>
	</FormikProvider>
);
