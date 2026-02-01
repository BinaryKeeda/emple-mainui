'use client';
import {
  type SelectProps,
  type TextFieldProps,
  Box,
  Button,
  styled,
  TextField,
  Typography,
  Chip,
} from '@mui/material';
import { Loader } from 'lucide-react';


export function CustomLabel({
  title,
  isRequired,
  icon,
}: {
  title: string;
  isRequired?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <Typography
      component="label"
      sx={{
        fontSize: '14px',
        fontWeight: '400',
        color: '#0f1729',
        display: 'flex',
        marginBottom: '4px',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {icon}
      {title}
      {isRequired && <span style={{ color: '#3c83f6' }}>*</span>}
    </Typography>
  );
}

export const ToolTextInput = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      variant="outlined"
      //  helper text red
      // FormHelperTextProps={{
      //   ...props.FormHelperTextProps,
      //   sx: {
      //     color: '#ef4444',
      //     px: 1,
      //     mx: 0,
      //     ...(props.FormHelperTextProps?.sx || {}),
      //   },
      // }}
      InputProps={{
        ...props.InputProps,
        sx: {
          borderRadius: '12px',
          backgroundColor: '#f6f8f9',
          minHeight: 44,
          fontSize: 15,

          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#eef2f4',
            transition: 'border-color 0.2s ease',
          },

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2979FF',
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2979FF',
            borderWidth: 2,
          },

          '& input::placeholder': {
            color: '#9aa4ab',
            opacity: 1,
          },

          // allow overrides from caller
          ...(props.InputProps?.sx || {}),
        },
      }}
    />
  );
};

export const ChipInput = styled(Chip)({
  cursor: 'pointer',
  margin: 0,
  color: '#6b7280',
  border: 'none',
  fontSize: '14px',
  padding: '22px 1px',
});

export const StepChangeButton = styled(Button)({
  padding: '8px 16px',
  borderRadius: '12px',
});


export const ErrorField = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography
      sx={{
        color: '#ef4444',
        p: 1.3,
        mx: 0,
        fontSize: '0.75rem',
        mt: 0.5,
      }}
    >
      {children}
    </Typography>
  );
};

export const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <style>
        {`
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`}
      </style>
      <Loader
        size={25}
        style={{
          animation: 'spin 1s linear infinite',
        }}
      />
    </Box>
  );
};

