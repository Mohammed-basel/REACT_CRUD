import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function Details() {
  const { id } = useParams();
  let [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const response = await axios.get(`https://crud-users-gold.vercel.app/users/${id}`);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  return (
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
        <div className="col">
          <div>
            Details for {user.name}
          </div>
        </div>
      </div>
    </div>
  );
}
