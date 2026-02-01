import { useDescope } from '@descope/react-sdk';
import { Apple, GitHub, Google, LinkedIn, Microsoft } from '@mui/icons-material';
import { OAuthButton } from '../../shared/auth/auth/StyledComponents';

// import { CALLBACK_URL } from '@/helpers/HttpClient';

export function GoogleLoginButton() {
  const sdk = useDescope();
  const searchParams = new URLSearchParams(window.location.search);
  const redirectPath = searchParams.get('redirect') || window.location.pathname;
  const referralCode = searchParams.get('ref') || '';
  const handleGoogleLogin = async () => {
    try {
      const url = await sdk.oauth.start.google(
        `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectPath)}&ref=${encodeURIComponent(referralCode)}`
      );
      window.location.href = url.data?.url as string;
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <OAuthButton onClick={handleGoogleLogin} icon={<img src='/icons/google.png' />}>
    </OAuthButton>
  );
}

export function GithubLogin() {
  const sdk = useDescope();
  const searchParams = new URLSearchParams(window.location.search);
  const redirectPath = searchParams.get('redirect') || window.location.pathname;
  const referralCode = searchParams.get('ref') || '';
  const handleGithubLogin = async () => {
    try {
      const url = await sdk.oauth.start.github(
        `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectPath)}&ref=${encodeURIComponent(referralCode)}`
      );
      window.location.href = url.data?.url as string;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <OAuthButton onClick={handleGithubLogin} icon={<img src='/icons/github.png' />}>
    </OAuthButton>
  );
}
export function LinkedinLogin() {
  const sdk = useDescope();
  const searchParams = new URLSearchParams(window.location.search);
  const redirectPath = searchParams.get('redirect') || window.location.pathname;
  const referralCode = searchParams.get('ref') || '';
  const handleGithubLogin = async () => {
    try {
      const url = await sdk.oauth.start.linkedin(
        `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectPath)}&ref=${encodeURIComponent(referralCode)}`
      );
      window.location.href = url.data?.url as string;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <OAuthButton onClick={handleGithubLogin} icon={<img src='/icons/linkedin.png' />}>
    </OAuthButton>
  );
}
export function MicrosoftLogin() {
  const sdk = useDescope();
  const searchParams = new URLSearchParams(window.location.search);
  const redirectPath = searchParams.get('redirect') || window.location.pathname;
  const referralCode = searchParams.get('ref') || '';
  const handleGithubLogin = async () => {
    try {
      const url = await sdk.oauth.start.microsoft(
        `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectPath)}&ref=${encodeURIComponent(referralCode)}`
      );
      window.location.href = url.data?.url as string;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <OAuthButton onClick={handleGithubLogin} icon={<img src='/icons/microsoft.png' />}>
    </OAuthButton>
  );
}
export function AppleLogin() {
  const sdk = useDescope();
  const searchParams = new URLSearchParams(window.location.search);
  const redirectPath = searchParams.get('redirect') || window.location.pathname;
  const referralCode = searchParams.get('ref') || '';
  const handleGithubLogin = async () => {
    try {
      const url = await sdk.oauth.start.apple(
        `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectPath)}&ref=${encodeURIComponent(referralCode)}`
      );
      window.location.href = url.data?.url as string;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <OAuthButton onClick={handleGithubLogin} icon={<img src='/icons/apple.png' />}>
    </OAuthButton>
  );
}

// export const verifyCode = async (code: string): Promise<boolean> => {
//   try {
//     const sdk = useDescope();
//     await sdk.oauth.exchange(code);
//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

// export const verifyMagicLink = async (code: string): Promise<boolean> => {
//   try {
//     const sdk = useDescope();
//     await sdk.magicLink.verify(code);
//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };
