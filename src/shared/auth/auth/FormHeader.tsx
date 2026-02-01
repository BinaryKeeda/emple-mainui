import { Box, Typography } from '@mui/material';

export default function FormHeader({ heading, subheading }: { heading?: string, subheading?: string }) {
  return (
    <Box
      sx={{
        width: '100%',
        gap: '8px',
        paddingRight: '7px',
        paddingLeft: '7px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img alt="logo" style={{ width: "150px" }} src="/logo.png" />
      {/* <Typography sx={{ textWrap: "nowrap" }} variant="h6" fontWeight={600} textAlign="center">
        {heading}
      </Typography> */}
      <Typography sx={{ textWrap: "nowrap" }} variant="body2" color="text.secondary" textAlign="center">
        {subheading ?? "Please Sign in to Continue"}
      </Typography>

    </Box>
  );
}
