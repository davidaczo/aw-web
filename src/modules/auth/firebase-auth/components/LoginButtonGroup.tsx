import Apple from '../../../../assets/icons/apple';
import Facebook from '../../../../assets/icons/facebook';
import Google from '../../../../assets/icons/google';
import Mail from '../../../../assets/icons/mail';

import { SocialLoginType } from '../lib/firebase';

import { LoginButton } from './LoginButton';

export const LoginButtonGroup = ({
	onEmail,
	onSocialLogin,
}: {
	onEmail: () => void;
	onSocialLogin: (type: SocialLoginType) => Promise<void>;
}) => {
	const PROVIDERS = [
		{ name: 'Email',    onClick: onEmail,                        icon: <Mail className='size-6' /> },
		{ name: 'Apple',    onClick: () => onSocialLogin('apple'),   icon: <Apple className='size-6' /> },
		{ name: 'Google',   onClick: () => onSocialLogin('google'),  icon: <Google className='size-6' /> },
		{ name: 'Facebook', onClick: () => onSocialLogin('facebook'), icon: <Facebook className='size-6' /> },
	];

	return (
		<div className='mb-5 flex w-full flex-col items-center gap-2 px-1'>
			{PROVIDERS.map((provider) => (
				<LoginButton
					key={provider.name}
					onClick={provider.onClick}
					icon={provider.icon}
					variant='white'
				>
					Continue with
					{' '}
					{provider.name}
				</LoginButton>
			))}
		</div>
	);
};
