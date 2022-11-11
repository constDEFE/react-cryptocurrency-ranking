import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { MdOutlineClose } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";
import { FiMenu } from "react-icons/fi";
import { logout } from "../utils/functions";
import { Style } from "../models/models";

const styles: Style = {
  nav: "h-20 fixed z-10 top-0 w-full shadow-lg bg-primary flex items-center justify-between px-4 md:px-16 font-semibold",
  logo: "font-bold text-2xl py-2",
  themeToggleButton: "p-2 hidden md:block cursor-pointer rounded-full border border-slate-300 dark:border-slate-700 shadow-slate-400 dark:shadow-slate-900 shadow-md hover:scale-105 transition-sm",
  buttonsContainer: "hidden md:flex gap-2 items-center",
  firstButton: "p-4 transition-sm hover:text-accent",
  secondButton: "bg-button text-buttonText px-5 py-2 rounded-3xl transition-sm dark:shadow-slate-800 shadow-lg hover:shadow-xl",
  mobileMenuButton: "block md:hidden cursor-pointer z-10",
  shownMobileMenuBg: "fixed top-0 left-0 w-screen h-screen",
  hiddenMobileMenuBg: "fixed -top-full left-0 w-screen h-screen",
  shownMobileMenu: "md:hidden fixed left-0 border-r-2 border-secondary top-20 flex flex-col items-center justify-between w-4/5 h-[calc(100vh-5rem)] bg-primary transition-lg z-10",
  hiddenMobileMenu: "fixed z-10 -left-full border-r-2 border-secondary top-20 w-4/5 h-[calc(100vh-5rem)] flex flex-col irems-center justify-between transition-lg",
  mobileMenuList: "w-full p-4 font-normal tracking-wider",
  mobileMenuListItem: "py-6 transition-sm hover:translate-x-2",
  mobileThemeToggleContainer: "w-full h-full flex flex-col items-center justify-end",
  mobileThemetoggle: "p-2 cursor-pointer rounded-full border border-slate-300 dark:border-slate-700 shadow-slate-400 dark:shadow-slate-900 shadow-md hover:scale-105 transition-sm",
  mobileButtonsContainer: "flex flex-col w-full p-4",
  mobileFirstButton: "w-full transition-sm my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl",
  mobileSecondButton: "w-full transition-sm my-2 p-3 bg-button text-buttonText rounded-2xl shadow-xl",
};

const Navbar = () => {
  const user = useAppSelector((state) => state.user.user);
  const [menu, setMenu] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleMenu = (): void => setMenu(!menu);

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
      setMenu(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <nav className={styles.nav}>
      <Link to={"/"}>
        <h1 className={styles.logo}>Cryptobase</h1>
      </Link>
      <div className={styles.themeToggleButton}>
        <ThemeToggle />
      </div>
      {user?.email ? (
        <div className={styles.buttonsContainer}>
          <Link className={styles.firstButton} to={"/account"}>Account</Link>
          <button className={styles.secondButton} onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div className={styles.buttonsContainer}>
          <Link to={"/signin"} className={styles.firstButton}>Sign In</Link>
          <Link to={"/signup"} className={styles.secondButton}>Sign Up</Link>
        </div>
      )}
      <div onClick={handleMenu} className={styles.mobileMenuButton}>
        {menu ? <MdOutlineClose size={35} /> : <FiMenu size={35} />}
      </div>

      {/* Mobile Menu */}
      <div onClick={handleMenu} className={menu ? styles.shownMobileMenuBg : styles.hiddenMobileMenuBg}>
        <div onClick={(event) => event.stopPropagation()} className={menu ? styles.shownMobileMenu : styles.hiddenMobileMenu}>
          <ul className={styles.mobileMenuList}>
            <Link to={"/"}>
              <li onClick={handleMenu} className={styles.mobileMenuListItem}>Home</li>
            </Link>
            <hr />
            <Link to={"/account"}>
              <li onClick={handleMenu} className={styles.mobileMenuListItem}>Account</li>
            </Link>
            <hr />
          </ul>
          <div className={styles.mobileThemeToggleContainer}>
            <div className={styles.mobileThemetoggle}>
              <ThemeToggle />
            </div>
          </div>
          {user?.email ? (
            <div className={styles.mobileButtonsContainer}>
              <Link to={"/account"}>
                <button onClick={handleMenu} className={styles.mobileFirstButton}>
                  Account
                </button>
              </Link>
              <button onClick={handleSignOut} className={styles.mobileSecondButton}>
                Sign Out
              </button>
            </div>
          ) : (
            <div className={styles.mobileButtonsContainer}>
              <Link to={"/signin"}>
                <button onClick={handleMenu} className={styles.mobileFirstButton}>
                  Sign In
                </button>
              </Link>
              <Link to={"/signup"}>
                <button onClick={handleMenu} className={styles.mobileSecondButton}>
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
