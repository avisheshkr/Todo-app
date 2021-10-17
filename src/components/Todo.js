import React, { useState, useEffect } from "react";
import "../style.css";
import { VscAdd } from "react-icons/vsc";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const getTasksFromStorage = () => {
  const lists = localStorage.getItem("myTasks");
  if (lists) {
    return JSON.parse(lists);
  }
};

const Todo = () => {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState(getTasksFromStorage());
  const [isEdit, setIsEdit] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const changeText = (e) => {
    setText(e.target.value);
  };

  const addTasks = () => {
    if (!text) {
      alert("Please enter the task!!!");
    } else if (text && isEdit) {
      setTasks(
        tasks.map((curTask) => {
          if (curTask.id === editedTask) {
            return { ...curTask, name: text };
          }
          return curTask;
        })
      );
      setIsEdit(false);
      setText("");
      setEditedTask(null);
    } else {
      const newTasks = {
        id: new Date().getTime(),
        name: text,
      };
      setTasks([...tasks, newTasks]);
      setText("");
    }
  };

  const editTask = (id) => {
    const editableTask = tasks.find((curTask) => curTask.id === id);
    setIsEdit(true);
    setText(editableTask.name);
    setEditedTask(id);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((curTask) => curTask.id !== id);
    setTasks(newTasks);
  };

  const removeAll = () => {
    setTasks([]);
  };

  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
  });

  return (
    <>
      <div className="todo-container">
        <img src="images/todo.jpg" alt="" />
        <h2>Add your todo tasks</h2>
        <div className="add-item">
          <input
            type="text"
            placeholder="Enter task"
            value={text}
            onChange={changeText}
          />
          {isEdit ? (
            <button className="edit-btn" onClick={addTasks}>
              <AiFillEdit />
            </button>
          ) : (
            <button onClick={addTasks}>
              <VscAdd className="add-btn" />
            </button>
          )}
        </div>
        <div className="todo-list-container">
          {tasks.map((curTask) => {
            return (
              <div key={curTask.id} className="todo-list">
                <span>{curTask.name}</span>
                <div>
                  <button
                    className="edit-btn"
                    onClick={() => editTask(curTask.id)}
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    className="del-btn"
                    onClick={() => deleteTask(curTask.id)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button className="clear-btn" onClick={removeAll}>
          Remove All
        </button>
      </div>
    </>
  );
};

export default Todo;
