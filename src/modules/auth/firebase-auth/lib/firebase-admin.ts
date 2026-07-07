import * as admin from 'firebase-admin';

import { getFirebaseConfig } from '../../../../utils';

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(getFirebaseConfig()),
	});
}

export const adminAuth = admin.auth();
