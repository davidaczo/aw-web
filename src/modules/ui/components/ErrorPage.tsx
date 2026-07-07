import type { FC } from 'react';

import { Logo } from './Logo';

type ErrorPageProps = {
 text: string,
}

export const ErrorPage: FC<ErrorPageProps> = ({ text }) => (
	<div className='flex min-h-screen flex-col items-center justify-center px-6'>
		<Logo size={50} />
		<div className='title-h5 break-smart mx-auto mt-[80px] max-w-[420px] text-center text-errorText1'>
			{text}
		</div>
	</div>
);
