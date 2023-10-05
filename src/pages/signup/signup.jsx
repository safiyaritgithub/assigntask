import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import KErrorMessage from "../../components/common/KErrorMessage";
import logo from "../../assets/logo.svg";
import map from "../../assets/map.png";
import axios from "axios";
import "yup-phone";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  name: yup.string().required("name is Required"),
  email: yup.string().required("Email is Required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must Contain 8 Characters,One Uppercase,One LowerCase,One Number and One special case character"
    ),
  mobileNumber: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be  10 digits"),
});

export const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="container h-screen flex justify-between items-center bg-slate-100 rounded-2xl ">
      <div className="flex flex-grow justify-center">
        <div className="shadow-lg p-8 bg-white rounded-xl ">
          <div>
            <img src={logo} style={{ height: 30 }} />
            <h1 className=" text-sm font-semibold opacity-90 text-black mt-10">
              Signin
            </h1>
            <p className="text-xs  text-slate-700 opacity-60 mt-4">
              please sign in to your account{" "}
            </p>
          </div>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              name: "",
              email: "",
              password: "",
              mobileNumber: "",
            }}
            onSubmit={(values) => {
              axios
                .post("http://localhost:9000/api/v1/auth/register", {
                  name: values.name,
                  email: values.email,
                  mobileNumber: values.mobileNumber,
                  password: values.password,
                })
                .then((res) => {
                  navigate("/login");
                  console.log(res);
                })
                .catch((err) => {
                  alert("something went wrong");
                  console.log(err);
                });
              console.log(values);
            }}
          >
            <Form className="  leading-6 mt-10 ">
              <div className="mt-3 relative  ">
                <label className=" absolute -top-2  inline-block  text-xs ml-4 px-1 bg-white ">
                  Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className=" py-1 border-2 w-72  rounded-md focus:outline-none hover:border-blue-400 "
                />
                <KErrorMessage name="name" />
              </div>

              <div className="mt-3 relative  ">
                <label className=" absolute -top-2  inline-block  text-xs ml-4 px-1 bg-white ">
                  E-mail address
                </label>
                <Field
                  name="email"
                  type="email"
                  className=" py-1 border-2 w-72  rounded-md focus:outline-none hover:border-blue-400 "
                />
                <KErrorMessage name="email" />
              </div>

              <div className="mt-3 relative  ">
                <label className=" absolute -top-2  inline-block  text-xs ml-4 px-1 bg-white ">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="border-2 py-1  w-72 rounded-md focus:outline-none hover:border-blue-400"
                />
                <KErrorMessage name="password" />
              </div>

              <div className="mt-3 relative  ">
                <label className=" absolute -top-2  inline-block  text-xs ml-4 px-1 bg-white  ">
                  Phonenumber
                </label>
                <Field
                  name="mobileNumber"
                  type="text"
                  className="border-2 py-1 w-72 rounded-md focus:outline-none hover:border-blue-400"
                />
                <KErrorMessage name="mobileNumber" />
              </div>

              <button
                className="border mt-3 bg-[#1a96fc]  text-white p-1 rounded-lg py-2 text-xs w-72 font-medium"
                type="submit"
              >
                Signin
              </button>
            </Form>
          </Formik>
          <div className="text-[#8fcbfd] text-[10px]  font-medium mt-4 ">
            <p>Forgot Password?</p>
            <p>Need an account?</p>
          </div>
        </div>
      </div>

      <div className=" bg-blue-500 h-screen rounded-tr-xl rounded-br-xl bg-gradient-to-b from-[#199afa] to-[#0bd5e5] flex justify-center items-center flex-col">
        <div className=" text-white flex flex-col justify-center items-center ">
          <div className="text-xl font-semibold mr-40 ">
            <p className=" ">Get started with</p>
            <p>playrcart</p>
          </div>
          <div className="mt-10">
            <img src={map} style={{ width: 450 }} className="pl-16" />
          </div>
          <div className="mr-24">
            <p className="font-semibold text-lg">Benefits</p>
            <ul className="text-xs leading-6">
              <li className="flex gap-2 items-center">
                <i class="fa-solid fa-circle-check"></i>
                <p className="">This is the first benefit of playrcart</p>
              </li>
              <li className="flex gap-2 items-center">
                <i class="fa-solid fa-circle-check"></i>
                <p>This is the second benefit of playrcart</p>
              </li>
              <li className="flex gap-2 items-center">
                <i class="fa-solid fa-circle-check"></i>
                <p>This is the third benefit of playrcart</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
