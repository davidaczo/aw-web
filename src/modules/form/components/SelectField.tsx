import clsx from 'clsx';
import { useField, useFormikContext } from 'formik';
import { FC, useCallback, useRef } from 'react';

import ChevronDown from '../../../assets/icons/chevron-down';
import { useDropdownRef } from '../../ui/dropdown/hooks/useDropdownRef';
import { SelectMenu } from '../../ui/menu/components/SelectMenu';

import { CommonInputFieldProps, InputBox } from './InputBox';

export type SelectOption = {
	id: string,
	label: string,
}

export type SelectFieldProps = CommonInputFieldProps & {
	options: Array<SelectOption>;
};

export const getSelectOptions = <T extends { id: string, name: string }>(items: T[] | object): Array<SelectOption> => {
	if (Array.isArray(items)) {
		return items.map(({ id, name }) => ({ id, label: name }));
	}
	return getSelectOptions(Object.entries(items).map(([id, name]) => ({ id, name })));
};

export const SelectField: FC<SelectFieldProps> = ({
	name,
	label,
	disabled,
	readOnly,
	className,
	options,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const { isSubmitting } = useFormikContext();
	const [field, meta, helpers] = useField(name);
	const { value } = field;
	const { touched, error } = meta;
	const isError = touched && !!error;
	const menuRef = useDropdownRef();

	const handleSelect = async (id: string) => {
		await helpers.setValue(id);
		menuRef.close();
	};

	const handleAfterMenuClose = useCallback(async () => {
		await helpers.setTouched(true);
	}, [helpers]);

	const handleClick = () => {
		if (!readOnly) {
			menuRef.open();
		}
	};

	return (
		<div className={className}>
			<InputBox.Label text={label} />
			<InputBox
				rootRef={ref}
				name={name}
				value={options.find(({ id }) => id === value)?.label || ''}
				type='text'
				readOnly
				RightIcon={readOnly ? undefined : ChevronDown}
				onRightIconClick={handleClick}
				className={clsx(disabled || readOnly ? 'cursor-not-allowed' : 'cursor-pointer')}
				inputClassName={clsx(disabled || readOnly ? 'cursor-not-allowed' : 'cursor-pointer')}
				disabled={isSubmitting || disabled}
				isError={isError}
				onClick={handleClick}
			/>
			{!readOnly && (
				<SelectMenu
					ref={menuRef.ref}
					anchorRef={ref}
					menuItems={options}
					onSelect={handleSelect}
					onAfterClose={handleAfterMenuClose}
				/>
			)}
			{touched && error && (
				<InputBox.Error text={error} />
			)}
		</div>
	);
};
