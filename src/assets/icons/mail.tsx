import type { SVGProps } from 'react';

const SvgMail = (props: SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        fill="currentColor"
        {...props}
    >
        <rect width="24" height="24" rx="4" fill="none" />
        <path d="M4 8.5V16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.5l-8 5.25L4 8.5ZM20 7a2 2 0 0 0-2-2H6A2 2 0 0 0 4 7l8 5 8-5Z" />
    </svg>
);

export default SvgMail;
