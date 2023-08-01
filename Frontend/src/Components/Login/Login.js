import React, { useState, useEffect } from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { SERVER_URL } from "../../constants";
import { ethers } from "ethers";

const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    // if (!formErrors) {

    // }
  };

  const handleLogin = async (e) => {

    // e.preventDefault();
    try {

      if (window.localStorage.getItem("token") != null) {

        let token = window.localStorage.getItem("token");
        const isValidToken = await verifyToken(token);


        if (isValidToken == "Valid") {
          setUserState(window.localStorage.getItem("name"));
          navigate("/", { replace: true });
        }
        else {
          window.localStorage.removeItem("token");
        }
      }
      else {
        const res = await axios.post(`${SERVER_URL}/users/login`, user)
        if (res.status == 200) {
          alert(res.data.message);
          // setUserState(res.data.name);
        }

        let token = await res.data.token;

        window.localStorage.setItem("token", token);
        window.localStorage.setItem("name", res.data.name);

        const isValidToken = await verifyToken(token);

        if (isValidToken == "Valid") {
          setUserState(res.data.name);
          navigate("/", { replace: true });

        }
        else {
          window.localStorage.removeItem("token");
        }

      }
      //localStorage.setItem('items', JSON.stringify(res.data.publicKey));
    } catch (e) {
      alert("invalid email/password");
      // window.location = "/"
    }
  };

  const signWithMetamask = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();
      // console.log(signer,"signer")

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0]

      let stored = window.localStorage.getItem("token")

      // console.log(stored)

      if (window.localStorage.getItem("token") != null) {

        let token = window.localStorage.getItem("token");
        const isValidToken = await verifyToken(token);

        if (isValidToken == "Valid") {
          setUserState(address)
        }
        else {
          console.log("hehe")
          window.localStorage.removeItem("token");
        }
      } else {

        const nonce = await getMessage();


        // Sign the message with account and nonce
        const message = nonce.data.message;

        const signedMessage = await signer.signMessage(message);
        verifySignature(signedMessage, message, address)
      }

    } catch (error) {
      console.error("Error signing the message:", error);
    }
  }

  const verifySignature = async (signedMessage, message, address) => {
    try {
      const data = { signedMessage, message, address };

      // verify the signature 
      const responseData = await axios.post(`${SERVER_URL}/users/verifySignature`, data)
      // console.log(response.data, "121")
      let token = await responseData.data.token;


      window.localStorage.setItem("token", token);
      window.localStorage.setItem("name", responseData.data.address);

      const isValidToken = await verifyToken(token);

      console.log(isValidToken);

      if (isValidToken == "Valid") {
        setUserState(address)
      }
      else {
        console.log("hehe")
        window.localStorage.removeItem("token");
      }

    } catch (err) {
      console.log("Verification failed:", err)
    }
  }

  const verifyToken = async (token) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/users/verifyToken`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      const newresponse = response.data.message;
      if (newresponse === "Valid") {

        return "Valid";
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      return false;
    }
  };

  const getMessage = async () => {
    // console.log("hihth")
    const response = await axios.get(`${SERVER_URL}/users/getMessage`);
    return response;
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(user);
      handleLogin()
    }

  }, [formErrors]);


  return (
    <div className={loginstyle.login}>
      <form>
        <h1>Login</h1>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={changeHandler}
          value={user.email}
        />
        <p className={basestyle.error}>{formErrors.email}</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          value={user.password}
        />
        <p className={basestyle.error}>{formErrors.password}</p>
        <button className={basestyle.button_common} onClick={loginHandler}>
          Login
        </button>
      </form>
      <button className={basestyle.button_common} onClick={signWithMetamask}>
        Sign In with Metamask
      </button>
      <NavLink to="/signup">Not yet registered? Register Now</NavLink>
    </div>
  );
};
export default Login;
