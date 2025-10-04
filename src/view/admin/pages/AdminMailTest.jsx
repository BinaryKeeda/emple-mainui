import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import {
  Button,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BASE_URL } from "../../../lib/config";

export default function EmailSender() {
  const { testId } = useParams();

  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState([]);

  // New fields sent to backend
  const [testDate, setTestDate] = useState("");
  const [testTime, setTestTime] = useState("");
  const [basicInfo, setBasicInfo] = useState("");

  const [status, setStatus] = useState({ sent: 0, failed: 0, total: 0 });
  const [isSending, setIsSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const pollingRef = useRef(null);

  // Parse JSON input for emails
  const handleEmailInputChange = (e) => {
    setEmailInput(e.target.value);
    try {
      const arr = JSON.parse(e.target.value);
      if (Array.isArray(arr)) {
        setEmails(arr.map((email) => email.trim().toLowerCase()));
        setStatus({ sent: 0, failed: 0, total: arr.length });
      }
    } catch {
      setEmails([]);
      setStatus({ sent: 0, failed: 0, total: 0 });
    }
  };

  // Parse XLSX upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      let emailColumnName = null;
      if (jsonData.length > 0) {
        const keys = Object.keys(jsonData[0]);
        emailColumnName = keys.find((key) =>
          ["email", "Email", "EMAIL", "E-mail"].includes(key)
        );
      }

      if (!emailColumnName) {
        alert("Could not find an email column named 'email' in Excel file");
        return;
      }

      const extractedEmails = jsonData
        .map((row) => row[emailColumnName])
        .filter((email) => email)
        .map((email) => email.toString().trim().toLowerCase());

      setEmails(extractedEmails);
      setEmailInput(JSON.stringify(extractedEmails, null, 2));
      setStatus({ sent: 0, failed: 0, total: extractedEmails.length });
    };

    reader.readAsArrayBuffer(file);
  };

  // Start sending emails
  const startSending = async () => {
    if (!emails.length) {
      alert("Please provide emails via JSON input or Excel upload.");
      return;
    }

    setIsSending(true);
    setStatus((prev) => ({ ...prev, failed: 0 }));

    try {
      const res = await fetch(
        `${BASE_URL}/api/admin/campus-test/${testId}/send-mails`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ emails, testDate, testTime, basicInfo }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to start sending");
      pollingRef.current = setInterval(fetchStatus, 3000);
    } catch (err) {
      alert(err.message);
      setIsSending(false);
    }
  };

  // Polling status
  const fetchStatus = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/admin/campus-test/${testId}/email-status`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.completed) {
        clearInterval(pollingRef.current);
        setIsSending(false);
        alert("Email sending completed!");
      }
      setStatus(data);
    } catch (err) {
      clearInterval(pollingRef.current);
      setIsSending(false);
      alert("Failed to fetch status");
    }
  };

  useEffect(() => {
    return () => clearInterval(pollingRef.current);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="font-semibold">Accepted Input Formats</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <b>JSON Array</b>: Paste a JSON array of emails into the textarea below.
            <br />
            Example: <code>["email1@example.com", "email2@example.com"]</code>
            <br />
            <br />
            <b>Excel (.xlsx) file</b>: Upload an Excel file with one column named{" "}
            <code>email</code> (case-insensitive).
          </Typography>
        </AccordionDetails>
      </Accordion>

      <TextField
        label="Paste JSON array of emails"
        multiline
        minRows={5}
        value={emailInput}
        onChange={handleEmailInputChange}
        disabled={isSending}
        fullWidth
        variant="outlined"
        placeholder='Example: ["email1@example.com", "email2@example.com"]'
      />

      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Or upload Excel (.xlsx) file with "email" column:
        </label>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileUpload}
          disabled={isSending}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* New input fields */}
      <TextField
        label="Test Date"
        value={testDate}
        onChange={(e) => setTestDate(e.target.value)}
        disabled={isSending}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Test Time"
        value={testTime}
        onChange={(e) => setTestTime(e.target.value)}
        disabled={isSending}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Additional Basic Info"
        multiline
        minRows={3}
        value={basicInfo}
        onChange={(e) => setBasicInfo(e.target.value)}
        disabled={isSending}
        fullWidth
        variant="outlined"
        placeholder="Additional information to include in email"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={startSending}
        disabled={isSending || emails.length === 0}
        className="w-full py-3 mt-4"
        size="large"
      >
        {isSending ? (
          <>
            Sending Emails... <CircularProgress size={20} className="ml-2" />
          </>
        ) : (
          "Start Sending Emails"
        )}
      </Button>

      <Button
        onClick={() => setShowPreview(!showPreview)}
        className="mt-4 text-blue-600 hover:underline"
      >
        {showPreview ? "Hide" : "Show"} Email Preview ({emails.length})
      </Button>

      {showPreview && (
        <div className="max-h-64 overflow-y-auto bg-gray-50 border border-gray-300 rounded p-4 font-mono whitespace-pre-wrap mt-2">
          {emails.length > 0 ? (
            emails.map((email, idx) => <div key={idx}>{email}</div>)
          ) : (
            <div>No emails to preview</div>
          )}
        </div>
      )}

      <div className="mt-6 text-center text-lg font-semibold">
        Sent: <span className="text-green-600">{status.sent}</span> / {status.total} | Failed:{" "}
        <span className="text-red-600">{status.failed}</span>
      </div>
    </div>
  );
}
