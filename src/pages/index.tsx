import type { NextPage } from 'next';
import type { Context } from 'next-redux-wrapper';

import { WithSidebar } from '../modules/sidebar/components/WithSidebar';
import { handleError, privateRoute } from '../navigation/navigation';
import { wrapper } from '../store/store';

const HomePage: NextPage = () => (
	<WithSidebar title='Dashboard' contentClassName='px-6 pb-[80px] pt-[24px]'>
		<div>Hello Word</div>
	</WithSidebar>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx: Context) => privateRoute(store, ctx, async () => {
	try { /* empty */ } catch (error) {
		return handleError(error, ctx);
	}
	return { props: {} };
}));

export default HomePage;
