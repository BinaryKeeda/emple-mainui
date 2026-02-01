'use client';
import { useDescope } from '@descope/react-sdk';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Verify() {
    const serachParms = useSearchParams()[0];
    const sdk = useDescope();
    const navigate = useNavigate();

    const hasExchanged = useRef(false);
    const [verifiedFailed, setVerifiedFailed] = useState<boolean>(false);
    useEffect(() => {
        if (hasExchanged.current) {
            return;
        }
        const token = serachParms.get('t');
        if (!token) {
            return;
        }
        hasExchanged.current = true;
        const exchange = async () => {
            try {
                const res = await sdk.magicLink.verify(token);

                if (res?.ok) {
                    setTimeout(() => {
                        window.location.replace('/');
                    }, 2000);
                } else {
                    throw new Error('User not found');
                }
            } catch (err) {
                console.error('OAuth exchange failed', err);
                setVerifiedFailed(true);
            }
        };
        exchange();
    }, [sdk, navigate, serachParms]);

    useEffect(() => {
        let timeout: any;
        if (verifiedFailed) {
            timeout = setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
        return () => clearTimeout(timeout);
    }, [verifiedFailed, navigate]);

    return verifiedFailed ? (
        <div>Token Expired, redirecting to login...</div>
    ) : (
        <div>Verifying...</div>
    );
}
