"use client";
import { useCapture } from "../model/useCapture";
import styles from "./CaptureButton.module.scss";
import clsx from "clsx";

export const CaptureButton = ({
  id,
  isCaptured,
}: {
  id: string;
  isCaptured: boolean;
}) => {
  const { mutate, isPending } = useCapture();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    const newStatus = isCaptured ? "ACTIVE" : "CAPTURED";
    mutate({ id, status: newStatus });
  };

  return (
    <button
      className={clsx(styles.btn, isCaptured && styles.release)}
      disabled={isPending}
      onClick={handleClick}
    >
      {isPending ? "PROCESSING..." : isCaptured ? "RELEASE" : "CAPTURE"}
    </button>
  );
};
