import { FormikConfig, FormikContextType, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import {
	emailError, isFormChanged, maxLenError, minLenError, requiredError,
} from '../../../utils';
import { useJsonApi } from '../../api/jsonApi';
import type { FormShape } from '../../form/store/types';
import { updateMe } from '../store/actions';
import type { UpdateMeDto, UserDetailedDto } from '../store/types';

export type MeValues = {
 email: string,
 firstName: string,
 lastName: string,
};

const baseShape: FormShape<MeValues> = {
	email: Yup.string().email(emailError).max(320, maxLenError(320)).required(requiredError),
	firstName: Yup.string().min(3, minLenError(3)).max(32, maxLenError(32)).required(requiredError),
	lastName: Yup.string().min(3, minLenError(3)).max(32, maxLenError(32)).required(requiredError),
};

const toUpdateDto = (values: MeValues): UpdateMeDto => values;

const dtoToInit = (dto: UserDetailedDto): MeValues => ({
	email: dto.email,
	firstName: dto.firstName,
	lastName: dto.lastName,
});

type MeFormVm = {
 formik: FormikContextType<MeValues>,
 isChanged: boolean,
}

type MeFormProps = {
	user: UserDetailedDto;
 onAfterSubmit?: () => void;
}

export const useMeForm = ({ user, onAfterSubmit }: MeFormProps): MeFormVm => {
	const api = useJsonApi();

	const [isChanged, setChanged] = useState(false);
	const [formInit, setFormInit] = useState(dtoToInit(user));

	useEffect(() => {
		setFormInit(dtoToInit(user));
	}, [user]);

	const handleSubmit: FormikConfig<MeValues>['onSubmit'] = async (values, { setSubmitting }) => {
		try {
			await api(updateMe(toUpdateDto(values)));
			if (onAfterSubmit) {
				onAfterSubmit();
			}
		} finally {
			setSubmitting(false);
		}
	};

	const formik = useFormik<MeValues>({
		enableReinitialize: true,
		initialValues: formInit,
		validationSchema: Yup.object().shape(baseShape),
		onSubmit: handleSubmit,
	});

	useEffect(() => {
		setChanged(isFormChanged(formInit, formik.values));
	}, [formik.values, formInit]);

	return { formik, isChanged };
};
