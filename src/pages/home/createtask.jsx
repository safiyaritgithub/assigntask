import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import KErrorMessage from "../../components/common/KErrorMessage";
import axios from "axios";
import "yup-phone";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../content/usercontext";

const validationSchema = yup.object({
  name: yup.string().required("name is Required"),
  description: yup
    .string()
    .min(5, "too short")
    .max(500, "too long")
    .required("name is Required"),

  startDate: yup.date().required("Start date is required"),
  endDate: yup
    .date()
    .required("End date is required")
    .min(yup.ref("startDate"), "End date must be after start date"),
});




export const Createtask = () => {
  const navigate = useNavigate();
  const { loginStatus, user, login, logout } = useContext(UserContext);

  

  return (
    <div className="container h-screen flex justify-between items-center bg-slate-100 rounded-2xl ">
      <div className="flex flex-grow justify-center">
        <div className="shadow-lg p-8 bg-white rounded-xl ">
          <div>
            <h1 className=" text-3xl font-semibold opacity-90 text-black mt-10">
              Create task
            </h1>
            <p className="text-xs  text-slate-700 opacity-60 mt-4">
              please Create yout Task
            </p>
          </div>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              name: "",
              description: "",
              startDate: "",
              endDate: "",
            }}
            onSubmit={(values) => {
              axios
                .post(
                  "http://localhost:9000/api/v1/tasks",
                  {
                    name: values.name,
                    description: values.description,
                    startDate: values.startDate,
                    endDate: values.endDate,
                  },
                  {
                    headers: {
                      "x-auth-token": user.token,
                    },
                  }
                )
                .then((res) => {
                  console.log(res);
                  navigate("/");
                })
                .catch((err) => {
                  alert("something went wrong");
                  console.log(err);
                });
              console.log(values);
            }}
          >
            <Form className="  leading-6 mt-10" >
              <div className="mt-3 relative  ">
                <label className=" absolute -top-2  inline-block  text-xs ml-4 px-1 bg-white ">
                  Task
                </label>
                <Field
                  name="name"
                  type="text"
                  className=" py-1 border-2 w-72  rounded-md focus:outline-none hover:border-blue-400 "
                />
                <KErrorMessage name="name" />
              </div>

              <div className="mt-3 relative">
                <label className=" absolute -top-2  inline-block  text-xs ml-4 px-1 bg-white ">
                  Description
                </label>
                <Field
                  name="description"
                  as="textarea"
                  className=" py-1 border-2 w-72  rounded-md focus:outline-none hover:border-blue-400 "
                />
                <KErrorMessage name="description" />
              </div>

              <div className="mt-3 relative  ">
                <label className=" absolute -top-2  inline-block  text-xs ml-4 px-1 bg-white ">
                  Startdate
                </label>
                <Field
                  name="startDate"
                  type="date"
                  className=" py-1 border-2 w-72  rounded-md focus:outline-none hover:border-blue-400 "
                />
                <KErrorMessage name="startDate" />
              </div>

              <div className="mt-3 relative  ">
                <label className=" absolute -top-2  inline-block  text-xs ml-4 px-1 bg-white ">
                  EndDate
                </label>
                <Field
                  name="endDate"
                  type="date"
                  className=" py-1 border-2 w-72  rounded-md focus:outline-none hover:border-blue-400 "
                />
                <KErrorMessage name="endDate" />
              </div>

              
              <button
                className="border mt-3 bg-[#1a96fc]  text-white p-1 rounded-lg py-2 text-md w-72 font-medium"
                type="submit"
              >
                Create
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
