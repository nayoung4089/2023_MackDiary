import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService }from 'fbase';

function App() {
  const [init, setinit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect(()=> {
    authService.onAuthStateChanged((user)=> {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      }else{
        setIsLoggedIn(false);
      }
      setinit(true); // false면 로딩중 ...
    });
  }, [])
  return (
      <>
      {init? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />: "loading ..."}
      <footer>&copy; {new Date().getFullYear()} 맨날맥날</footer>
      </>
  )
}

export default App;
