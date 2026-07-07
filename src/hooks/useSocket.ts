import nookies from 'nookies';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

import { selectMe } from '../modules/me/store/slice';

type SocketConfig = Record<string, string>;
type Listener = {
 type: string,
 action: (data?: any) => void,
	checkSessionId?: boolean,
}

type UseSocketProps = {socketConfig: SocketConfig | null, listeners: Array<Listener> | null }

export const useSocket = ({ socketConfig, listeners }: UseSocketProps) => {
	const me = useSelector(selectMe);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
		return () => {
			setIsLoaded(false);
		};
	}, []);

	useEffect(() => {
		if (me && socketConfig && listeners && isLoaded) {
			const cookies = nookies.get();
			const socket = io(process.env.NEXT_PUBLIC_API_HOST || '', {
				query: {
					token: me.socketToken,
					...(!!cookies.sessionId && { sessionId: cookies.sessionId }),
					...socketConfig,
				},
			});

			socket.on('connect', () => {
				for (let i = 0; i < listeners.length; i += 1) {
					const { type, action, checkSessionId = true } = listeners[i];
					socket.on(type, (data: any) => {
						if (checkSessionId && data?.sessionId) {
							if (cookies.sessionId !== data.sessionId) {
								action(data);
							}
						} else {
							action(data);
						}
					});
				}
			});

			return () => {
				socket.disconnect();
			};
		}
		return () => {};
	}, [me, socketConfig, listeners, isLoaded]);
};
