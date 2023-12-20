import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useAlert } from "react-alert";
import Spiner from "../components/Spiner";
import {
  clearErrors,
  createRecord,
} from "../actions/userActions";
import { CREATE_RECORD_RESET } from "../constants/userConstants";
import "./createTask.css";

const CreateTask = () => {
  const [showSpinner, setShowSpinner] = useState(true);
  const [dueDate, setDueDate] = useState();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, success } = useSelector((state) => state.record);
  const navigate = useNavigate();
  const [inputdata, setInputData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const options = [
    { value: "Today", label: "Today" },
    { value: "Tomorrow", label: "Tomorrow" },
  ];

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  const handleDateSelection = (selectedDate) => {
    const todayDate = new Date().toISOString().split("T")[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    const tomorrowDate = tomorrow.toISOString().split("T")[0];
    setDueDate(selectedDate === "Today" ? todayDate : tomorrowDate);
  };

  const submitUserData = async (e) => {
    e.preventDefault();

    const { name, email, description } = inputdata;

    if (name === "") {
      alert.error("Name is Required!");
    } else if (description === "") {
      alert.error("Task description is Required!");
    } else if (email === "") {
      alert.error("Email is Required!");
    } else if (dueDate === "") {
      alert.error("Please select the date");
    } else {
      alert.success("Task created successfully");
    }

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("description", description);
    myForm.append("duedate", dueDate);

    dispatch(createRecord(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      setInputData({
        ...inputdata,
        name: "",
        email: "",
        description: "",
      });
      setDueDate();
      navigate("/");
    }

    setTimeout(() => {
      setShowSpinner(false);
    }, 1200);

    dispatch({ type: CREATE_RECORD_RESET });
  }, [dispatch, error, success, navigate, inputdata, alert]);

  return (
    <>
      {showSpinner ? (
        <Spiner />
      ) : (
        <div className="container mt-3 shadow_card">
          <h2 className="text-center mt-1">Create a Task</h2>
          <Card className="mt-3 p-3 w-50">
            <Form className="form_class">
              <Row>
                <Form.Group
                  className="mb-3 col-lg-7"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    style={{ width: "170%" }}
                    value={inputdata.name}
                    onChange={setInputValue}
                    placeholder="Enter Name"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-7"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    style={{ width: "170%" }}
                    value={inputdata.email}
                    onChange={setInputValue}
                    placeholder="Enter Email"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    placeholder="Add the task related description"
                    style={{ height: "100px", width: "200%" }}
                    value={inputdata.description}
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-8"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select due date to complete task</Form.Label>
                  <Select
                    options={options}
                    name="categories"
                    onChange={(e) => handleDateSelection(e.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={submitUserData}
                >
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
        </div>
      )}
    </>
  );
};

export default CreateTask;
