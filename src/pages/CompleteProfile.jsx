import { useState, useMemo, useEffect } from "react";
import { Autocomplete, CircularProgress, debounce } from "@mui/material";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { loginSuccess } from "../redux/slice/UserSlice";
import { BASE_URL } from "../lib/config";
import AuthLayout from "../auth/AuthLayout";
import FormHeader from "../shared/auth/auth/FormHeader";
import { CustomLabel } from "../shared/form/FormComponents";
import { AuthTextField } from "../shared/auth/auth/StyledComponents";
import {
  getRefreshToken,
  useDescope,
  useUser as useDUser,
} from "@descope/react-sdk";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

// Zod schema
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
  university: z.string().optional(),
});

export default function CompleteProfile() {
  const { user } = useDUser();
  const sdk = useDescope();
  const queryClient = useQueryClient();

  const [universityOptions, setUniversityOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      password: "",
      university: user?.university || "",
    },
  });

  // Debounce API call
  const fetchUniversities = useMemo(
    () =>
      debounce(async (query) => {
        if (!query) return;
        setLoading(true);
        try {
          const res = await axios.get(`${BASE_URL}/api/university/${query}`, {
            withCredentials: true,
          });

          const data = res.data.map((item) => item.name);
          setUniversityOptions(data.includes("Others") ? data : [...data]);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }, 500),
    [],
  );

  const university = watch("university");

  useEffect(() => {
    if (university) fetchUniversities(university);
  }, [university]);

  const onSubmit = async (data) => {
    try {
      const refreshToken = getRefreshToken();
      sdk.password.update(user.loginIds[0], data.password, refreshToken);
      const res = await axios.put(
        `${BASE_URL}/api/user/signup`,
        { university: data.university, id: user.userId, name: data.name },
        { withCredentials: true },
      );
      window.location.reload();
    } catch (err) {
      console.error("Error updating university:", err);
    }
  };

  return (
    <AuthLayout>
      <FormHeader
        heading="Complete Signup With Binarykeeda"
        subheading="Please fill your university Deails"
      />
      <div className=" rounded-xl flex gap-3 flex-col w-[100%] max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <CustomLabel title="Full Name" isRequired />
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <AuthTextField
                  {...field}
                  type="text"
                  fullWidth
                  placeholder="Enter your name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </div>
          <div>
            <CustomLabel title="Set Up Passoword" isRequired />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <AuthTextField
                  {...field}
                  type="password"
                  fullWidth
                  placeholder="Enter a secure password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </div>
          <div>
            <CustomLabel title="University" />

            <Controller
              name="university"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  fullWidth
                  loading={loading}
                  options={["Others", ...universityOptions]}
                  value={value}
                  onChange={(e, newValue) => onChange(newValue)}
                  onInputChange={(e, inputValue) =>
                    fetchUniversities(inputValue)
                  }
                  renderInput={(params) => (
                    <AuthTextField
                      {...params}
                      variant="outlined"
                      placeholder="Type you university name ..."
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading ? <CircularProgress size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              )}
            />
          </div>

          <p className="text-xs m-1">
            Please fill others if your university is not listed
          </p>
          <button
            type="submit"
            className="mt-6 w-full py-2.5 bg-black text-white rounded-full"
          >
            Save University
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
