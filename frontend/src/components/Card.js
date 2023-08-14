import React, { useState } from "react";
import EditTask from "../modals/EditTask";
import { api } from "../config/axiosConfig";

const Card = ({ taskObj, index, updateListArray }) => {
  const [modal, setModal] = useState(false);
  const due_date = new Date(taskObj.due_date).toDateString();

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    console.log(obj.id);
    // updateListArray(obj, taskObj._id);
  };

  const handleDelete = async () => {
    await api
      .request({
        url: `/api/task-delete/${taskObj.id}/`,
        method: "DELETE",
      })
      .then(() => window.location.reload());
  };
  return (
    <>
      <div
        className="card border-secondary"
        style={{ width: "20%", height: "30%" }}
      >
        <div
          className="card-header"
          style={{ width: "100%", backgroundColor: `${taskObj.color}` }}
        >
          Tag:{" "}
          <label className="m-1" style={{ fontWeight: "bold" }}>
            {" "}
            {taskObj.tag}
          </label>
          <div className="icons">
            <i
              className="bi pencil bi-pencil-square"
              onClick={() => setModal(true)}
            >
              <EditTask
                modal={modal}
                toggle={toggle}
                updateTask={updateTask}
                taskObj={taskObj}
              />
            </i>
          </div>
          <div className="icons">
            <i className="bi trash bi-trash3" onClick={handleDelete}></i>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">{taskObj.title}</h5>
          <p className="card-text text-truncate">{taskObj.description}</p>
          <p className="card-text">Due date: {due_date}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
