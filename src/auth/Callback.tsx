'use client';

import { useDescope } from '@descope/react-sdk';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Callback() {
    const searchParams = useSearchParams()[0];
    const sdk = useDescope();
    const navigate = useNavigate();
    const hasExchanged = useRef(false);

    const redirect = searchParams.get('redirect') || '/';
    const ref = searchParams.get('ref');

    useEffect(() => {
        if (hasExchanged.current) {
            return;
        }
        const code = searchParams.get('code');
        if (!code) {
            return;
        }
        hasExchanged.current = true;
        const exchange = async () => {
            try {
                const res = await sdk.oauth.exchange(code);
                if (res?.ok) {
                    window.location.replace(redirect);
                    // navigate.refresh();
                }
            } catch (err) {
                console.error('OAuth exchange failed', err);
            }
        };

        exchange();
    }, [searchParams, sdk, navigate, redirect]);

    return <>Verifying…</>;
}
