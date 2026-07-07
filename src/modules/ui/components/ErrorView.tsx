import { useRouter } from 'next/router';
import type { FC } from 'react';

import { Button } from './Button';

type ErrorViewProps = {
 title: string,
}

export const ErrorView: FC<ErrorViewProps> = ({ title }) => {
	const { replace } = useRouter();

	const handleBack = async () => {
		await replace('/projects');
	};

	return (
		<div className='mt-[64px]'>
			<div className='title-h5 text-center text-state-error-60'>{title}</div>
			<Button variant='primary' className='mx-auto mt-[64px]' onClick={handleBack}>Back to the projects</Button>
		</div>
	);
};
