import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TodoList = () => {
  const [task, setTask] = useState([
    { id: uuidv4(), task: "task 1", completed: false },
    { id: uuidv4(), task: "task 2", completed: true },
  ]);
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState({});

  console.log(newTask, "newtask");

  //   to add new tasks function
  const handleAddNewTask = () => {
    if (newTask !== "") {
      const body = {
        id: uuidv4(),
        task: newTask,
        completed: false,
      };
      setTask([...task, body]);
      setNewTask("");
    }
  };

  //   to delete the task
  const handleDelete = (id) => {
    const filteredArr = task?.filter((item) => item.id !== id);
    setTask(filteredArr);
  };

  //   to complete tasks function
  const handleComplete = (id) => {
    const completeArr = task.map((item) =>
      item.id == id ? { ...item, completed: true } : item
    );
    setTask(completeArr);
  };

  //   to edit tasks function
  const handleEditTask = (task) => {
    setUpdateData(task);
  };

  const changeTask = (e) => {
    const newEntry = {
      id: updateData.id,
      task: e.target.value,
      completed: updateData.completed,
    };
    setUpdateData(newEntry);
  };

  const handleUpdate = () => {
    const filteredTask = task.filter((item) => item.id !== updateData.id);
    const updatedObject = [...filteredTask, updateData];
    setTask(updatedObject);
    setUpdateData({});
  };

  //   to cancel the update

  const handleCancelUpdate = () => {
    setUpdateData({});
    console.log(updateData, "up");
  };

  return (
    <div>
      <h2
        style={{ display: "flex", justifyContent: "center", padding: "16px" }}
      >
        Todo List
      </h2>
      <div
        style={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <input
          style={{ width: "30%", height: "32px" }}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          style={{
            padding: "6px 12px",
            background: "#405189",
            outline: "none",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
          }}
          onClick={handleAddNewTask}
        >
          Add
        </button>
      </div>
      <div
        style={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <input
          style={{ width: "23.5%", height: "32px" }}
          value={Object.keys(updateData).length > 0 ? updateData?.task : ""}
          onChange={(e) => changeTask(e)}
        />
        <button
          style={{
            padding: "6px 12px",
            background: "#405189",
            outline: "none",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
          }}
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          style={{
            padding: "6px 12px",
            background: "#405189",
            outline: "none",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
          }}
          onClick={handleCancelUpdate}
        >
          Cancel
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "18px",
        }}
      >
        {task?.map((task) => {
          return (
            <>
              <div className="todolist-card">
                <p
                  style={{
                    textDecoration: task.completed ? "line-through" : "",
                  }}
                >
                  {task.task}
                </p>

                <div>
                  <button
                    style={{
                      padding: "6px 12px",
                      background: "#0ab39c",
                      outline: "none",
                      border: "none",
                      borderRadius: "6px",
                      color: "#fff",
                      marginRight: "12px",
                    }}
                    onClick={() => handleComplete(task.id)}
                  >
                    Complete
                  </button>

                  <button
                    style={{
                      padding: "6px 12px",
                      background: "#3577f1",
                      outline: "none",
                      border: "none",
                      borderRadius: "6px",
                      color: "#fff",
                      marginRight: "12px",
                    }}
                    onClick={() => handleEditTask(task)}
                  >
                    edit
                  </button>

                  <button
                    style={{
                      padding: "6px 12px",
                      background: "#f06548",
                      outline: "none",
                      border: "none",
                      borderRadius: "6px",
                      color: "#fff",
                    }}
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
