import React, { useContext, useEffect, useState } from "react";
import { Header } from "../../pages/home/header";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../content/usercontext";
import axios from "axios";

export const Home = () => {
  const navigate = useNavigate();
  const { loginStatus, user, login, logout } = useContext(UserContext);

  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/v1/tasks")

      .then((res) => {
        console.log(res);
        setTaskData(res.data.data.tasks);
        console.log(res.data.data.tasks);
      })
      .catch((err) => {
        alert("something went wrong");
        console.log(err);
      });
  }, []);

  //delete task

  const handleDeleteTask = (taskId) => {
    axios
      .delete(`http://localhost:9000/api/v1/tasks/taskId/${taskId}`, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        console.log(res);
        setTaskData((prevTaskData) =>
          prevTaskData.filter((task) => task._id !== taskId)
        );
      })
      .catch((err) => {
        alert("Failed to delete the task");
        console.error(err);
      });
  };

  return (
    <>
      <Header></Header>
      <hr />
      <div className="text-center pt-8">
        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/create-task")}
            className="border px-3 py-1 text-white bg-blue-500 font-medium rounded-lg"
          >
            create task
          </button>
        )}
      </div>

      <div className="pt-8  flex items-center justify-center ">
        <div>
          <h2 className="text-3xl text-center mb-3 font-bold ">Task List</h2>
          <table className="">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Action</th>


              </tr>
            </thead>
            <tbody>
              {taskData.map((task) => (
                <tr key={task._id}>
                  <td className="border px-4 py-2">{task.name}</td>
                  <td className="border px-4 py-2 space-x-2">

                    <button
                      className="border"
                      onClick={() => navigate(`/task/${task._id}`)}
                    >
                      task
                    </button>
                    <button
                      className="border"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete task
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
