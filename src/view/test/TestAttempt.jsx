import React, { useState, useEffect } from "react";
import TestAttemptPage from "./TestAttemptPage";
import { useSelector } from "react-redux";
import { TestProvider } from "./context/TestProvider";
import { OutputWindowProvider } from "./context/TestOutputContext";
import { Modal, Box, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useUser } from "../../context/UserContext";

export default function TestAttempt({ id }) {
  const { user } = useUser();
  const [isPC, setIsPC] = useState(true);

  useEffect(() => {
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    setIsPC(!mobileRegex.test(navigator.userAgent));
  }, []);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Clear clipboard initially
    navigator.clipboard.writeText("").catch(() => {});

    /** Disable Copy/Cut/Paste events **/
    const disableClipboardEvents = (e) => {
      e.preventDefault();

      // Clear clipboard again (extra safety)
      navigator.clipboard.writeText("").catch(() => {});

      enqueueSnackbar("Copy / Paste is disabled!", {
        variant: "warning",
      });
    };

    /** Disable Ctrl+V, Ctrl+C, Ctrl+X (and Mac Cmd versions) **/
    const disableShortcuts = (e) => {
      const key = e.key.toLowerCase();

      // Block CTRL/CMD shortcuts
      if ((e.ctrlKey || e.metaKey) && ["v", "c", "x"].includes(key)) {
        e.preventDefault();

        // Clear clipboard to prevent paste fallback
        if (key === "v") {
          navigator.clipboard.writeText("").catch(() => {});
        }

        enqueueSnackbar("Copy / Paste is disabled!", {
          variant: "warning",
        });
      }
    };

    // Attach listeners
    document.addEventListener("copy", disableClipboardEvents);
    document.addEventListener("paste", disableClipboardEvents);
    document.addEventListener("cut", disableClipboardEvents);

    window.addEventListener("keydown", disableShortcuts);

    return () => {
      document.removeEventListener("copy", disableClipboardEvents);
      document.removeEventListener("paste", disableClipboardEvents);
      document.removeEventListener("cut", disableClipboardEvents);

      window.removeEventListener("keydown", disableShortcuts);
    };
  }, []);

  // Popup styles
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  if (!isPC) {
    return (
      <Modal open={!isPC}>
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Open on PC Required
          </Typography>
          <Typography variant="body1">
            This test can only be attempted on a PC or laptop. Please open this
            link from a desktop device.
          </Typography>
        </Box>
      </Modal>
    );
  }

  // Render test normally if PC
  return (
    <TestProvider userId={user._id} testId={id}>
      <OutputWindowProvider>
        <TestAttemptPage />
      </OutputWindowProvider>
    </TestProvider>
  );
}
