import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Autocomplete,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as zod from "zod";
import { BASE_URL } from "../../../lib/config";
import { loginSuccess } from "../../../redux/slice/UserSlice";
import { getUserToken } from "../utils/getToken";
const sem = ["1", "2", "3", "4", "5", "6"];

const avtars = [
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_20.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_17.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_1.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_19.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_20.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_7.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_6.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_17.png",
];
const Specialisations = [
  "Data Science",
  "Full Stack Development",
  "Artificial Intelligence & Machine Learning (AI/ML)",
  "Cyber Security",
  "Cloud Computing",
  "Software Engineering",
  "Blockchain Technology",
  "Internet of Things (IoT)",
  "Game Development",
  "Augmented Reality (AR) & Virtual Reality (VR)",
  "Computer Vision",
  "Natural Language Processing (NLP)",
  "DevOps",
  "Mobile App Development",
  "Embedded Systems",
  "Human-Computer Interaction",
  "Robotics",
  "Quantum Computing",
  "Big Data Analytics",
  "Information Systems",
  "Bioinformatics",
  "High Performance Computing",
  "Edge Computing",
  "Computer Graphics & Animation",
  "Other",
];
const years = [
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "2031",
  "2032",
  "2033",
  "2034",
  "2035",
  "2036",
  "2037",
];
const programs = [
  // Engineering
  "B.Tech in Computer Science Engineering",
  "B.Tech in Mechanical Engineering",
  "B.Tech in Electrical Engineering",
  "B.Tech in Civil Engineering",
  "B.Tech in Electronics and Communication Engineering",

  // Information Technology
  "Bachelor of Computer Applications (BCA)",
  "B.Sc in Information Technology",

  // Business and Management
  "Bachelor of Business Administration (BBA)",
  "Bachelor of Commerce (B.Com)",
  "Bachelor of Economics (B.Econ)",

  // Arts and Humanities
  "Bachelor of Arts (BA) in English Literature",
  "BA in History",
  "BA in Sociology",
  "BA in Political Science",

  // Science
  "Bachelor of Science (B.Sc) in Physics",
  "B.Sc in Chemistry",
  "B.Sc in Mathematics",
  "B.Sc in Biotechnology",
  "B.Sc in Environmental Science",

  // Medical and Allied Sciences
  "Bachelor of Pharmacy (B.Pharm)",
  "Bachelor of Physiotherapy (BPT)",
  "Bachelor of Science in Nursing (B.Sc Nursing)",
  "MBBS (Bachelor of Medicine and Surgery)",
  "Bachelor of Dental Surgery (BDS)",

  // Fine Arts and Design
  "Bachelor of Fine Arts (BFA)",
  "Bachelor of Design (B.Des) in Fashion Design",
  "B.Des in Interior Design",

  // Law
  "Bachelor of Laws (LLB)",

  // Engineering
  "M.Tech in Computer Science Engineering",
  "M.Tech in Mechanical Engineering",
  "M.Tech in Electrical Engineering",
  "M.Tech in Civil Engineering",
  "M.Tech in Electronics and Communication Engineering",

  // Information Technology
  "Masters of Computer Applications (MCA)",
  "M.Sc in Information Technology",

  // Business and Management
  "Master of Business Administration (MBA)",
  "Master of Commerce (M.Com)",
  "Master of Economics (M.Econ)",

  // Arts and Humanities
  "Master of Arts (MA) in English Literature",
  "MA in History",
  "MA in Sociology",
  "MA in Political Science",

  // Science
  "Master of Science (M.Sc) in Physics",
  "M.Sc in Chemistry",
  "M.Sc in Mathematics",
  "M.Sc in Biotechnology",
  "M.Sc in Environmental Science",

  // Medical and Allied Sciences
  "Master of Pharmacy (M.Pharm)",
  "Master of Physiotherapy (MPT)",
  "Master of Science in Nursing (M.Sc Nursing)",

  // Fine Arts and Design
  "Master of Fine Arts (MFA)",
  "Master of Design (M.Des) in Fashion Design",
  "M.Des in Interior Design",

  // Law
  "Master of Laws (LLM)",
];

export default function CompleteProfile() {
  const { user } = useSelector((s) => s.auth);
  const [avatar, setAvatar] = useState({
    src: user.avatar || avtars[0],
    idx: 0,
  });
  const [yearOfGraduation, setYearOfGraaduation] = useState(
    user.yearOfGraduation
  );
  const [program, setProgram] = useState(user.program);
  const [university, setUniversity] = useState(user.university); // Use an object for better control
  const [semester, setSemester] = useState();
  const [universitySuggestions, setUniversitySuggestions] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [specialisation, setSpecialisation] = useState("");
  const profileSchema = zod.object({
    yearOfGraduation: zod.string().nonempty("Graduation year is required"),
    program: zod.string().nonempty("Program is required"),
    university: zod.string().nonempty("University is required"),
    semester: zod.string().nonempty("University is required"),
    avatar: zod.string().nonempty(),
    specialisation: zod.string().nonempty(),
  });

  const fetchUniversities = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/university/data/${query}`);
      setUniversitySuggestions(response.data);
    } catch (error) {
      console.error("Error fetching universities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteProfile = async (e) => {
    e.preventDefault();

    setBtnLoading(true);
    try {
      const validatedData = profileSchema.parse({
        yearOfGraduation,
        program,
        university: university?.name || university,
        semester: semester,
        avatar: avatar.src,
        specialisation: specialisation,
      });
      const token = await getUserToken();
      validatedData._id = user._id;
      const response = await axios.post(
        `${BASE_URL}/auth/complete-profile`,
        validatedData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(loginSuccess(response.data.data));
    } catch (error) {
      if (error instanceof zod.ZodError) {
        alert(
          "Validation error: " + error.errors.map((e) => e.message).join(", ")
        );
      } else {
        console.error("Error:", error);
        dispatch(setError(error.response.data.message || "Error"));
      }
    } finally {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    if (user && !user.isVerified) {
      const preventScroll = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
      };

      document.body.addEventListener("scroll", preventScroll, {
        passive: false,
      });
      return () => {
        document.body.removeEventListener("scroll", preventScroll);
      };
    }
  }, [user]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (university) fetchUniversities(university);
    }, 300);
    return () => clearTimeout(timeout);
  }, [university]);

  return (
    <div className="fixed z-50 flex justify-center  items-center backdrop-blur-[3px] overflow-hidden w-screen h-screen">
      <Backdrop open={true} />
      <div className="flex rounded-2xl max-h-[calc(100vh-100px)] bg-white fixed  z-40  py-7 flex-col gap-3">
        <form
          className="form overflow-y-scroll gap-4 flex flex-col lg:max-w-[500px] w-[97vw] lg:w-[500px] px-10 my-auto max-w-[370px]"
          onSubmit={handleCompleteProfile}
        >
          <div>
            <label className="font-medium text-lg">
              Welcome {user?.name || "User"}! Complete your profile
            </label>
          </div>
          {/* Avatar Section */}
          <div className="flex lg:flex-row flex-col gap-5 items-center justify-center  w-full">
            <div className="flex  flex-col items-start gap-1">
              <img src={avatar.src} className="h-40 w-40 rounded-full" alt="" />
            </div>
            <div className="flex flex-col justify-end items-start gap-2">
              <small>Choose Avatar</small>
              <div className="grid items-center justify-center h-auto grid-cols-4 gap-1">
                {avtars.map((i, idx) => (
                  <img
                    src={i}
                    onClick={(e) =>
                      setAvatar({
                        src: i,
                        idx: idx,
                      })
                    }
                    className={`${
                      idx == avatar.idx ? "ring-sky-500 ring-1 border " : " "
                    } cursor-pointer h-14 w-14 rounded-full`}
                    alt=""
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Personal Information */}
          {/* <div className='rounded-lg  text-xs  py-6 px-4 border'>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div> */}
          <div className="inputFor mt-3">
            <Autocomplete
              required
              options={years}
              disabled={user.yearOfGraduation ? true : false}
              value={user.yearOfGraduation || yearOfGraduation}
              onChange={(event, value) => setYearOfGraaduation(value)}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Year of Graduation"
                  variant="outlined"
                />
              )}
            />
          </div>
          {/* Semester */}
          <div className="inputFor">
            <Autocomplete
              required
              options={sem}
              disabled={user.semester ? true : false}
              value={user.semester || semester}
              onChange={(event, value) => setSemester(value)}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Semester"
                  variant="outlined"
                />
              )}
            />
          </div>

          {/* Program */}
          <div className="inputFor">
            <Autocomplete
              required
              options={programs}
              disabled={user.program ? true : false}
              value={user.program || program}
              onChange={(e, newValue) => setProgram(newValue)}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label={"Program"}
                  placeholder="Select Program"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
          <div className="inputFor">
            <Autocomplete
              required
              options={Specialisations}
              // disabled={user.specialisation ? true : false}
              value={specialisation || ""}
              onChange={(e, newValue) => setSpecialisation(newValue)}
              renderInput={(params) => (
                <TextField
                  required
                  type="text"
                  {...params}
                  label={"Specialisation"}
                  placeholder="Select Program"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          {/* University */}
          <div className="inputFor">
            <Autocomplete
              required
              options={universitySuggestions}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.name || ""
              }
              disabled={user.university ? true : false}
              value={university}
              inputValue={
                typeof university === "string"
                  ? university
                  : university?.name || ""
              }
              onInputChange={(e, newInputValue) => {
                setUniversity(newInputValue);
              }}
              onChange={(e, newValue) => {
                setUniversity(newValue);
              }}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="University"
                  variant="outlined"
                  placeholder="Enter University"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </div>

          <button
            disabled={btnLoading}
            type="submit"
            className="border rounded-full py-3 text-sm  hover:bg-black text-[#f1f1f1] hover:opacity-85 transition-opacity duration-100 bg-black"
          >
            {!btnLoading ? (
              "Complete Profile"
            ) : (
              <div className="flex justify-center">
                <div className="h-6 w-6 rounded-full animate-spin border-l-[3px] border-l-sky-400 border-sky-500 border-r-[3px] border-b-[3px] border-t-[3px]"></div>
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
