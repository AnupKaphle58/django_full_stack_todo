import React, { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import Card from "../components/Card";
import Selector from "../components/Selector";
import { api } from "../config/axiosConfig";
import axios from "axios";
import useAuth from "./../hooks/useAuth";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const url = "http://localhost:4000/api/task";
  const { logoutUser, error } = useAuth();
  const [data, setData] = useState([]);

  const fetchAll = async () => {
    const res = await api.request({
      url: "/api/task-list/",
      method: "GET",
    });
    setData(res.data);
  };

  useEffect(() => {
    fetchAll();
  }, [modal]);

  const handleLogout = async () => {
    await logoutUser();
  };

  const filteredTask = async (status) => {
    return await axios
      .get(`${url}/filter/${status}`)
      .then((res) => setData(res.data.allTask));
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div className="main">
      <div
        className="btn btn-danger"
        style={{ margin: "5px", float: "right" }}
        onClick={handleLogout}
      >
        Logout
      </div>
      <div className="header text-center">
        <h3>Todo List</h3>
        <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>
          Create Task
        </button>
      </div>
      <div className="task-container">
        <Selector filteredTask={filteredTask} fetchAll={fetchAll} />
        {data && data.map((obj) => <Card taskObj={obj} key={obj.id} />)}
      </div>
      <CreateTask toggle={toggle} modal={modal} />
    </div>
  );
};

export default TodoList;
