import { onIdTokenChanged } from 'firebase/auth';
import type { NextComponentType, NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import Head from 'next/head';
import nookies from 'nookies';
import { FC, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

import { useJsonApi } from '../modules/api/jsonApi';
import { auth } from '../modules/auth/firebase-auth/lib/firebase';
import { loadMe } from '../modules/me/store/actions';
import { TestModeIndicator } from '../modules/ui/components/TestModeIndicator';
import { DropdownsContextProvider } from '../modules/ui/dropdown/contexts/dropdowns.context';
import { ModalsContextProvider } from '../modules/ui/modal/contexts/modals.context';
import { NavigationContextProvider } from '../navigation/contexts/navigation.context';
import { HeaderContextProvider } from '../providers/header.context';
import { LocaleContextProvider } from '../providers/locale.context';
import { ThemeContextProvider, useTheme } from '../providers/theme.context';
import '../styles/globals.scss';
import '../styles/landing.scss';
import { wrapper } from '../store/store';
import { cookieOptions, getAppType, getIsAppWithFirebase } from '../utils';

const poppins = Poppins({
	weight: ['400', '500', '600', '700', '800'],
	subsets: ['latin'],
});

const toastOptions = {
	style: {
		padding: 0, maxWidth: 'unset', boxShadow: 'none', background: 'none',
	},
};

const App: FC<AppProps> = ({ Component, ...rest }) => {
	const { store, props } = wrapper.useWrappedStore(rest);
	return (
		<Provider store={store}>
			<ThemeContextProvider>
				<AppWithStore Component={Component} pageProps={props.pageProps} />
			</ThemeContextProvider>
		</Provider>
	);
};

type AppWithStoreProps = {
	Component: NextComponentType<NextPageContext<any>, any, any>,
	pageProps: any
};

const AppWithStore: FC<AppWithStoreProps> = ({ Component, pageProps }) => {
	const [pageLoaded, setPageLoaded] = useState(false);
	const { isDark } = useTheme();
	const api = useJsonApi();
	useEffect(() => {
		setPageLoaded(true);
	}, []);

	// eslint-disable-next-line consistent-return
	useEffect(() => {
		if (getIsAppWithFirebase()) {
			const unsubscribe = onIdTokenChanged(auth, async (user) => {
				if (user) {
					const token = await user.getIdToken();
					nookies.set(undefined, 'token', token, cookieOptions);
					setTimeout(() => api(loadMe()), 500);
				}
			});

			const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
				if (!user) {
					nookies.destroy(undefined, 'token');
				}
			});
			const interval = setInterval(async () => {
				const user = auth.currentUser;
				if (user) {
					const token = await user.getIdToken(true);
					nookies.set(undefined, 'token', token, cookieOptions);
				}
			}, 600000);
			return () => {
				unsubscribe();
				unsubscribeAuth();
				clearInterval(interval);
			};
		}
	}, []);

	return (
		<main className={poppins.className}>
			<Head>
				<title>test</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='theme-color' content={isDark ? '#121212' : '#FFFFFF'} />
			</Head>
			{pageLoaded && (
				<NavigationContextProvider>
					<LocaleContextProvider>
						<HeaderContextProvider>
							<ModalsContextProvider>
								<DropdownsContextProvider>
									<Toaster toastOptions={toastOptions} />
									<Component {...pageProps} />
									{getAppType() !== 'PROD' && <TestModeIndicator />}
								</DropdownsContextProvider>
							</ModalsContextProvider>
						</HeaderContextProvider>
					</LocaleContextProvider>
				</NavigationContextProvider>
			)}
		</main>
	);
};

export default App;
