import {
	createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';

export type Theme = 'dark' | 'light' | 'system';
type ThemeContextValue = {
	isDark: boolean,
 theme: Theme,
 onThemeChange: (theme: Theme) => void,
}

export const ThemeContext = createContext<ThemeContextValue>({
	isDark: false,
	theme: 'system',
	onThemeChange: () => undefined,
});

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
	const [theme, setTheme] = useState<Theme>('system');
	const [isDark, setDark] = useState(false);

	const applyTheme = useCallback(() => {
		if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, []);

	useEffect(() => {
		switch (localStorage.theme) {
			case 'dark':
				setTheme('dark');
				break;
			case 'light':
				setTheme('light');
				break;
			default: break;
		}
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setDark(document.documentElement.classList.contains('dark'));
		}, 300);
	}, [theme]);

	useEffect(() => {
		const handleChange = () => {
			applyTheme();
		};
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
		systemTheme.addEventListener('change', handleChange);

		return () => {
			systemTheme.removeEventListener('change', handleChange);
		};
	}, [applyTheme]);

	const handleThemeChange = useCallback((t: Theme)  => {
		setTheme(t);
		if (t === 'system') {
			localStorage.removeItem('theme');
		} else {
			localStorage.theme = t;
		}
		applyTheme();
	}, [applyTheme]);

	const value = useMemo<ThemeContextValue>(
		() => ({
			isDark,
			theme,
			onThemeChange: handleThemeChange,
		}),
		[isDark, theme, handleThemeChange],
	);

	return (
		<ThemeContext.Provider value={value}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
