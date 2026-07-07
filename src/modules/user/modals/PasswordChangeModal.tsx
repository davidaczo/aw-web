import { PasswordField } from '../../form/components/PasswordField';
import { Button } from '../../ui/components/Button';
import { Modal } from '../../ui/modal/components/Modal';
import { createModal } from '../../ui/modal/store/actions';
import { usePasswordChangeForm } from '../forms/PasswordChangeForm';

type PasswordChangeModalProps = {
 onClose: () => void,
}

export const PasswordChangeModal = createModal<PasswordChangeModalProps>(({ onClose }) => {
	const { formik } = usePasswordChangeForm({
		onAfterSubmit: onClose,
	});

	return (
		<Modal formik={formik} width='420px'>
			<Modal.Header onClose={onClose}>
				Change password
			</Modal.Header>
			<Modal.Content className='flex flex-col gap-y-5 pb-10 pt-4'>
				<PasswordField name='currentPassword' label='Current password' />
				<div className='grid grid-cols-2 gap-5 max-[600px]:grid-cols-1'>
					<PasswordField name='password' label='New password' />
					<PasswordField name='confirmPassword' label='New password again' />
				</div>
			</Modal.Content>
			<Modal.Actions>
				<Button variant='primary' size='md' type='submit' isLoading={formik.isSubmitting}>
					Change password
				</Button>
			</Modal.Actions>
		</Modal>
	);
});
