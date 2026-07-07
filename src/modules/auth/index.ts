/* eslint-disable global-require */
/* eslint-disable import/no-mutable-exports */

import { NextPage } from 'next';

const isFirebaseEnabled =  process.env.NEXT_PUBLIC_WITH_FIREBASE === 'true';
let AuthLoginPage: NextPage;

if (isFirebaseEnabled) {
	AuthLoginPage = require('./firebase-auth/components/LoginPageWithFirebase').default;
} else {
	AuthLoginPage = require('./genesis-auth/components/LoginPageGenesis').default;
}

export default AuthLoginPage;

let useLogout: () => { handleLogout: () => Promise<void> | void };

if (isFirebaseEnabled) {
	useLogout = require('./firebase-auth/hooks/useFirebaseLogout').useLogout;
} else {
	useLogout = require('./genesis-auth/hooks/useGenesisLogout').useLogout;
}

export { useLogout };
