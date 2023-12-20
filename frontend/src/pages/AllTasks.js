import React, { useEffect, useState } from "react";
import "./AllTasks.css";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Tables from "../components/Tables/Tables.js";
import Spiner from "../components/Spiner.js";
import { clearErrors, getAllRecords } from "../actions/userActions.js";
import { useAlert } from "react-alert";

const AllTasks = () => {
  const [showSpinnner, setShowSpinner] = useState(true);
  const [selectedDue, setSelectedDue] = useState("today");
  const { error, allrecords } = useSelector((state) => state.allrecords);

  const dispatch = useDispatch();
  const alert = useAlert();

  const handleRadioChange = (e) => {
    setSelectedDue(e.target.value);
    fetchTaskBasedOnDueDate(e.target.value);
  };

  const fetchTaskBasedOnDueDate = (due) => {
    dispatch(getAllRecords(due));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    setTimeout(() => {
      setShowSpinner(false);
    }, 1200);

    fetchTaskBasedOnDueDate(selectedDue);
  }, [dispatch, error, selectedDue, alert]);

  return (
    <>
      <div className="container">
        {/* add task */}
        <div className="add_btn">
          <Link to="/create">
            <Button variant="success" className="search_btn">
              <i class="fa-solid fa-plus"></i>&nbsp; Add Task
            </Button>
          </Link>
        </div>
        <div className="main_div">
          {/* filter */}
          <div className="filter_div mt-5 d-flex justify-content-center flex-wrap">
            <div className="filter_status">
              <div className="status">
                <h3 style={{ marginLeft: "55px", marginBottom: "5px" }}>
                  Filter By dates
                </h3>
                {selectedDue === "today" ? (
                  <span>Records being fetched for todays by default</span>
                ) : (
                  ""
                )}
                <div className="status_radio d-flex justify-content-around flex-wrap mt-3">
                  <Form.Check
                    type={"radio"}
                    label={`Today's due`}
                    style={{ marginRight: "10px" }}
                    name="dates"
                    value="today"
                    checked={selectedDue === "today"}
                    onChange={handleRadioChange}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Tomorrow's due`}
                    name="dates"
                    value="tomorrow"
                    checked={selectedDue === "tomorrow"}
                    onChange={handleRadioChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showSpinnner ? <Spiner /> : <Tables allrecords={allrecords} />}
      </div>
    </>
  );
};

export default AllTasks;
