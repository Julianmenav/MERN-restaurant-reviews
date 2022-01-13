import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import RestaurantsList from "./components/restaurants-list";
import AddReview from "./components/add-review";
import Login from "./components/login";
import Restaurant from "./components/restaurants";

function App() {
  const [user, setUser] = React.useState(null);

  //Dummy login system just for the example.
  async function login(user = null) {
    setUser(user);
  }
  async function logout() {
    setUser(null);
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item">
            {user ? (
              <a
                href="/"
                onClick={logout}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<RestaurantsList />}/>
          <Route path="/restaurants" element={<RestaurantsList />}/>
          <Route path="restaurants/:id/review" element={<AddReview user={user}/>}/>
          <Route path="restaurants/:id" element={<Restaurant user={user} />}/>
          <Route path="/login" element={<Login login={login} />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
