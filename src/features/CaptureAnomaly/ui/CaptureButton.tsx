"use client";
import { useCapture } from "../model/useCapture";
import styles from "./CaptureButton.module.scss";
import clsx from "clsx";
// import { useSound } from '@/shared/lib/useSound'; // Если вы добавили звуки

export const CaptureButton = ({
  id,
  isCaptured,
}: {
  id: string;
  isCaptured: boolean;
}) => {
  const { mutate, isPending } = useCapture();
  // const { play } = useSound();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Чтобы клик не всплывал (если карточка кликабельна)

    // play(isCaptured ? 'click' : 'capture'); // Разные звуки

    // Если пойман -> делаем ACTIVE, если активен -> делаем CAPTURED
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
