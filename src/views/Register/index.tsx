
import React, { FC } from "react";
import { useAppSelector, useAppDispatch } from "../../store";
import { updateUserName, updatePassword, register,  } from "../../features";
import { updateEmail } from "../../features/userSlice";
import { logRoles } from "@testing-library/react";

export const Register: FC = () => {
  const logs = useAppSelector((state) => state.userData);
  const username = useAppSelector((state) => state.userData.username);
  const email = useAppSelector((state) => state.userData.email);
  const password = useAppSelector((state) => state.userData.password);
  const roles = useAppSelector((state) => state.userData.roles);
  console.log(username);

  const dispatch = useAppDispatch();

  const role =["user"];
  const handleUsernameChange = (value: string) =>{
    dispatch(updateUserName(value))
  }

    dispatch((roles) =>roles);
    const handleEmailnameChange =(value: string) =>{
     dispatch(updateEmail(value));
    }



  const handlePasswordChange = (value: string) =>
    dispatch(updatePassword(value));

  const handleRegister = () => dispatch(register());

  return (

    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
    <div>
      <label
        htmlFor="username"
        className="block text-sm font-medium text-gray-700"
      >
        Username
      </label>
      <div className="mt-1">
        <input
          value={username}
          id="username"
          name="username"
          type="username"
          required
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => handleUsernameChange(e.target.value)}
        />
      </div>
    </div>
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        User Email
      </label>
      <div className="mt-1">
    <input
          value={username }
          id=""
          name="email"
          type="email"
          autoComplete="username"
          required
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => handleEmailnameChange(e.target.value)}
        />
      </div>
    </div>
    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <div className="mt-1">
        <input
          value={password}
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
      </div>
    </div>
    <div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => handleRegister()}
        id="login-button"
      >
        Sign in
      </button>
    </div>
  </form>
    
  );
};
