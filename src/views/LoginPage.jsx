import FullPageLoader from '../components/FullPageLoader.jsx';
import {useState} from 'react';
import { auth } from '../firebase/config.js';
import { createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        sendPasswordResetEmail, 
        onAuthStateChanged,
        signInAnonymously } from "firebase/auth";
import { setUser } from '../store/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectBooks, fetchBooks } from '../store/booksSlice.js';
import { fetchNotes, selectNotes } from '../store/notesSlice.js';

function LoginPage() {

  const [userCredential, setUserCredential] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState('login');
  const [loginError, setLoginError] = useState();
  const dispatch = useDispatch();
  const booksStatus = useSelector(selectBooks).status;
  const notesStatus = useSelector(selectNotes).status;

  onAuthStateChanged(auth, (user) => {
    let userDetails ={};
    if (user) {
      userDetails.uid = user.uid; 
      userDetails.email= user.email
      dispatch(setUser(userDetails));

      if (booksStatus == "idle"){
        dispatch(fetchBooks(userDetails.uid));
      }
      if (notesStatus == 'idle'){
        dispatch(fetchNotes(userDetails.uid));
      }
    } else {
      dispatch(setUser(null));
    }
    if (isLoading){
      setIsLoading(false);
    }
  })

  function updateUserCredential(e) {
    setUserCredential({...userCredential, [e.target.name] : e.target.value});
  }

  function signUpHandler(e) {
    e.preventDefault();
    setLoginError("");

    createUserWithEmailAndPassword(auth, userCredential.email, userCredential.password)
    .catch((error) => {
      const errorMessage = error.message;
      setLoginError(errorMessage);
    });
  }

  async function loginHandler(e){
    e.preventDefault();
    setLoginError("");
    signInWithEmailAndPassword(auth, userCredential.email, userCredential.password)
    .catch((error) => {
      const errorMessage = error.message;
      setLoginError(errorMessage);
    });
  }

  function passwordResetHandler() {
    const email = prompt("Enter Your Email address:")
    if (email){
      sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("If your Email is registed with us, We have Sent Password reset link to your Email, Please check you Inbox.");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
    }
  }

  function loginGuest(e) {
    e.preventDefault();
    signInAnonymously(auth)
    .catch((error) => {
      const errorMessage = error.message;
      setLoginError(errorMessage);
    });
  }
  
    return (
      <>
        { isLoading && <FullPageLoader></FullPageLoader> }
        
        <div className="container login-page">
          <section>
            <h1>Welcome to the Book App</h1>
            <h5>Here you can Add/Manage your online books and notes of those books. Hope you enjoy!!</h5>
            <p>Login or create an account to continue</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')} >
                  Login
              </button>
              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')} >
                  Signup
              </button>
            </div>
            <form className="add-form login">
                  <div className="form-control">
                      <label>Email *</label>
                      <input type="text" name="email" onChange={(e) => updateUserCredential(e)} placeholder="Enter your email" />
                  </div>
                  <div className="form-control">
                      <label>Password *</label>
                      <input type="password" name="password" onChange={(e) => updateUserCredential(e)} placeholder="Enter your password" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button className="active btn btn-block"
                    onClick={(e) => loginHandler(e)}>Login</button>
                    : 
                    <button className="active btn btn-block" 
                    onClick={(e) => signUpHandler(e)}>Sign Up</button>
                  }

                  {loginError && 
                  <div className="error">{loginError}</div>
                  }

                  {
                    loginType == 'login' &&
                    <p className="forgot-password" onClick={passwordResetHandler}>Forgot Password?</p>
                  }
                  <button className="active btn btn-block guest" onClick={(e) => loginGuest(e)}>Visit as Guest</button>
              </form>
          </section>
        </div>
      </>
    )
  }
  
  export default LoginPage
  