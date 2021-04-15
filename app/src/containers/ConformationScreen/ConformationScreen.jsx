import React from "react";
import { useDispatch,useSelector } from "react-redux";
/**Actions */
import { registerError } from "../Register/actions";

import "./ConformationScreen.scss";
export default function ConformationScreen({ email }) {
  const dispatch = useDispatch();
    /** Access store  */
    const { registerErrorMessage, mail } = useSelector((state) => state.register);
    return (
    <div className="conformation-wrapper">
      {registerErrorMessage ?  <div> Acount already exist</div>: <>
        <h5>Check Your Email</h5>
        <p>
          Check your email: {email} to get a confirmation code for your new account{" "}
        </p>
      </>}
      
      <button onClick={() => dispatch(registerError(""))}>go back</button>
    </div>
  );
}
