import React, { useState ,useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Notfound from './Notfound';
import People from './People';
import Tv from './Tv';
import Movies from './Movies';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import Moviesdetails from './Moviesdetails';
import MovviesContextProvider from './Store'


export default function App() {

  const [userinfo, setuserinfo] = useState(null);

  let navigate = useNavigate()


  function getuserinfo(){
    let userdetails = localStorage.getItem("userdata");
    setuserinfo(JSON.parse(userdetails));
    // console.log(userinfo);
  }

 function ProtectedRoute(props){
  if(localStorage.getItem("userdata") === null){
    return <Navigate to={"/login"}></Navigate>;
  }else{
    return props.children;
  }
 }

 function Logout(){
  //make user info === null
  setuserinfo(null);
  //delete userdata from localstorage
  localStorage.clear("userdata");
  //navigate to login 
   navigate("/login");
 }

  //if user make a refresh in page
  //we shoudld use an function wii did mount 
 useEffect(() => {
   if(localStorage.getItem("userdata")){
    // console.log("refresh ya 3m bra7tk !!");
    getuserinfo();
   }
 }, [])
 
  return (
    <>
      <MovviesContextProvider>
        <Navbar userlogout={Logout} userdata={userinfo}/>
          <div className='container'>
              <Routes>
                <Route path='' element={<ProtectedRoute><Home></Home></ProtectedRoute>}></Route>
                <Route path='home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path='people' element={<ProtectedRoute><People /></ProtectedRoute>} />
                <Route path='tv' element={<ProtectedRoute><Tv /></ProtectedRoute>} />
                <Route path='movies' element={<ProtectedRoute><Movies /></ProtectedRoute>} />
                <Route path='moviedetails' element={<ProtectedRoute><Moviesdetails /></ProtectedRoute>} >
                  <Route path=':id' element={<ProtectedRoute><Moviesdetails /></ProtectedRoute>} />
                </Route>
                <Route path='login' element={<Login userdata={getuserinfo}/>} />
                <Route path='register' element={<Register />} />
                <Route path='*' element={<ProtectedRoute><Notfound /></ProtectedRoute>} />
            </Routes>
          </div>
        <Footer />
      </MovviesContextProvider> 
    </>
  );
}
