import { NavLink } from "react-router-dom";
import { auth } from '../firebase/config.js';
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice.js";
import {cleanBooks} from "../store/booksSlice.js";

function Header({pageTitle}) {

  const dispatch = useDispatch();

  function logOutHandler() {
    if(confirm("Do you really want to Logout??")){
      signOut(auth).then(() => {
        dispatch(cleanBooks());
        dispatch(setUser(null));
      }).catch((error) => {
        console.log(error);
      });
    }
  }

    return (
      <>

        <h1 style={{marginBottom: "20px"}}>{pageTitle}</h1>

        <div className="header-btns">

          <NavLink to="/">
            <button className="btn">
                Books
            </button>
          </NavLink>

          <NavLink to="/add-book">
            <button className="btn">
                Add Book +
            </button>
          </NavLink>

          <button className="btn transparent" onClick={logOutHandler}>
            Logout
          </button>

            
        </div>
    
      </>
    )
  }
  
  export default Header
  