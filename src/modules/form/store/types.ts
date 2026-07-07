import * as Yup from 'yup';

export type FormShape<T> = Partial<{
	[K in keyof T]: Yup.Schema;
}>;
