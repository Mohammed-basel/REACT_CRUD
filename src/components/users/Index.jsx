import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "./Loader";

export default function Index() {
  let [loader, setLoader] = useState(false);
  const [users, setUesers] = useState([]);

  const getUsers = async () => {
    const { data } = await axios.get(
      "https://crud-users-gold.vercel.app/users"
    );
    setUesers(data.users);
    setLoader(false);
  };
  const deleteUser = async (id) => {
    setLoader(true);
    const { data } = await axios.delete(
      `https://crud-users-gold.vercel.app/users/${id}`
    );
    if (data.message === "success") {
      toast.success("User deleted successfully");
      setLoader(false);
      getUsers();
    }
  };
  useEffect(() => {
    setLoader(true);
    getUsers();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <div>
      <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-5 d-none d-sm-inline">Menu</span>
            </Link>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user/create" className="nav-link text-white">
                  Create User
                </Link>
              </li>
            </ul>
            <hr />
          </div>
        </div>
          <div className="col py-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">name</th>
                  <th scope="col">email</th>
                  <th scope="col">password</th>
                  <th scope="col">action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return (
                    <React.Fragment key={user._id}>
                      <tr>
                        <td>{index}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td
                          className="btn btn-danger"
                          onClick={() => deleteUser(user._id)}
                        >
                          delete
                        </td>
                        <td className="btn btn-info">
                          <Link
                            className="text-decoration-none text-black"
                            to={`/user/${user._id}`}
                          >
                            details
                          </Link>
                        </td>
                        <td className="btn btn-warning">
                          <Link
                            className="text-decoration-none text-black"
                            to={`/user/edit/${user._id}`}
                          >
                            edit
                          </Link>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
