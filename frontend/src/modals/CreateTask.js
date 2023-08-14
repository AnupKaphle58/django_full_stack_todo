import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import { CirclePicker } from "react-color";
import DatePicker from "react-date-picker";
import { api } from "../config/axiosConfig";

const CreateTaskPopup = ({ modal, toggle }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState(false);
  const [color, setColor] = useState("#f44336");
  const [dueDate, setDueDate] = useState(new Date());

  const options = [{ INPROGRESS: false }, { COMPLETED: true }];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      setTitle(value);
    } else if (name === "status") {
      setStatus(value);
    } else if (name === "tag") {
      setTag(value);
    } else if (name === "description") {
      setDescription(value);
    } else {
      setColor(value);
    }
  };
  const onClickChange = (e) => {
    setStatus(e.target.value);
  };
  const handleColor = (e) => {
    setColor(e.hex);
  };

  const handleDateChange = (date) => {
    setDueDate(date);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let taskObj = {};
    taskObj["title"] = title;
    taskObj["description"] = description;
    taskObj["completed"] = status;
    taskObj["tag"] = tag;
    taskObj["due_date"] = dueDate;
    taskObj["color"] = color;
    await api
      .request({
        url: "/api/task-create/",
        method: "POST",
        data: taskObj,
      })
      .then((a) => {
        console.log(a);
        toggle("false");
        setTitle("");
        setDescription("");
        setTag("");
        setStatus("");
        setColor("");
        setDueDate(new Date());
      });
    console.log(taskObj);
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Task</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Task Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleChange}
            name="title"
          />
        </div>
        <div className="form-group">
          <label>Task Status</label>
          <Input type="select" onClick={handleChange}>
            {options.map((option, index) => {
              return (
                <option value={Object.values(option)} key={index}>
                  {" "}
                  {Object.keys(option)}{" "}
                </option>
              );
            })}
          </Input>
        </div>
        <div className="form-group">
          <label>Task tag</label>
          <input
            type="text"
            className="form-control"
            value={tag}
            onChange={handleChange}
            name="tag"
          />
        </div>
        <div className="form-group">
          <div>Due Date</div>
          <DatePicker
            onChange={handleDateChange}
            value={dueDate}
            minDate={new Date()}
          />
        </div>
        <div className="form-group">
          <label>Tag color</label>
          <CirclePicker color={color} onChange={handleColor} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="5"
            className="form-control"
            value={description}
            onChange={handleChange}
            name="description"
          ></textarea>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Create
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateTaskPopup;
