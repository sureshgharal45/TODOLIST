// import React, { useEffect } from "react";
import "./Table.css";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
// import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
// import { NavLink } from "react-router-dom";
// import { clearErrors, getAllRecords } from "../../actions/userAction";

const Tables = ({ allrecords }) => {
  // const dispatch = useDispatch();
  // const alert = useAlert();
  // const { error } = useSelector((state) => state.allrecords);

  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }
  // }, [dispatch, alert, error]);

  return (
    <>
      <div className="container">
        <Row>
          <div className="col-mt-0 mt-3">
            <Card className="shadow">
              <Table className="align-align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Task description</th>
                    <th>Due date</th>
                  </tr>
                </thead>
                <tbody>
                  {allrecords &&
                    allrecords.map((record) => {
                      return (
                        <>
                          <tr key={record._id}>
                            <td>{record.name}</td>
                            <td>{record.email}</td>
                            <td>{record.description}</td>
                            <td>{record.duedate}</td>
                            <td className="d-flex align-items-center"></td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </div>
    </>
  );
};

export default Tables;
