import React, { useEffect, useState } from 'react'
import './css/Newadmission.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function NewAdmission() {
  // usestate for input value
  const [rewardInputPoint, setRewardInputPoint] = useState('');
  const [rewardPoint, setRewardPoint] = useState('');
  const [rewardIssueDate, setRewardIssueDate] = useState('');
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

  // code for successMsg
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

  // FUNCTION FOR FETCHING THE REWARD POINTS
  const getReward = async () => {
    let getAPI = await fetch("http://localhost:5600/reward_points", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    // checking the result
    if (getAPI) {
      getAPI = await getAPI.json();
      setRewardPoint(getAPI[0].Points)

      setRewardIssueDate(getAPI[0].DateTime)
    }
  }

  // function for update reward
  const updateReward = async () => {
    if (rewardInputPoint === '') {
      errorMsg("Reward Point Must Not Be Empty...");
      return false;
    }
    else {
      let getAPI = await fetch("http://localhost:5600/update_points", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rewardPoint: rewardInputPoint })
      })
      // code for checking the result
      getAPI = await getAPI.json();
      if (getAPI === true) {
        successMsg("Reward Point Is Updated SuccessFully...");
        getReward();
      } else {
        errorMsg("Reward Point Not Updated...")
        return false;
      }
    }
  }
  // code for useffect
  useEffect(() => {
    getReward()
  }, [])
  return (
    <>
      <h1 className='text-ligt text-center mt-4'>Reward - <span className='text-warning'>Shopssy</span></h1>
      {/* code for showing current reward points */}
      <div className="container">
        <div className="row mt-5">
          <div className="col-4 offset-2">
            <div className="card bg-success" style={{ "width": "100%" }}>
              <div className="card-body">

                <h3 className="card-subtitle mb-2 text-center" style={{ color: "black" }}>Present Reward Point</h3>
                <h2 className="card-text text-center">{rewardPoint}</h2>

              </div>
            </div>
          </div>

          <div className="col-4 ">
            <div className="card bg-danger" style={{ "width": "100%" }}>
              <div className="card-body">

                <h3 className="card-subtitle mb-2 text-center" style={{ color: "black" }}>Updated Reward Time</h3>
                <h2 className="card-text text-center">{rewardIssueDate}</h2>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* code for updating the points */}
      <div className="container mt-5">
        <h3 className='text-center mb-3'>Update Reward Points</h3>
        <div className="row">
          <div className="col-8 offset-2">
            <input type="number" placeholder='Enter Reward Point' id='rewardInput' onChange={(e) => { setRewardInputPoint(e.target.value) }} value={rewardInputPoint} />
            <button id='updateRewardBtn' onClick={() => { updateReward() }}>Update</button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  )
}
