function emailIsValid(email) {
  return /\S+@\S+\.\S+/.test(email);
}

/** Validate register fields
 * @param {Object} password - Password of the user (both of them)
 * @param {String} emailAddress - Email of the user
 * @param {String} userName - Username of the user
 */
export function formValidation(password, emailAddress, userName) {
  if (emailAddress.length < 1) {
    return "Email Address is Required";
  }
  if (!emailIsValid(emailAddress)) {
    return "Email is not valid";
  }
  if (userName.length < 1) {
    return "Username is Required";
  }
  const { pass, repPass } = password;

  if (!pass || !repPass) {
    return "Password is required ";
  }
  if (pass !== repPass) {
    return "Passwords are not equal";
  }
}
