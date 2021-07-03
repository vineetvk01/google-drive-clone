
export const isEmail = (value) => {
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(value); 
}

export const isValidPassword = (value) => {
  //var passwordPattern = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
  //return passwordPattern.test(value);
  return value.length > 4;
}

export const isValidPhoneNumber = (phone) => {
  let _phone = phone.replace('+','')
  _phone = _phone.replace('-','')
  return Number.isInteger(Number(_phone));
}

export const validateNewUser = ({
  firstName, 
  lastName, 
  email, 
  password, 
  confirmPassword, 
  phone
}) => {
  if(password === confirmPassword){
    const validPassword = isValidPassword(password);
    const validEmail = isEmail(email);
    const haveCorrectNameLength = (firstName.length > 1 && lastName.length > 2 )
    const isPhoneNumber = isValidPhoneNumber(phone);
    const allValid = validEmail && validPassword && haveCorrectNameLength && isPhoneNumber;
    return allValid ? true : {error: 'Please check your Email/Password/Name value'}
  }
  return {error: 'Confirm password is not same as password'};
}