import { setDarkTheme, setLightTheme } from "../redux/slices/themeSlice";
import { RiMoonClearFill } from "react-icons/ri";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { HiSun } from "react-icons/hi";
import React from "react";

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <>
      {theme === "dark" ? (
        <RiMoonClearFill onClick={() => dispatch(setLightTheme())} size={32} />
      ) : (
        <HiSun onClick={() => dispatch(setDarkTheme())} size={32} />
      )}
    </>
  );
};

export default ThemeToggle;
