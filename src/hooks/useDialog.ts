import { useState, useCallback } from "react";

export const useDialog = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleOpenDialog = useCallback(() => setIsOpenDialog(true), []);

  return {
    handleOpenDialog,
    isOpenDialog,
    setIsOpenDialog,
  };
};
