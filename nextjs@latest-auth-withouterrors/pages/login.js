import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { GiBleedingEye } from "react-icons/gi";
import styles from "../styles/Home.module.scss";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handlePasswordShowing = () => {
    setShowPassword(!showPassword);
  };
  const handleInputs = (e, arg) => {
    arg(e.target.value);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    return axios
      .post("api/login", data)
      .then((response) => {
        setSuccess(response.data);
        console.log(response.data);
      })
      .catch((err) => setError(err.response.data));
  };
  return (
    <div className={styles._login_compo}>
      <div className={styles._login_compo_display_error}>
        {error.length <= 0 ? null : <h4>{error}</h4>}
      </div>
      <div className={styles._login_compo_display_success}>
        {success.length <= 0 ? null : <h4>{success}</h4>}
      </div>
      <div className={styles._login}>
        <div className={styles._login_form_handler}>
          <form onSubmit={onSubmitForm}>
            <div>
              <img
                src="/Fingerprint.svg"
                width="200"
                height="200"
                alt="pneumatique app login"
                title="pneumatique app login"
              />
            </div>
            <div>
              <h1>C.T.P.D</h1>
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  handleInputs(e, setEmail);
                }}
                placeholder="email"
              />
            </div>
            <div className={styles._login_form_handler_input_withEye}>
              <input
                type={showPassword ? "text" : "password"}
                name="Mot de passe"
                value={password}
                onChange={(e) => {
                  handleInputs(e, setPassword);
                }}
                placeholder="Mot de passe"
              />
              {showPassword ? (
                <span onClick={handlePasswordShowing}>
                  <GiBleedingEye color="#fff" size={20} />
                </span>
              ) : (
                <span
                  className={
                    styles._login_form_handler_input_withEye_FaRegEyeSlash
                  }
                  onClick={handlePasswordShowing}
                >
                  <FaRegEyeSlash color="#fff" size={20} />
                </span>
              )}
            </div>
            <div>
              <button>connexion</button>
            </div>
          </form>
        </div>
        <div className={styles._login_backgroundImage}></div>
      </div>
    </div>
  );
}

export default Login;
