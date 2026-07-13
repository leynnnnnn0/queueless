import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
    interface Window {
        Echo?: Echo<'reverb'>;
        Pusher: typeof Pusher;
    }
}

export function initializeEcho(): void {
    const key = import.meta.env.VITE_REVERB_APP_KEY;

    if (!key || window.Echo) {
        return;
    }

    const scheme = import.meta.env.VITE_REVERB_SCHEME ?? 'http';
    const port = Number(
        import.meta.env.VITE_REVERB_PORT ?? (scheme === 'https' ? 443 : 8080),
    );
    window.Pusher = Pusher;
    window.Echo = new Echo({
        broadcaster: 'reverb',
        key,
        wsHost: import.meta.env.VITE_REVERB_HOST ?? window.location.hostname,
        wsPort: port,
        wssPort: port,
        forceTLS: scheme === 'https',
        enabledTransports: ['ws', 'wss'],
    });
}
