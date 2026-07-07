import nookies from 'nookies';

const isSecureCookies = () => (process.env.SECURE_COOKIES === 'true' ? process.env.NODE_ENV !== 'development' : false);

export const cookieOptions = {
	path: '/', maxAge: 365 * 24 * 60 * 60, sameSite: 'lax', secure: isSecureCookies(),
}; // TODO duplicated
export const setAuthCookies = ({
	accessToken, refreshToken, accessTokenExpiration, refreshTokenExpiration,
}: any, ctx: any = undefined) => {
	// eslint-disable-next-line no-undefined
	nookies.set(ctx, 'access_token', accessToken || '', cookieOptions);
	nookies.set(ctx, 'refresh_token', refreshToken || '', cookieOptions);
	nookies.set(ctx, 'access_token_exp', accessTokenExpiration || '', cookieOptions);
	nookies.set(ctx, 'refresh_token_exp', refreshTokenExpiration || '', cookieOptions);
};

export const isServer = typeof window === 'undefined';
