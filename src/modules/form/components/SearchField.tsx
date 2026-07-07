import debounce from 'lodash.debounce';
import {
	ChangeEvent, FC, useCallback, useRef, useState,
} from 'react';

import Close from '../../../assets/icons/close';
import Search from '../../../assets/icons/search';

import { InputBox } from './InputBox';

type SearchFieldProps = {
	onChange: (value: string) => void,
	disabled?: boolean,
	className?: string,
}

export const SearchField: FC<SearchFieldProps> = ({
	onChange, disabled, className,
}) => {
	const [searchTerm, setSearchTerm] = useState('');

	const searchRef = useRef<HTMLInputElement>(null);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const setSearchValue = useCallback(debounce(onChange, 300), [onChange]);

	const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		setSearchValue(e.target.value);
	};

	const handleIconClick = () => {
		if (searchTerm) {
			setSearchTerm('');
			setSearchValue('');
		} else if (searchRef.current) {
			searchRef.current.focus();
		}
	};

	const handleInputClick = () => {
		if (searchRef.current) {
			searchRef.current.select();
		}
	};

	return (
		<div className={className}>
			<InputBox
				inputRef={searchRef}
				placeholder='Search'
				value={searchTerm}
				onChange={handleSearchInputChange}
				type='text'
				disabled={disabled}
				onClick={handleInputClick}
				LeftIcon={searchTerm ? Close : Search}
				onLeftIconClick={handleIconClick}
			/>
		</div>
	);
};
