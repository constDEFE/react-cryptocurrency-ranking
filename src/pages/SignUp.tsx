import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../utils/functions";
import { Style } from "../models/models";
import React, { 
  ChangeEvent, 
  FormEvent, 
  useState 
} from "react";

const styles: Style = {
  container: "mt-24",
  content: "max-w-[400px] mx-auto min-h-[600px] px-4 py-20",
  title: "text-2xl font-bold",
  error: "bg-red-300 p-3 my-2",
  fieldContainer: "my-4",
  inputContainer: "my-2 w-full relative rounded-2xl shadow-xl",
  input: "w-full p-2 bg-primary border border-input rounded-2xl focus:outline-none",
  icon: "absolute right-4 top-3 text-gray-400",
  button: "w-full my-2 p-3 bg-button text-buttonText rounded-2xl shadow-xl",
  link: "text-accent",
  text: "my-4",
};

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleEmail = (event: ChangeEvent<HTMLInputElement>): void => setEmail(event.target.value);
  const handlePassword = (event: ChangeEvent<HTMLInputElement>): void => setPassword(event.target.value);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError("");

    try {
      await signUp(email, password);
    } catch (error: any) {
      setError(error.message);
    } finally {
      if (!error) navigate("/account");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Sign Up</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.fieldContainer}>
            <label>Email</label>
            <div className={styles.inputContainer}>
              <input
                onChange={handleEmail}
                className={styles.input}
                type="email"
                name="email"
                id="email"
              />
              <AiOutlineMail size={20} className={styles.icon} />
            </div>
          </div>
          <div className={styles.fieldContainer}>
            <label>Password</label>
            <div className={styles.inputContainer}>
              <input
                onChange={handlePassword}
                className={styles.input}
                type="password"
                name="password"
                id="password"
              />
              <AiFillLock size={20} className={styles.icon} />
            </div>
          </div>
          <button className={styles.button}>Sign Up</button>
        </form>
        <p className={styles.text}>
          Already have an account?
          <Link className={styles.link} to={"/signin"}>
            {" "}
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
