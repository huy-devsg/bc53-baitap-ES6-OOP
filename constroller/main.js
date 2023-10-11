const getEle = (ele) => document.querySelector(ele);

const personList = new ListPerson();
const personListSort = new ListPerson();

//<-------CHANGE SELECT TYPE------->

const selectType = () => {
  const userType = getEle("#userType").value;

  if (userType === "Student") {
    getEle("#inputStudent").style.display = "block";
    getEle("#inputEmploy").style.display = "none";
    getEle("#inputCustomer").style.display = "none";
    getEle("#spType").style.display = "none";
  } else if (userType === "Employee") {
    getEle("#inputStudent").style.display = "none";
    getEle("#inputEmploy").style.display = "block";
    getEle("#inputCustomer").style.display = "none";
    getEle("#spType").style.display = "none";
  } else if (userType === "Customer") {
    getEle("#inputStudent").style.display = "none";
    getEle("#inputEmploy").style.display = "none";
    getEle("#inputCustomer").style.display = "block";
    getEle("#spType").style.display = "none";
  } else {
    getEle("#inputStudent").style.display = "none";
    getEle("#inputEmploy").style.display = "none";
    getEle("#inputCustomer").style.display = "none";
  }
};

//<-------CHANGE SORT TYPE------->

const sortUserType = () => {
  sortValue = getEle("#sortUserType").value;
  console.log("sortValue: ", sortValue);

  if (sortValue !== "0") {
    personListSort.people = personList.people.filter(
      (val) => val.userType === sortValue
    );
    displayUsers(personListSort);
  } else {
    displayUsers(personList);
  }
};

//<-------CHANGE SORT NAME------->

function sortName() {
  const sortValue = getEle("#sortName").value;

  if (sortValue === "asc") {
    personListSort.people = personList.people.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      return nameA.localeCompare(nameB);
    });
  } else if (sortValue === "desc") {
    personListSort.people = personList.people.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      return nameB.localeCompare(nameA);
    });
  } else {
    personListSort.people = personList.people.sort((a, b) => {
      const codeA = a.code.toUpperCase();
      const codeB = b.code.toUpperCase();
      return codeA.localeCompare(codeB);
    });
  }

  displayUsers(personListSort);
}

//<----- handle persion ----->

const handlePerson = (user) => {
  switch (user.userType) {
    case "Employee": {
      const newUser = new Employee(
        user.name,
        user.address,
        user.code,
        user.email,
        user.userType,
        user.dayWork,
        user.salaryDay
      );
      return newUser;
    }
    case "Customer": {
      const newUser = new Customer(
        user.name,
        user.address,
        user.code,
        user.email,
        user.userType,
        user.companyName,
        user.invoiceValue,
        user.vote
      );
      return newUser;
    }
    case "Student": {
      const newUser = new Student(
        user.name,
        user.address,
        user.code,
        user.email,
        user.userType,
        user.mathScore,
        user.physicsScore,
        user.chemistryScore
      );
      return newUser;
    }
    default:
      return;
  }
};

//<-------GET FORM------->

const getInfor = () => {
  const name = getEle("#name").value;
  const address = getEle("#address").value;
  const code = getEle("#code").value;
  const email = getEle("#email").value;
  const userType = getEle("#userType").value;
  const mathScore = getEle("#mathScore").value;
  const physicsScore = getEle("#physicsScore").value;
  const chemistryScore = getEle("#chemistryScore").value;
  const dayWork = getEle("#dayWork").value;
  const salaryDay = getEle("#salaryDay").value;
  const companyName = getEle("#companyName").value;
  const invoiceValue = getEle("#invoiceValue").value;
  const vote = getEle("#vote").value;
  return new DataForm(
    name,
    address,
    code,
    email,
    userType,
    mathScore,
    physicsScore,
    chemistryScore,
    dayWork,
    salaryDay,
    companyName,
    invoiceValue,
    vote
  );
};

//<-------ADD USER------->

const addUser = () => {
  getEle("#btnEdit").style.display = "none";
  getEle("#btnAdd").style.display = "block";
  getEle("#code").style.display = "block";

  const user = getInfor();
  let flag = false;

  let check1 =
    checkEmpty(user.name, "#spName", "Tên không được để trống") &
    checkEmpty(user.address, "#spAddress", "Địa chỉ không được để trống") &
    checkEmpty(user.code, "#spCode", "Mã không được để trống") &
    checkEmpty(user.email, "#spEmail", "Email không được để trống") &
    checkEmpty(
      user.userType,
      "#spType",
      "Loại người dùng không được để trống"
    ) &
    checkDuplicate(
      personList.people,
      user.code,
      "#spDuplicate",
      "Mã đã được sử dụng, vui lòng chọn mã khác"
    );
  if (user.userType === "Student") {
    let checkStudent =
      check1 &
      checkEmpty(user.mathScore, "#spMath", "Điểm toán không được để trống") &
      checkEmpty(
        user.physicsScore,
        "#spPhysics",
        "Điểm lý không được để trống"
      ) &
      checkEmpty(
        user.chemistryScore,
        "#spChemistry",
        "Điểm hóa không được để trống"
      );

    if (checkStudent) {
      handlePerson(user);
      flag = true;
    }
  } else if (user.userType === "Employee") {
    let checkEmployee =
      check1 &
      checkEmpty(
        user.dayWork,
        "#spDayWork",
        "Số ngày làm không được để trống"
      ) &
      checkEmpty(
        user.salaryDay,
        "#spSalaryDay",
        "Lương ngày làm không được để trống"
      );
    if (checkEmployee) {
      handlePerson(user);
      flag = true;
    }
  } else if (user.userType === "Customer") {
    let checkCustomer =
      check1 &
      checkEmpty(
        user.companyName,
        "#spCompanyName",
        "Tên công ty không được để trống"
      ) &
      checkEmpty(
        user.invoiceValue,
        "#spInvoiceValue",
        "Trị giá hóa đơn không được để trống"
      ) &
      checkEmpty(user.vote, "#spVote", "Đánh giá không được để trống");
    if (checkCustomer) {
      handlePerson(user);
      flag = true;
    }
  }
  if (flag) {
    personList.addPerson(handlePerson(user));
    getEle(".sp-noti").style.display = "none";
    displayUsers(personList);
    alert("Thêm người dùng thành công !");
    location.reload();
  } else {
    alert("Thêm người dùng thất bại. Vui lòng kiểm tra lại.");
  }
};

//<-------EDIT USER------->

const editUser = (code) => {
  // getEle("#code").disabled = true;
  getEle("#code").style.display = "none";

  const user = personList.people.find((u) => u.code === code);
  if (user) {
    isUpdating = true;
    updateUserCode = code;

    getEle("#name").value = user.name;
    getEle("#address").value = user.address;
    getEle("#code").value = user.code;
    getEle("#email").value = user.email;
    getEle("#userType").value = user.userType;
    selectType();
    if (user.userType === "Student") {
      getEle("#mathScore").value = user.mathScore;
      getEle("#physicsScore").value = user.physicsScore;
      getEle("#chemistryScore").value = user.chemistryScore;
    } else if (user.userType === "Employee") {
      getEle("#dayWork").value = user.dayWork;
      getEle("#salaryDay").value = user.salaryDay;
    } else if (user.userType === "Customer") {
      getEle("#companyName").value = user.companyName;
      getEle("#invoiceValue").value = user.invoiceValue;
      getEle("#vote").value = user.vote;
    }
  }
  getEle("#btnEdit").style.display = "block";
  getEle("#btnAdd").style.display = "block";
  getEle("#btnAdd").onclick = () => {
    location.reload();
    getEle("#btnEdit").style.display = "none";
    getEle("#btnAdd").onclick = () => {
      getEle("#code").style.display = "block";
      addUser;
    };
  };
  getEle("#btnEdit").onclick = () => {
    getEle("#btnEdit").onclick = updateUser(code);
  };
};

//<-------UPDATE USER------->

const updateUser = (code) => {
  const user = getInfor();
  let flag = false;
  getEle("#code").disabled = true;
  let check1 =
    checkEmpty(user.name, "#spName", "Tên không được để trống") &
    checkEmpty(user.address, "#spAddress", "Địa chỉ không được để trống") &
    checkEmpty(user.code, "#spCode", "Mã không được để trống") &
    checkEmpty(user.email, "#spEmail", "Email không được để trống") &
    checkEmpty(user.userType, "#spType", "Loại người dùng không được để trống");
  if (user.userType === "Student") {
    let checkStudent =
      check1 &
      checkEmpty(user.mathScore, "#spMath", "Điểm toán không được để trống") &
      checkEmpty(
        user.physicsScore,
        "#spPhysics",
        "Điểm lý không được để trống"
      ) &
      checkEmpty(
        user.chemistryScore,
        "#spChemistry",
        "Điểm hóa không được để trống"
      );

    if (checkStudent) {
      handlePerson(user);
      flag = true;
    }
  } else if (user.userType === "Employee") {
    let checkEmployee =
      check1 &
      checkEmpty(
        user.dayWork,
        "#spDayWork",
        "Số ngày làm không được để trống"
      ) &
      checkEmpty(
        user.salaryDay,
        "#spSalaryDay",
        "Lương ngày làm không được để trống"
      );
    if (checkEmployee) {
      handlePerson(user);
      flag = true;
    }
  } else if (user.userType === "Customer") {
    let checkCustomer =
      check1 &
      checkEmpty(
        user.companyName,
        "#spCompanyName",
        "Tên công ty không được để trống"
      ) &
      checkEmpty(
        user.invoiceValue,
        "#spInvoiceValue",
        "Trị giá hóa đơn không được để trống"
      ) &
      checkEmpty(user.vote, "#spVote", "Đánh giá không được để trống");
    if (checkCustomer) {
      handlePerson(user);
      flag = true;
    }
  }
  if (flag) {
    personList.editPerson(code, handlePerson(user));
    getEle(".sp-noti").style.display = "none";
    location.reload();
    resetForm();
  } else {
    alert("Sửa người dùng thất bại. Vui lòng kiểm tra lại.");
  }
};

//<-------DELETE USER------->

const deleteUser = (code) => {
  personList.removePerson(code);
  displayUsers(personList);
};

//<-------CACULATE AVERAGE------->

const calculateAverageScore = (code) => {
  const student = personList.people.find((user) => user.code === code);
  if (student) {
    const averageScore = student.calculateAverageScore();
    alert(`Điểm trung bình của ${student.name} là: ${averageScore}`);
  }
};

//<-------CACULATE SALARY------->

const calculateSalary = (code) => {
  const employee = personList.people.find((user) => user.code === code);
  if (employee) {
    const salaryEmp = employee.calculateSalary();
    alert(`Lương của ${employee.name} là: ${salaryEmp}`);
  }
};

//<-------SHOW USER------->

const displayUsers = (personList) => {
  let htmlContent = "";
  if (personList.people.length > 0) {
    personList.people.forEach((user) => {
      let type;
      if (user.userType === "Student") {
        type = "Học viên";
      } else if (user.userType === "Employee") {
        type = "Giảng viên";
      } else if (user.userType === "Customer") {
        type = "Khách hàng";
      }

      htmlContent += `
        <tr>
          <td>${user.name}</td>
          <td>${user.address}</td>
          <td>${user.code}</td>
          <td>${user.email}</td>
          <td>${type}</td>
          <td>
            ${
              user.userType === "Student"
                ? `<button class="btn btn-success" onclick="calculateAverageScore('${user.code}')">Tính điểm</button>`
                : ""
            }
            ${
              user.userType === "Employee"
                ? `<button class="btn btn-success" onclick="calculateSalary('${user.code}')">Tính lương</button>`
                : ""
            }
          </td>
          <td>
            <button class="btn btn-warning" onclick="editUser('${
              user.code
            }')">Cập nhật thông tin</button>
          </td>
          <td>            
            <button class="btn btn-danger" onclick="deleteUser('${
              user.code
            }')">Xóa</button>
          </td>
        </tr>`;
    });
  } else {
    htmlContent = "<tr><td colspan='6'>Không có người dùng.</td></tr>";
  }
  getEle("#userTable").innerHTML = htmlContent;
};

//<-------RESET FORM------->

const resetForm = () => {
  getEle("#name").value = "";
  getEle("#address").value = "";
  getEle("#code").value = "";
  getEle("#email").value = "";
  getEle("#userType").value = "";
  getEle("#mathScore").value = "";
  getEle("#physicsScore").value = "";
  getEle("#chemistryScore").value = "";
  getEle("#dayWork").value = "";
  getEle("#salaryDay").value = "";
  getEle("#companyName").value = "";
  getEle("#invoiceValue").value = "";
  getEle("#vote").value = "";
};

// <-----display when reload page ---->

window.onload = () => {
  const userLocal = JSON.parse(localStorage.getItem("listPerson"));
  for (let user of userLocal) {
    const userNew = handlePerson(user);
    personList.addPerson(userNew);
  }

  displayUsers(personList);
};
