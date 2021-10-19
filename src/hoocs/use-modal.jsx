import { useState, useEffect, useCallback } from "react";

const useModal = (value = "", state = false) => {
  const [info, setInfo] = useState(value);
  const [isOpen, setIsOpen] = useState(state);

  const closeByEsc = useCallback((e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keyup", closeByEsc);
    return () => document.removeEventListener("keyup", closeByEsc);
  }, [isOpen, closeByEsc]);

  const openModal = useCallback((data) => {
    if (data === undefined) {
      console.log("Не передан или не корректен аргумент ф-ии openModal");
    }
    setInfo(data);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, info, openModal, closeModal };
};

export default useModal;
