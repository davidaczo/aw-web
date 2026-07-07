/* eslint-disable global-require */
/* eslint-disable import/no-mutable-exports */
const isFirebaseEnabled =  process.env.NEXT_PUBLIC_WITH_FIREBASE === 'true';
let actionsModule;

if (isFirebaseEnabled) {
	actionsModule = require('./firebase-actions/actions');
} else {
	actionsModule = require('./genesis-actions/actions');
}

export const { loadMe } = actionsModule;
