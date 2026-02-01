import { Box, Divider, Typography } from '@mui/material';
import { AppleLogin, GithubLogin, GoogleLoginButton, LinkedinLogin, MicrosoftLogin } from '../hooks/auth/Actions';


export default function OAuthActions() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        <GoogleLoginButton />
        <GithubLogin />
        <AppleLogin />
        <LinkedinLogin />
        <MicrosoftLogin />
      </Box>
      <Box display="flex" alignItems="center" gap={1} width="100%">
        <Divider flexItem sx={{ flex: 1, my: 'auto' }} />
        <Typography variant="caption">OR</Typography>
        <Divider flexItem sx={{ flex: 1, my: 'auto' }} />
      </Box>
    </>
  );
}
