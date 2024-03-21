import validator from "validator";
import passwordValidator from "password-validator";

export const checkEmail = (email) => {
  return validator.isEmail(email);
};

export const checkPassword = (password) => {
  const schema = new passwordValidator();
  schema.is().min(6).is().max(20).has().digits(2).has();

  return schema.validate(password);
};

export const checkFormData = (data) => {
  if (checkEmail(data.email)) {
    if (checkPassword(data.password)) {
      return { message: "Success" };
    } else return { error: "Unvalid password" };
  } else return { error: "Unvalid email" };
};
