import { FormikConfig, FormikContextType, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import {
	calculatePasswordStrength, isFormChanged, maxLenError, minLenError, requiredError,
} from '../../../utils';
import { useJsonApi } from '../../api/jsonApi';
import { FormShape } from '../../form/store/types';
import { changePassword } from '../store/actions';
import { PasswordChangeDto } from '../store/types';

export type PasswordChangeValues = {
 currentPassword: string,
 password: string,
 confirmPassword: string,
};

const initialValues: PasswordChangeValues = {
	currentPassword: '',
	password: '',
	confirmPassword: '',
};

const baseShape: FormShape<PasswordChangeValues> = {
	currentPassword: Yup.string().required(requiredError),
	password: Yup.string().min(8, minLenError(8)).max(64, maxLenError(64)).required(requiredError),
	confirmPassword: Yup.string().required(requiredError),
};

const validator = ({ password, confirmPassword }: PasswordChangeValues) => {
	const errors: any = {};
	if (password) {
		if (calculatePasswordStrength(password) < 3) {
			errors.password = 'It must include at least three of the following: lowercase, uppercase, digit, punctuation';
		}
		if (confirmPassword && password !== confirmPassword) {
			errors.confirmPassword = 'The two passwords do not match';
		}
	}
	return errors;
};

const toUpdateDto = (values: PasswordChangeValues): PasswordChangeDto => ({
	currentPassword: values.currentPassword,
	newPassword: values.password,
});

type PasswordChangeFormVm = {
 formik: FormikContextType<PasswordChangeValues>,
 isChanged: boolean,
}

type PasswordChangeFormProps = {
 onAfterSubmit?: () => void,
}

export const usePasswordChangeForm = ({ onAfterSubmit }: PasswordChangeFormProps): PasswordChangeFormVm => {
	const api = useJsonApi();

	const [isChanged, setChanged] = useState(false);

	const handleSubmit: FormikConfig<PasswordChangeValues>['onSubmit'] = async (values, { setSubmitting }) => {
		try {
			await api(changePassword(toUpdateDto(values)));
			if (onAfterSubmit) {
				onAfterSubmit();
			}
		} finally {
			setSubmitting(false);
		}
	};

	const formik = useFormik<PasswordChangeValues>({
		enableReinitialize: true,
		initialValues,
		validationSchema: Yup.object().shape(baseShape),
		validate: validator,
		onSubmit: handleSubmit,
	});

	useEffect(() => {
		setChanged(isFormChanged(initialValues, formik.values));
	}, [formik.values]);

	return { formik, isChanged };
};
