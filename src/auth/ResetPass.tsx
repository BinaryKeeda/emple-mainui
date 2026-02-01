'use client';

import { useDescope } from '@descope/react-sdk';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Alert } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import FormHeader from '../shared/auth/auth/FormHeader';
import { AuthActionButton, AuthLink, AuthTextField } from '../shared/auth/auth/StyledComponents';
import { CustomLabel } from '../shared/form/FormComponents';
import { useNavigate, useSearchParams } from 'react-router-dom';


/* ---------------------------------- */
/* Schema */
/* ---------------------------------- */

const passwordSchema = z
  .object({
    password: z
      .string()
      .regex(/^\S+$/, 'No whitespace allowed')
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character'
      ),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type PasswordForm = z.infer<typeof passwordSchema>;

export default function SetupPasswordForm() {
  const sdk = useDescope();

  const [authError, setAuthError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<boolean>(false);
  const router = useNavigate();
  const form = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode:"onChange"
  });

  /* ---------------------------------- */
  /* Helpers */
  /* ---------------------------------- */

  const getErrorMessage = (err: any) => {
    return (
      err?.errorDescription ||
      err?.error?.errorDescription ||
      'Invalid or Expired Token'
    );
  };

  /* ---------------------------------- */
  /* Handler */
  /* ---------------------------------- */

  const searchParams = useSearchParams()[0];
  const handleSetupPassword = async ({ password }: PasswordForm) => {
    try {
      const magicLinkToken = searchParams.get('t') as string;
      const response = await sdk.magicLink.verify(magicLinkToken);
      const data = response.data;
      setAuthError(null);

      const passwordUpdateResponse = await sdk.password.update(
        data?.user?.loginIds[0] as string,
        password,
        data?.refreshJwt as string
      );
      // console.log(passwordUpdateResponse);
      if (!passwordUpdateResponse.ok) {
        throw new Error('Failed to set password');
      }

      router('/');
      setSuccess(true);
    } catch (err) {
      setAuthError(getErrorMessage(err));
    }
  };

  /* ---------------------------------- */
  /* UI */
  /* ---------------------------------- */

  return (
    <>
      <FormHeader heading="Set your password" />

      <Box display="flex" flexDirection="column" gap="12px" width="100%">
        {authError && <Alert severity="error">{authError}</Alert>}

        {success ? (
          <>
            <Alert severity="success">
              Password set successfully. You can now log in.
            </Alert>

            <AuthLink href="/login">Go to login</AuthLink>
          </>
        ) : (
          <>
            <CustomLabel title="New Password" isRequired />
            <AuthTextField
              sx={{ mt: -2 }}
              type="password"
              {...form.register('password')}
              placeholder="Enter new password"
              fullWidth
              error={!!form.formState.errors.password}
              helperText={form.formState.errors.password?.message}
            />

            <CustomLabel title="Confirm Password" isRequired />
            <AuthTextField
              sx={{ mt: -2 }}
              type="password"
              {...form.register('confirmPassword')}
              placeholder="Confirm password"
              fullWidth
              error={!!form.formState.errors.confirmPassword}
              helperText={form.formState.errors.confirmPassword?.message}
            />

            <AuthActionButton
              onClick={form.handleSubmit(handleSetupPassword)}
              disabled={form.formState.isSubmitting}
            >
              Set Password
            </AuthActionButton>
          </>
        )}
      </Box>
    </>
  );
}
