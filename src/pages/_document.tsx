import {
	Html, Head, Main, NextScript,
} from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='manifest' href='/manifest.json' />
				<meta charSet='utf-8' />
				<meta name='description' content='test' />
				<meta property='og:type' content='website' />
				<meta property='og:title' content='test' />
				<meta property='og:description' content='test' />
				<script async src='/scripts/theme.js' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
