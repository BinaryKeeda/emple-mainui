'use client';

import { Alert, Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { ArrowBackIos } from '@mui/icons-material';
import FormHeader from '../shared/auth/auth/FormHeader';
import OAuthActions from './OAuthActions';
import { AuthActionButton, AuthLink, AuthTextField } from '../shared/auth/auth/StyledComponents';
import { useDescope } from '@descope/react-sdk';
import { CustomLabel } from '../shared/form/FormComponents';
import { zodResolver } from '@hookform/resolvers/zod';
/* ---------------------------------- */
/* Schemas */
/* ---------------------------------- */

const emailSchema = z.object({
    email: z.string().email('Enter a valid email'),
});

const passwordSchema = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

const otpSchema = z.object({
    code: z
        .string()
        .length(6, 'OTP must be 6 digits')
        .refine((code) => {
            // no whitespace
            const regex = /^[0-9]{6}$/;
            return regex.test(code);
        }, 'OTP must be 6 digits'),
});

type EmailForm = z.infer<typeof emailSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;
type OTPForm = z.infer<typeof otpSchema>;

type LoginStep = 'email' | 'method' | 'password' | 'otp';

export default function LoginForm() {
    const sdk = useDescope();

    const [step, setStep] = React.useState<LoginStep>('email');
    const [email, setEmail] = React.useState('');
    // const [authError, setAuthError] = React.useState<string | null>(null);

    /* ---------------------------------- */
    /* Clear auth errors on step change */
    /* ---------------------------------- */
    const [message, setMessage] = React.useState<string | null>(null);

    React.useEffect(() => {
        // setAuthError(null);
        setMessage(null);
    }, [step]);

    /* ---------------------------------- */
    /* Forms */
    /* ---------------------------------- */

    const emailForm = useForm<EmailForm>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: '' },
        mode: 'onChange',
    });

    const passwordForm = useForm<PasswordForm>({
        resolver: zodResolver(passwordSchema),
        defaultValues: { password: '' },
    });

    const otpForm = useForm<OTPForm>({
        resolver: zodResolver(otpSchema),
        defaultValues: { code: '' },
        mode: 'onChange',
    });

    /* ---------------------------------- */
    /* Handlers */
    /* ---------------------------------- */

    const handleEmailSubmit = ({ email }: EmailForm) => {
        setEmail(email);
        setStep('method');
    };

    const handlePasswordLogin = async ({ password }: PasswordForm) => {
        try {
            const res = await sdk.password.signIn(email, password);
            if (res.error) {
                // setAuthError(res.error.errorDescription as string);
                passwordForm.setError('password', {
                    message: 'Invalid Password' as string,
                });
            }
        } catch (_err: any) {
            // setAuthError(err?.errorDescription || 'Invalid email or password');
        }
    };

    const handleSendOTP = async () => {
        try {
            await sdk.otp.signUpOrIn.email(email);
            setStep('otp');
        } catch (_err: any) {
            // setAuthError(err?.errorDescription || 'Failed to send OTP');
        }
    };

    const handleVerifyOTP = async ({ code }: OTPForm) => {
        try {
            const res = await sdk.otp.verify.email(email, code);
            if (!res.ok) {
                otpForm.setError('code', { message: 'Invalid or expired OTP' });
                // setAuthError("Invalid or expired OTP");
            }
        } catch (_err: any) {
            otpForm.setError('code', { message: 'Invalid or expired OTP' });
            // setError('code', { message: 'Invalid or expired OTP' });
            // setAuthError(err?.errorDescription || 'Invalid or expired OTP');
        }
    };

    const handleMagicLink = async () => {
        try {
            await sdk.magicLink.signIn.email(
                email,
                `${window.location.origin}/verify`
            );
            setMessage('Verification email sent');
        } catch (_e) {
            // setAuthError(err?.errorDescription || 'Failed to send magic link');
        }
    };

    /* ---------------------------------- */
    /* UI */
    /* ---------------------------------- */

    return (
        <>
            <FormHeader heading="Welcome Back User , Please Sign in" />
            {step !== 'email' && (
                <IconButton onClick={() => setStep('email')} sx={{ position: 'absolute', left: '16px', top: '16px' }}>
                    <ArrowBackIos sx={{ fontSize: "16px" }} />
                </IconButton>
            )}
            <Box
                display="flex"
                sx={{ position: 'relative' }}
                width="100%"
                flexDirection="column"
                gap="12px"
            >
                {/* ---------- EMAIL STEP ---------- */}
                {step === 'email' && (
                    <>
                        <CustomLabel title="Email" isRequired />
                        <AuthTextField
                            {...emailForm.register('email')}
                            placeholder="Enter your email"
                            sx={{ mt: -2, mb: 1 }}
                            fullWidth
                            type="email"
                            error={!!emailForm.formState.errors.email}
                            helperText={emailForm.formState.errors.email?.message}
                        />

                        <AuthLink href="/reset">Forgot Password?</AuthLink>
                        <AuthActionButton
                            onClick={emailForm.handleSubmit(handleEmailSubmit)}
                        >
                            Continue
                        </AuthActionButton>
                    </>
                )}

                {/* ---------- METHOD STEP ---------- */}
                {step === 'method' && (
                    <>
                        {message && <Alert severity="success">{message}</Alert>}
                        <Typography>
                            Continue as <b>{email}</b>
                        </Typography>

                

                        <>
                            <CustomLabel title="Password" isRequired />
                            <AuthTextField
                                sx={{ mt: -2 }}
                                type="password"
                                {...passwordForm.register('password')}
                                placeholder="Enter your password"
                                fullWidth
                                error={!!passwordForm.formState.errors.password}
                                helperText={passwordForm.formState.errors.password?.message}
                            />

                            <AuthLink href="/reset">Forgot Password?</AuthLink>

                            <AuthActionButton
                                onClick={passwordForm.handleSubmit(handlePasswordLogin)}
                            >
                                Login
                            </AuthActionButton>

                        </>

                        <AuthActionButton onClick={handleSendOTP}>
                            Log in with OTP
                        </AuthActionButton>

                        <AuthActionButton onClick={handleMagicLink}>
                            Send Magic Link
                        </AuthActionButton>


                    </>
                )}

                {/* ---------- OTP STEP ---------- */}
                {step === 'otp' && (
                    <>
                        <CustomLabel title="Enter OTP" isRequired />
                        <AuthTextField
                            sx={{ mt: -2 }}
                            {...otpForm.register('code')}
                            placeholder="6-digit OTP"
                            fullWidth
                            error={!!otpForm.formState.errors.code}
                            helperText={otpForm.formState.errors.code?.message}
                        />


                        <AuthActionButton onClick={otpForm.handleSubmit(handleVerifyOTP)}>
                            {otpForm.formState.isSubmitting ? 'Verifying...' : 'Verify OTP'}
                        </AuthActionButton>
                    </>
                )}
            </Box>

            <OAuthActions />

            <Box mt={2} sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                <Typography component="span" fontSize="14px" color="black">
                    Don&apos;t have an account?{' '}
                </Typography>
                <AuthLink href="/signup">Create Account</AuthLink>
            </Box>
        </>
    );
}
