import { useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./compomnents";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(()=>setLoading(false));
  }, []);

 return !loading ? (
  <div className="min-h-sc flex flex-wrap content-between bg-gray-400">
    <div className="w-full">

    <Header></Header>
    <main>

    </main>
    <Footer></Footer>
  </div>
     </div>
  
 ) : (null)
}

export default App;
