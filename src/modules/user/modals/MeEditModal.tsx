import { TextField } from '../../form/components/TextField';
import { Button } from '../../ui/components/Button';
import { Modal } from '../../ui/modal/components/Modal';
import { createModal } from '../../ui/modal/store/actions';
import { useMeForm } from '../forms/MeForm';
import type { UserDetailedDto } from '../store/types';

type MeEditModalProps = {
	user: UserDetailedDto,
 onClose: () => void,
}

export const MeEditModal = createModal<MeEditModalProps>(({ user, onClose }) => {
	const { formik, isChanged } = useMeForm({
		user,
		onAfterSubmit: () => {
			onClose();
		},
	});

	return (
		<Modal formik={formik} width='420px'>
			<Modal.Header onClose={onClose}>Personal data</Modal.Header>
			<Modal.Content className='flex flex-col gap-y-5 pb-10 pt-4'>
				<TextField name='email' label='Email address' type='email' />
				<TextField name='lastName' label='Last name' type='text' />
				<TextField name='firstName' label='First name' type='text' />
			</Modal.Content>
			<Modal.Actions>
				<Button
					variant='primary'
					size='md'
					type='submit'
					isLoading={formik.isSubmitting}
					disabled={!isChanged}
				>
					Save
				</Button>
			</Modal.Actions>
		</Modal>
	);
});
