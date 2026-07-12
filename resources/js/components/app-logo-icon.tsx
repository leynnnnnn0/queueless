import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="12" fill="currentColor" />
            <path
                d="M20 9a11 11 0 1 0 6.93 19.55l3.26 2.59 2.48-3.12-3.08-2.45A11 11 0 0 0 20 9Zm0 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z"
                fill="white"
            />
        </svg>
    );
}
