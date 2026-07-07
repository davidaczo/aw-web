import type { NextPage } from 'next';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import Lock from '../assets/icons/lock';
import Pencil from '../assets/icons/pencil';
import { selectMe } from '../modules/me/store/slice';
import { WithSidebar } from '../modules/sidebar/components/WithSidebar';
import { Button } from '../modules/ui/components/Button';
import { Card } from '../modules/ui/components/Card';
import { PropertyTable } from '../modules/ui/components/PropertyTable';
import { useModalRef } from '../modules/ui/modal/hooks/useModalRef';
import { MeEditModal } from '../modules/user/modals/MeEditModal';
import { PasswordChangeModal } from '../modules/user/modals/PasswordChangeModal';
import { UserDetailedDto } from '../modules/user/store/types';
import { privateRoute } from '../navigation/navigation';
import { wrapper } from '../store/store';

const getPropertyTableItems = (user: UserDetailedDto) => [
	{ label: 'Name', value: `${user.lastName} ${user.firstName}` },
	{ label: 'Email', value: user.email },
];

const SettingsPage: NextPage = () => {
	const me = useSelector(selectMe);

	const editModal = useModalRef();
	const passwordModal = useModalRef();

	return (
		<>
			<Head>
				<title>Settings - test</title>
			</Head>
			<WithSidebar title='Settings' contentClassName='px-6'>
				<div className='min-h-screen'>
					<div className='mx-auto max-w-[400px] pb-[80px]'>
						{!!me && (
							<>
								<Card className='px-4 pb-4 pt-3'>
									<div className='flex flex-wrap items-center gap-x-2'>
										<div className='body-large-bold rounded-t-[20px]'>
											Personal data
										</div>
										<Button
											variant='text'
											className='self-start'
											size='md'
											LeftIcon={Pencil}
											onClick={() => editModal.open()}
										>
											Modify
										</Button>
									</div>
									<PropertyTable items={getPropertyTableItems(me)} className='mt-4' firstColWidth={110} />
								</Card>
								<Button
									variant='text'
									className='mt-6 self-start'
									size='md'
									LeftIcon={Lock}
									onClick={() => passwordModal.open()}
								>
									Change password
								</Button>
								<MeEditModal
									ref={editModal.ref}
									user={me}
									onClose={editModal.close}
								/>
								<PasswordChangeModal ref={passwordModal.ref} onClose={passwordModal.close} />
							</>
						)}
					</div>
				</div>
			</WithSidebar>
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx: any) => privateRoute(store, ctx));

export default SettingsPage;
