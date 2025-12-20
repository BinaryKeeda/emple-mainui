// src/api/runTest.js
import axios from "axios";
import { BASE_URL } from "../../../lib/config";

export const JUDGE0_BASE = BASE_URL + "/api/data/executecode";

// Language to Judge0 language_id
const LANG_ID = {
  c: 50,
  cpp: 54,
  java: 62,
  python: 71,
};

// Base64 helpers (browser + Node safe)
const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str, "utf8").toString("base64")
    : btoa(unescape(encodeURIComponent(str)));

const fromBase64 = (b64) =>
  !b64
    ? ""
    : typeof window === "undefined"
    ? Buffer.from(b64, "base64").toString("utf8")
    : decodeURIComponent(escape(atob(b64)));

/**
 * Run a single test case against Judge0
 */
export const runSingleTest = async ({
  language,
  source_code,
  input,
  expectedOutput,
}) => {
  try {
    const createRes = await axios.post(JUDGE0_BASE, {
      language_id: LANG_ID[language] ?? 54,
      source_code: toBase64(source_code),
      stdin: toBase64(input),
      expected_output: toBase64(expectedOutput),
    });

    const result = createRes.data;

    const stdout = fromBase64(result.stdout);
    const stderr = fromBase64(result.stderr);
    const status = result?.status?.description || "Unknown";

    console.log("Judge0 Result:", result);

    const passed =
      status === "Accepted" &&
      stdout.trim() === expectedOutput.trim();

    return {
      stdout,
      stderr,
      status,
      time: result.time ?? "",
      memory: result.memory ?? 0,
      passed,
    };
  } catch (err) {
    console.error("Judge0 run error:", err);
    throw new Error(
      err?.response?.data?.message ||
        err.message ||
        "Failed to run code"
    );
  }
};
