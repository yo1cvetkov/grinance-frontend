import { enqueueSnackbar } from "notistack";

export const enqueueSuccess = (message: string, top?: boolean) =>
  enqueueSnackbar(message, {
    variant: "success",
    style: {
      backgroundColor: "#10b77f",
    },
    anchorOrigin: {
      vertical: top ? "top" : "bottom",
      horizontal: top ? "center" : "right",
    },
  });

export const enqueueError = (message: string, top?: boolean) =>
  enqueueSnackbar(message, {
    variant: "error",
    style: {
      backgroundColor: "#ef4444",
    },
    anchorOrigin: {
      vertical: top ? "top" : "bottom",
      horizontal: top ? "center" : "right",
    },
  });
