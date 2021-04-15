import React from "react";
import { useDispatch } from "react-redux";
/**Actions */
import { registerError } from "../Register/actions";

import "./ConformationScreen.scss";
export default function ConformationScreen({ email }) {
  const dispatch = useDispatch();
  return (
    <div className="conformation-wrapper">
      <h5>Check Your Email</h5>
      <p>
        Check your email {email} to get a confirmation code for your new account{" "}
      </p>
      <button onClick={() => dispatch(registerError(""))}>go back</button>
    </div>
  );
}
