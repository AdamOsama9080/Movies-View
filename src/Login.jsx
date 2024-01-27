import axios from 'axios';
import React, { useState } from 'react';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  let [isloading, setisloading] = useState(false)

  let [errorlist, seterrorlist] = useState([])

  let [warn, setwarn] = useState("")

  let navigate = useNavigate()
  
  let [user, setuser] = useState({
    Email:"",
    Password:""
  });

  function getuserdate(e){
    //deep copy
    let myuser = {...user};
    //change || action
    myuser[e.target.name] = e.target.value;
    //set state
    setuser(myuser);
    // console.log(myuser)
  }

  const validationformLogin = () => {
    const schema = Joi.object({
      Password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required().messages({'string.pattern.base': 'Password must contain at least one letter and one number'}),
      Email: Joi.string().email({ tlds: false }).required(),
    });
    return schema.validate(user,{abortEarly:false});
  };

  async function tosubmitform(e){
    setisloading(true);
    e.preventDefault();
    let showjoiresult = validationformLogin();
  
    if(showjoiresult.error){
      setisloading(false);
      seterrorlist(showjoiresult.error.details);
      console.log(errorlist);
    } else {    try {
          let response = await axios.post(
              "http://testone2023-001-site1.htempurl.com/userinfoooo.php",
              JSON.stringify(user), // Convert user object to JSON
              // {
              //   headers: {
              //     "Content-Type": "application/x-www-form-urlencoded" // Set Content-Type header
              //   }
              // }
            );
            console.log(response.data);
            // console.log(response.data.message)
    
            if(response.data.message==="Authorization has been accepted for this request."){
              console.log("kda tmam");
              setisloading(false);
              localStorage.setItem("userdata",JSON.stringify(response.data.data));
              // props.userdata();
              navigate("/home")
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
              setisloading(false)
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              setisloading(false)
              console.log('Error', error.message);
            }
          }
      // Rest of your code...
    }
  }

  return (
    <div className="container">
    <div className="col-md-6">
      <h2 className='custom-heading mb-4'>Login Now</h2>

      {errorlist.map((ele)=><div className='alert alert-danger py-2'>{ele.message}</div>)}
      {warn.length > 0 ? (<div className='alert alert-danger' role='alert'>
        <strong>Warning!</strong> {warn}
      </div>) : ("")}

        <form onSubmit={tosubmitform} className="transparent-bg">

                <label htmlFor="Email">Email:</label>
                <input onChange={getuserdate} type="Email" className="form-control mb-3 p-2" id="Email" placeholder="Enter Email"name='Email'/>

                <label htmlFor="Password">Password:</label>
                <input onChange={getuserdate} type="password" className="form-control mb-3 p-2" id="Password" placeholder="Enter Password"name='Password'/>

            <button  className="btn btn-primary">{isloading === true?<i className='fas fa-spinner fa-spin'></i>:"Login"}</button>
        </form>
    </div>
</div>
  )
}





// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     Email: '',
//     Password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         'http://airobserver6-001-site1.atempurl.com/apiregisteracademy/userinfooo.php',
//         formData
//       );
//       console.log(response.data);
//       if (response.data.message === 'Authorization has been accepted for this request.') {
//         console.log('Login successful!');
//         // Add your logic here after successful login
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="col-md-6">
//         <h2 className="custom-heading mb-4">Login Now</h2>

//         <form onSubmit={handleSubmit} className="transparent-bg">
//           <label htmlFor="Email">Email:</label>
//           <input
//             onChange={handleChange}
//             type="email"
//             className="form-control mb-3 p-2"
//             id="Email"
//             placeholder="Enter Email"
//             name="Email"
//             value={formData.Email}
//           />

//           <label htmlFor="Password">Password:</label>
//           <input
//             onChange={handleChange}
//             type="password"
//             className="form-control mb-3 p-2"
//             id="Password"
//             placeholder="Enter Password"
//             name="Password"
//             value={formData.Password}
//           />

//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
