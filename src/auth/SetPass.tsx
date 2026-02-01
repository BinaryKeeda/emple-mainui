"use client";

import { useDescope } from "@descope/react-sdk";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Alert } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import FormHeader from "../shared/auth/auth/FormHeader";
import { CustomLabel } from "../shared/form/FormComponents";
import {
  AuthActionButton,
  AuthLink,
  AuthTextField,
} from "../shared/auth/auth/StyledComponents";

/* ---------------------------------- */
/* Schema */
/* ---------------------------------- */

const emailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

type EmailForm = z.infer<typeof emailSchema>;

export default function ResetPasswordForm() {
  const sdk = useDescope();

  const [authError, setAuthError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<boolean>(false);

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  /* ---------------------------------- */
  /* Helpers */
  /* ---------------------------------- */

  const getErrorMessage = (err: any) => {
    return (
      err?.errorDescription ||
      err?.error?.errorDescription ||
      "Failed to send reset link"
    );
  };

  /* ---------------------------------- */
  /* Handler */
  /* ---------------------------------- */

  const handleSendResetLink = async ({ email }: EmailForm) => {
    try {
      setAuthError(null);
      setSuccess(false);

      const res = await sdk.password.sendReset(
        email,
        `${window.location.origin}/reset`,
        {
          email: email,
        },
      );
      if (res.ok) {
        setSuccess(true);
      } else {
        setAuthError(getErrorMessage(res));
      }
    } catch (err) {
      setAuthError(getErrorMessage(err));
    }
  };

  /* ---------------------------------- */
  /* UI */
  /* ---------------------------------- */

  return (
    <>
      <FormHeader heading="Reset your password" />

      <Box display="flex" flexDirection="column" gap="12px" width="100%">
        {authError && <Alert severity="error">{authError}</Alert>}

        {success && (
          <Alert severity="success">
            Password reset link sent. Check your email.
          </Alert>
        )}

        <CustomLabel title="Email" isRequired />
        <AuthTextField
          sx={{ mt: -2.4 }}
          {...emailForm.register("email")}
          placeholder="Enter your email"
          fullWidth
          error={!!emailForm.formState.errors.email}
          helperText={emailForm.formState.errors.email?.message}
        />

        <AuthActionButton
          onClick={emailForm.handleSubmit(handleSendResetLink)}
          disabled={emailForm.formState.isSubmitting}
        >
          Send reset link
        </AuthActionButton>
      </Box>

      <Box mt={2}>
        <AuthLink href="/login">Back to login</AuthLink>
      </Box>
    </>
  );
}
