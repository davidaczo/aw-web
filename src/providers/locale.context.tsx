import { hu } from 'date-fns/locale';
import {
	createContext, PropsWithChildren, useContext, useMemo, useState,
} from 'react';

interface LocaleContextValue {
 locale: Locale,
}

export const LocaleContext = createContext<LocaleContextValue>({
	locale: hu,
});

export const LocaleContextProvider = ({ children }: PropsWithChildren) => {
	const [dateFnsLocale] = useState<Locale>(hu);

	const value = useMemo<LocaleContextValue>(
		() => ({
			locale: dateFnsLocale,
		}),
		[dateFnsLocale],
	);
	return (
		<LocaleContext.Provider value={value}>
			{children}
		</LocaleContext.Provider>
	);
};

export const useLocale = () => useContext(LocaleContext);
