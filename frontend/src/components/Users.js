import React, { useState, useEffect } from 'react'
import './css/Managefess.css'
import './css/Managestudent.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Users() {

  // code for using the usestate
  const [inputData, setInputData] = useState('')
  const [result, setResult] = useState([]) 
  // code for notify
  const errorMsg = (msg) =>
    toast.error(msg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const successMsg = (msg) =>
    toast.success(msg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  // FUNCTION FOR SEARCHING THE STUDNET DATA
  const searchStudent = async () => {
    if (inputData === "") {
      errorMsg("Please Enter User Name / Phone")
    }
    else {

      let getAPI = await fetch("http://localhost:5600/serach_users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userName:inputData})
      })
      // checking the api result
      if (getAPI) {
        getAPI = await getAPI.json()
        // setting the api result to result state
        setResult(getAPI)
      }
    }
  }


  // function for showing the users
  const showUsers = async () => {
    let getAPI = await fetch("http://localhost:5600/all_users", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    // checking the result
    if (getAPI) {
      getAPI = await getAPI.json();
      setResult(getAPI);
    }
  }

  // FUNCTION FOR DELET USER
  const delUser = async (userId) => {
    if (window.confirm("Are You Sure Want To Delete User ") === true) {
      let getAPI = await fetch("http://localhost:5600/user_del", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      })

      // checking the result
      getAPI = await getAPI.json();
      if (getAPI.status === true) {
        successMsg("User Deleted SuccessFully...");
        showUsers();
      } else {
        errorMsg("User Not Delete, Try Again...")
      }
    }
    else {
      return false;
    }
  }
  // function for useEffect
  useEffect(() => {
    showUsers();
  })
  return (
    <>

      <div className="container mt-3">
        <div className="row">
          <div className="col-9">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Enter User Name / Phone ..." autoComplete="off" onChange={(e) => { setInputData(e.target.value)}} value={inputData}
            />
          </div>


          <div className="col-3">
            <button
              type="button"
              className="btn btn-info addStudentBtn" onClick={() => { searchStudent() }}>
              Search{" "}
              <i className="fa-solid fa-search" style={{ color: "#f7f7f7", marginLeft: "10px" }}></i>
            </button>
          </div>

          {/* CODE FOR SHOWING THE RESULT HERE */}

          <div className="col-12 mt-3">

            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">User Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "white" }}>

                {
                  result.map((items, index) => {

                    return (
                      <tr key={index}>
                        <td>{items.Name}</td>
                        <td>{items.Phone}</td>

                        <td><button className='btn btn-warning' onClick={() => { delUser(items.S_No) }}>Delete User</button></td>
                      </tr>
                    )
                  })
                }

              </tbody>
            </table>
          </div>

        </div>
      </div>


      <ToastContainer />
    </>
  )
}
