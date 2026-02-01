'use client';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Link,
  type ButtonProps,
  TextField,
  styled,
  type TextFieldProps,
  Typography,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { forwardRef, useState } from 'react';


export const AuthTextField = forwardRef<
  HTMLInputElement,
  TextFieldProps
>(function AuthTextField(props, ref) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = props.type === "password";

  const commonInputSx = {
    borderRadius: "12px",
    backgroundColor: "#f6f8f9",
    minHeight: 44,
    fontSize: 15,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#eef2f4",
      transition: "border-color 0.2s ease",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2979FF",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2979FF",
      borderWidth: 2,
    },
    "& input::placeholder": {
      color: "#9aa4ab",
      opacity: 1,
    },
    ...(props.InputProps?.sx || {}),
  };

  return (
    <TextField
      {...props}
      type={isPasswordField && showPassword ? "text" : props.type}
      inputRef={ref} // 🔥 THIS LINE FIXES EVERYTHING
      InputProps={{
        ...props.InputProps,
        sx: commonInputSx,
        endAdornment: isPasswordField ? (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((p) => !p)}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOff sx={{ fontSize: 15, color: "#9a9a9a" }} />
              ) : (
                <Visibility sx={{ fontSize: 15, color: "#9a9a9a" }} />
              )}
            </IconButton>
          </InputAdornment>
        ) : (
          props.InputProps?.endAdornment
        ),
      }}
    />
  );
});


export const AuthLink = styled(Link)({
  fontStyle: 'Regular',
  fontSize: '12px',
  cursor: "pointer",
  textTransform: "capitalize",
  textDecorationLine: "underline",
  leadingTrim: 'NONE',
  lineHeight: '20px',
  letterSpacing: '0%',
  color: 'rgba(0, 123, 255, 1)',
  textAlign: 'end',
});

export const AuthText = styled(Typography)({
  fontWeight: 400,
  fontStyle: 'Regular',
  fontSize: '12px',
  leadingTrim: 'NONE',
  lineHeight: '19.5px',
});

export const AuthActionButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      sx={{
        background: 'linear-gradient(92.36deg, #007BFF 0.21%, #004A99 141.87%)',
        borderRadius: '8px',
        height: '44px',
        color: 'white',
      }}
    >
      {props.children}
    </Button>
  );
};

type OAuthButtonProps = ButtonProps & {
  icon?: React.ReactNode;
};

export const OAuthButton = (props: OAuthButtonProps) => {
  return (
    <span
      {...props}
      style={{
        cursor:"pointer",
        height: "30px",
        textTransform: 'none',
        borderRadius: '1000px',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "30px",
        color: "#fff",
        border:"1px solid #f5f5f5",
        padding: 0,
      }}
    >
      {props.icon}
    </span>

  );
};
