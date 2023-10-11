const checkEmpty = (value, idErr, message) => {
  if (value.trim() === "") {
    document.querySelector(idErr).innerHTML = message;
    return false;
  } else {
    document.querySelector(idErr).innerHTML = "";
    return true;
  }
};
const checkDuplicate = (personCode, Inputcode, idErr, message) => {
  const duplicate = personCode.find((user) => user.code === Inputcode);
  if (duplicate) {
    document.querySelector(idErr).innerHTML = message;
    return false;
  } else {
    document.querySelector(idErr).innerHTML = "";
    return true;
  }
};
