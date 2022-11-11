import { FaTiktok, FaTwitter, FaFacebookF, FaGithub } from 'react-icons/fa'
import { AiOutlineInstagram } from 'react-icons/ai';
import ThemeToggle from "./ThemeToggle";
import { Style } from "../models/models";
import React from "react";

const styles: Style = {
  container: "grid md:grid-cols-2",
  left: "flex justify-evenly w-full md:max-w-[300px] uppercase",
  listTitle: "font-bold",
  listItem: "text-sm py-2",
  right: "text-right",
  rightContainer: "w-full flex justify-end",
  rightContent: "w-full md:w-[300px] py-4",
  themeToggleContainer: "flex justify-center md:justify-end py-4 md:py-0 md:pb-4 -mt-4",
  themeToggleButton: "p-2 cursor-pointer rounded-full border border-slate-300 dark:border-slate-700 shadow-slate-400 dark:shadow-slate-900 shadow-md hover:scale-105 transition-sm",
  newsText: "text-center md:text-right",
  newsContainer: "py-4",
  input: "bg-primary focus:outline-none border border-input p-2 mr-2 w-full shadow-xl rounded-2xl md:w-auto",
  button: "bg-button text-buttonText px-4 p-2 w-full rounded-2xl shadow-lg shadow-slate-400 dark:shadow-slate-800 md:w-auto my-2",
  linksContainer: "flex p-4 px-8 justify-between text-accent",
  poweredText: "text-center py-4",
};

const Footer = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div>
            <h2 className={styles.listTitle}>Support</h2>
            <ul>
              <li className={styles.listItem}>Help Center</li>
              <li className={styles.listItem}>Contact Us</li>
              <li className={styles.listItem}>API Status</li>
              <li className={styles.listItem}>Documentation</li>
            </ul>
          </div>
          <div>
            <h2 className={styles.listTitle}>Info</h2>
            <ul>
              <li className={styles.listItem}>About Us</li>
              <li className={styles.listItem}>Careers</li>
              <li className={styles.listItem}>Invest</li>
              <li className={styles.listItem}>Legal</li>
            </ul>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightContainer}>
            <div className={styles.rightContent}>
              <div className={styles.themeToggleContainer}>
                <div className={styles.themeToggleButton}>
                  <ThemeToggle />
                </div>
              </div>
              <p className={styles.newsText}>Sign Up for crypto news</p>
              <div className={styles.newsContainer}>
                <form>
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="Enter your email"
                  />
                  <button className={styles.button}>Sign Up</button>
                </form>
              </div>
              <div className={styles.linksContainer}>
                <AiOutlineInstagram size={20} />
                <FaTiktok size={20} />
                <FaTwitter size={20} />
                <FaFacebookF size={20} />
                <FaGithub size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.poweredText}>Powered by Coin Gecko</p>
    </>
  );
};

export default Footer;
