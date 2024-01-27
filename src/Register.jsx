import axios from 'axios';
import React, { useState } from 'react';
// import Joi, { date, string } from "joi"
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let [isloading, setisloading] = useState(false)

  let [errorlist, seterrorlist] = useState([])

  let [warn, setwarn] = useState("")
  
  let [user, setuser] = useState({
    FirstName:"",
    LastName:"",
    Email:"",
    Phone:0,
    Password:"",
    Birthday:"",
    Gender:""
  });

  let navigate = useNavigate()

  function getuserdate(e){
    //deep copy
    let myuser = {...user};
    //change || action
    myuser[e.target.name] = e.target.value;
    //set state
    setuser(myuser);
    // console.log(myuser)
  }

  const validationformregister = () => {
    const schema = Joi.object({
      FirstName: Joi.string().required().min(3).max(15),
      LastName: Joi.string().required().min(3).max(15),
      Birthday: Joi.date().max('now').required(),
      Phone: Joi.string().length(11).required(),
      Password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required().messages({'string.pattern.base': 'Password must contain at least one letter and one number'}),
      Gender: Joi.string().valid('Male', 'Female', 'Other').required(),
      Email: Joi.string().email({ tlds: false }).required(),
    });

    return schema.validate(user,{abortEarly:false});
  };

  async function tosubmitform(e){
    setisloading(true);
    e.preventDefault();
    let showjoiresult = validationformregister();
  
    if(showjoiresult.error){
      setisloading(false);
      seterrorlist(showjoiresult.error.details);
      console.log(errorlist);
    } else {    
      try {
          let response = await axios.post(
            // "http://airobserver6-001-site1.atempurl.com/apiregisteracademy/SignUppp.php",
            "http://testone2023-001-site1.htempurl.com/API for Notes/signuppp.php",
            JSON.stringify(user), // Convert user object to JSON
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded" // Set Content-Type header
              }
            }
            
          );
          console.log(response.data);
          // console.log(response.data.message)
    
          if(response.data.message==="Sign up was successful and verification email was sent."){
            console.log("kda tmam");
            setisloading(false)
            navigate("/login")
          }
    
          } catch (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              setisloading(false)
              console.log(error.response.data.message);
              setwarn(error.response.data.message)
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
          }
      // Rest of your code...
    }
  }

  return (
    <div className="col-md-6">
      <h2 className='custom-heading mb-4'>Register Now</h2>

      {errorlist.map((ele)=><div className='alert alert-danger py-2'>{ele.message}</div>)}
      {warn.length > 0 ? (<div className='alert alert-danger' role='alert'>
        <strong>Warning!</strong> {warn}
      </div>) : ("")}

        <form onSubmit={tosubmitform} className="transparent-bg">

                <label htmlFor="FirstName">First Name:</label>
                <input onChange={getuserdate} type="text" className="form-control mb-3 p-2" id="FirstName" placeholder="Enter First Name"name='FirstName'/>


                <label htmlFor="LastName">Last Name:</label>
                <input onChange={getuserdate} type="text" className="form-control mb-3 p-2" id="LastName" placeholder="Enter Last Name"name='LastName'/>


                <label htmlFor="Email">Email:</label>
                <input onChange={getuserdate} type="Email" className="form-control mb-3 p-2" id="Email" placeholder="Enter Email"name='Email'/>


                <label htmlFor="Phone">Phone:</label>
                <input onChange={getuserdate} type="number" className="form-control mb-3 p-2" id="Phone" placeholder="Enter Phone"name='Phone'/>

                <label htmlFor="Password">Password:</label>
                <input onChange={getuserdate} type="password" className="form-control mb-3 p-2" id="Password" placeholder="Enter Password"name='Password'/>


                <label htmlFor="Birthday">Birthday:</label>
                <input onChange={getuserdate} type="date" className="form-control mb-3 p-2" id="Birthday"name='Birthday'/>


                <label htmlFor="Gender">Gender:</label>
                <select onChange={getuserdate} name='Gender' className="form-control mb-3 p-2" id="Gender">
                    <option value="Male" className=' text-black'>Male</option>
                    <option value="Female" className=' text-black'>Female</option>
                    <option value="Other" className=' text-black'>Other</option>
                </select>

            <button  className="btn btn-primary">{isloading === true?<i className='fas fa-spinner fa-spin'></i>:"Register"}</button>
        </form>
    </div>
  )
}
