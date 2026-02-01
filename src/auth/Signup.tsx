'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';


import OAuthActions from './OAuthActions';
import { useDescope } from '@descope/react-sdk';
import { useSearchParams } from 'react-router-dom';
import FormHeader from '../shared/auth/auth/FormHeader';
import { CustomLabel } from '../shared/form/FormComponents';
import { AuthActionButton, AuthLink, AuthTextField } from '../shared/auth/auth/StyledComponents';
const signupSchema = z.object({
    email: z.string().email('Invalid email').refine(
        (val) => !val.includes('+'),
        {
            message: 'Email cannot contain + symbol',
        }
    ),
});

type SignupData = z.infer<typeof signupSchema>;
export default function Signup() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignupData>({
        resolver: zodResolver(signupSchema),
    });

    const [message, setMessage] = useState('');

    const sdk = useDescope();
    const searchParams = useSearchParams()[0];
    const handleSignup = async (data: SignupData) => {
        try {
            const ref = searchParams.get('ref');
            let res;
            if (ref) {
                res = await sdk.magicLink.signUpOrIn.email(
                    data.email,
                    `${window.location.origin}/verify`,
                    {
                        customClaims: {
                            ref,
                        },
                    }
                );
            } else {
                res = await sdk.magicLink.signUp.email(
                    data.email,
                    `${window.location.origin}/verify`
                );
            }

            if (res.ok) {
                setMessage('Verification email sent');
            } else {
                setError('email', {
                    message: res.error?.errorDescription || 'Signup failed',
                });
            }
        } catch (error) {
            console.error(error);
            setError('email', { message: 'User already exists' });
        }
    };

    return (
        <>
            {/* {JSON.stringify(user?.password)} */}
            <FormHeader subheading="Welcome back user , Please Signup" />
            <OAuthActions />
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    gap: '12px',
                }}
            >
                {message && (
                    <Alert
                        severity="success"
                        sx={{ width: '100%' }}
                        onClose={() => setMessage('')}
                    >
                        {message}
                    </Alert>
                )}
                <Box sx={{ width: '100%' }}>
                    <CustomLabel title="Email" isRequired />
                    <AuthTextField
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        placeholder="Enter your email"
                        sx={{ height: '44px', mt: -1, mb: 1.3 }}
                        fullWidth
                        {...register('email')}
                    />
                </Box>
                <AuthActionButton
                    disabled={isSubmitting}
                    onClick={handleSubmit(handleSignup)}
                >
                    Signup
                </AuthActionButton>
            </Box>
            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center" , gap:1}}>
                <Typography
                    component="span"
                    sx={{
                        fontWeight: 400,
                        fontSize: '14px',
                        color: 'rgba(107, 114, 128, 1)',
                        textAlign: 'end',
                    }}
                >
                    Already a user ?{' '}
                </Typography>
                <AuthLink sx={{ fontSize: '14px', fontWeight: 400 }} href="/login">
                    Log in
                </AuthLink>
            </Box>
        </>
    );
}
