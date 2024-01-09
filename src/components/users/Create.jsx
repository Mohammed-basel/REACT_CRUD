import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Input from "../shared/Input";
import Uservalidation from "../validation/Uservalidation";
import Loader from "./Loader";

export default function Create() {
  let [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  let [errorBack, setErorrback] = useState("");
  const handleData = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const sendData = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (Object.keys(Uservalidation(user)).length > 0) {
      setErrors(Uservalidation(user));
      setLoader(false);
    } else {
      try {
        const { data } = await axios.post(
          "https://crud-users-gold.vercel.app/users/",
          user
        );
        if (data.message === "success") {
          toast.success("User added successfully");
          navigate("/user/index");
        }
      } catch (error) {
        setErorrback(error.response.data.message);
        setErrors([]);
      } finally {
        setLoader(false);
      }
    }
  };
  if (loader) {
    return <Loader />;
  }
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline">Menu</span>
            </a>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item">
                <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                  <span className="ms-1 d-none d-sm-inline">Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user/create" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                  <span className="ms-1 d-none d-sm-inline">Create User</span>
                </Link>
              </li>
            </ul>
            <hr />
          </div>
        </div>
        <div className="col py-3">
          {errorBack && <p className="text text-danger">{errorBack}</p>}
          <form onSubmit={sendData}>
            <Input
              errors={errors}
              type="text"
              id="username"
              title="User Name"
              name="name"
              handleData={handleData}
            />
            <Input
              errors={errors}
              type="email"
              id="email"
              title="User Email"
              name="email"
              handleData={handleData}
            />
            <Input
              errors={errors}
              type="password"
              id="password"
              title="User Password"
              name="password"
              handleData={handleData}
            />
            <div className="mb-3">
              <input type="submit" className="form-control" value="Add User" />
            </div>
          </form>
        </div>
      </div>
        
    </div>
  );
}
