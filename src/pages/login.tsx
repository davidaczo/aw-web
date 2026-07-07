import type { NextPage } from 'next';
import type { Context } from 'next-redux-wrapper';

import AuthLoginPage from '../modules/auth';
import { publicOnlyRoute, publicRoute } from '../navigation/genesis-navigation/genesisNavigation';
import { wrapper } from '../store/store';

const LoginPage: NextPage = () => <AuthLoginPage />;

export const getServerSideProps = wrapper.getServerSideProps((store) => (ctx: Context) => publicRoute(store, ctx));

export default LoginPage;
