import { FormikConfig, FormikContextType, useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';

import { emailError, maxLenError, requiredError } from '../../../../utils';
import { useJsonApi } from '../../../api/jsonApi';
import { nameSchema } from '../../../form/helpers';
import { FormShape } from '../../../form/store/types';
import { checkEmailWithFirebase } from '../store/actions';

export type LoginValues = {
    email: string,
    name: string,
    password: string,
}

const initialValues: LoginValues = {
	email: '',
	name: '',
	password: '',
};

const baseShape: FormShape<LoginValues> = {
	email: Yup.string().email(emailError).max(320, maxLenError(320)).required(requiredError),
};

const loginShape: FormShape<LoginValues> = {
	...baseShape,
	password: Yup.string().required(requiredError),
};

const registerShape: FormShape<LoginValues> = {
	...baseShape,
	name: nameSchema,
	password: Yup.string().required(requiredError),
};

type LoginFormProps = {
    onLogin: (email: string, password: string) => void,
    onRegister: (email: string, password: string, name: string) => void,
}

type LoginFormState = 'EMAIL' | 'LOGIN' | 'REGISTER';

type LoginFormVM = {
    formik: FormikContextType<LoginValues>,
    formState: LoginFormState,
}

type CheckedEmailObject = {
    email: string,
    isExists: boolean,
}

export const useFirebaseLoginForm = ({ onLogin, onRegister }: LoginFormProps): LoginFormVM => {
	const api = useJsonApi();
	const [shape, setShape] = useState(baseShape);

	const [checkedEmail, setCheckedEmail] = useState<CheckedEmailObject | null>(null);

	const handleSubmit: FormikConfig<LoginValues>['onSubmit'] = async (values, { setSubmitting }) => {
		try {
			if (formState === 'EMAIL') {
				const data = await api(checkEmailWithFirebase({ email: values.email }));
				if (data?.isExists !== undefined) {
					setCheckedEmail({ email: values.email, isExists: data.isExists });
				}
			} else if (formState === 'LOGIN') {
				await onLogin(values.email, values.password);
			} else {
				await onRegister(values.email, values.password, values.name);
			}
		} finally {
			setSubmitting(false);
		}
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues,
		validationSchema: Yup.object().shape(shape),
		onSubmit: handleSubmit,
	});

	const {
		values: fValues,
		setFieldValue: fSetFieldValue,
		setFieldTouched: fSetFieldTouched,
	} = formik;

	const formState = useMemo<LoginFormState>(() => {
		if (!checkedEmail) {
			return 'EMAIL';
		}
		if (fValues.email === checkedEmail.email) {
			return checkedEmail.isExists ? 'LOGIN' : 'REGISTER';
		}
		return 'EMAIL';
	}, [checkedEmail, fValues.email]);

	useEffect(() => {
		fSetFieldValue('name', '');
		fSetFieldValue('password', '');
		fSetFieldTouched('name', false);
		fSetFieldTouched('password', false);
		switch (formState) {
			case 'EMAIL': default:
				setShape(baseShape);
				break;
			case 'LOGIN':
				setShape(loginShape);
				break;
			case 'REGISTER':
				setShape(registerShape);
		}
	}, [formState, fSetFieldValue, fSetFieldTouched]);

	return {
		formik,
		formState,
	};
};
