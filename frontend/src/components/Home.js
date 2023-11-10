import React, { useState, useEffect } from "react";
import "./css/Home.css";
import { Chart } from "react-google-charts";
function Home() {
  // USESTATE FOR SHOWING TEH DATA OF STUDENTS
  const [numberUser, setNumberUser] = useState(0);
  const [numberBills, setNumberBills] = useState(0);
  const [couponAmount, setCouponAmount] = useState(0);


  // FUNCTION OF FETCHING THE NUMBER OF STUDNETS
  const getUserNumber = async () => {
    let getAPi = await fetch("http://localhost:5600/user_fetch", {
      method: "GET",
      "Content-Type": "application/json",
    });
    getAPi = await getAPi.json();
    setNumberUser(getAPi[0].user_no);
  };

  // FUNCTION OF FETCHING THE NUMBER OF TEACHERS
  const getBillNumber = async () => {
    let getAPi = await fetch(process.env.REACT_APP_TEACHERNUM_API, {
      method: "GET",
      "Content-Type": "application/json",
    });

    getAPi = await getAPi.json();
    setNumberBills(getAPi[0].teacher_no);
  };

  // FUNCTION OF FETCHING THE NUMBER OF WORKERS
  const getCouponAmount = async () => {
    let getAPi = await fetch(process.env.REACT_APP_WORKERNUM_API, {
      method: "GET",
      "Content-Type": "application/json",
    });

    getAPi = await getAPi.json();
    setCouponAmount(getAPi[0].worker_no);
  };

  // code for using the useeffect
  useEffect(() => {
    getUserNumber();
    // getTeacherStrength();
    // getWorkerStrength();
  }, []);
  // CODE FOR USER CHART
  const data = [
    ["Element", "Users", { role: "style" }],
    ["Jan", 1200, "#b87333"], // RGB value
    ["Feb", 2300, "silver"], // English color name
    ["Mar", 1000, "gold"],
    ["Apr", 1500, "color: #e5e4e2"], // CSS-style declaration
  ];

  // CODE FOR BILL DATA
  const billData = [
    ["Year", "Bills"],
    ["Jan", 1000],
    ["Feb", 1170],
    ["Mar", 660],
    ["Apr", 1030],
  ];

  const options = {
    title: "Shopssy User Bill Issue",
    curveType: "function",
    legend: { position: "bottom" },
  };

  return (
    <>
      <div>
        <div className="p-3 d-flex justify-content-around mt-1">
          <div className="px-3 pt-1 pb-3 border shadow-sm w-25 mainThreeDiv">
            <div className="text-center pb-1">
              <h4>Total Users</h4>
            </div>
            <hr />
            <div className="">
              <h3 className="text-center text-danger">{numberUser}</h3>
            </div>
          </div>
          <div className="px-3 pt-2 pb-3 border shadow-sm w-25 mainThreeDiv">
            <div className="text-center pb-1">
              <h4>Total Bills Issued</h4>
            </div>
            <hr />
            <div className="">
              <h2 className="text-center text-danger">12</h2>
            </div>
          </div>
          <div className="px-3 pt-2 pb-3 border shadow-sm w-25 mainThreeDiv">
            <div className="text-center pb-1">
              <h4>Current Coupon Award</h4>
            </div>
            <hr />
            <div className="">
              <h3 className="text-center text-danger">12</h3>
            </div>
          </div>
        </div>
      </div>

      {/* CODE FOR THE CHART */}
      <div className="container">
        <div className="row">
          <div className="col-6" style={{ boxShadow: '2px 3px 4px aqua', borderRadius: 10, padding: 10 }}>
            <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
          </div>
          <div className="col-6" style={{ boxShadow: '2px 3px 4px aqua', borderRadius: 10, padding: 10 }}>
            <Chart
              chartType="LineChart"
              width="100%"
              height="400px"
              data={billData}
              options={options}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
