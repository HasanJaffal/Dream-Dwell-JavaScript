import { Routes, Route } from "react-router-dom";
import GuestPage from "./pages/GuestPage/GuestPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import SignUp from './pages/SignUp';
import "./index.css";



function App() {

  return (
      <div className="all scroll-smooth scroll-m-0">
        <Routes>
          <Route path="/sign-in" element={<LoginPage />}></Route>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/" element={<GuestPage />}></Route>
          <Route path="admin" element={<AdminPage />}></Route>
        </Routes>
      </div>
  )
}

export default App;
