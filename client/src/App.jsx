import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router'
import PrivateRoute from './components/PrivateRoute'
import Items from './pages/Items'
import Cart from './pages/Cart'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'


const App = () => {

  const navigate = useNavigate();


  const [auth, setAuth] = useState();
  // {
  //   role: 2,
  //   id: "68bd7d1d760b71d5190e7f24",
  //   name: "User 1",
  //   username: "user1",
  //   token: "token",
  // }

  useEffect(() => {
    setAuth(localStorage.getItem("auth") != "undefined" ? JSON.parse(localStorage.getItem("auth")) : "");
  }, [localStorage.getItem("auth")]);
  console.log(auth);

  const handleLogin = (auth) => {
    localStorage.setItem("auth", JSON.stringify(auth));
    setAuth(auth);
  }

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(undefined);
  }



  return <div data-theme="bumblebee">
    <Routes>
      <Route path="/login/" element=<PrivateRoute auth={auth} />>
        <Route path='' element=<Login handleLogin={handleLogin} /> />
      </Route>
      <Route path="/signup/" element=<PrivateRoute auth={auth} />>
        <Route path='' element=<SignUp handleLogin={handleLogin} /> />
      </Route>

      <Route path="/admin/" element=<PrivateRoute auth={auth} role={1} handleLogout={handleLogout} />>

      </Route>
      <Route path="/customer/" element=<PrivateRoute auth={auth} role={2} handleLogout={handleLogout} />>
        <Route path="items" element={<Items auth={auth} />} />
        <Route path="cart" element={<Cart auth={auth} />} />
      </Route>

      <Route path="/*" element=<PrivateRoute auth={auth} />>
        <Route path="" element=<NotFound /> />
      </Route>
    </Routes>
  </div>
}

export default App
