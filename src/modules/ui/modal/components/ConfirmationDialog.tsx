import { Button, ButtonStyleVariant } from '../../components/Button';
import { createModal } from '../store/actions';

import { Modal } from './Modal';

type ConfirmationDialogProps = {
	onClose: () => void,
	onConfirm: () => void,
	title: string,
	description: string,
	buttonText: string,
	buttonVariant?: ButtonStyleVariant,
}

export const ConfirmationDialog = createModal<ConfirmationDialogProps>(({
	onClose, onConfirm, title, description, buttonText, buttonVariant = 'primary',
}) => {
	const handleConfirm = () => {
		onConfirm();
		onClose();
	};

	return (
		<Modal>
			<Modal.Header onClose={onClose}>
				{title}
			</Modal.Header>
			<Modal.Content>
				<div className='whitespace-pre-wrap leading-[1.3rem]'>{description}</div>
			</Modal.Content>
			<Modal.Actions>
				<Button variant={buttonVariant} size='md' onClick={handleConfirm}>{buttonText}</Button>
			</Modal.Actions>
		</Modal>
	);
});
