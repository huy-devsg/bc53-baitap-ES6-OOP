class Person {
  constructor(name, address, code, email, userType) {
    this.name = name;
    this.address = address;
    this.code = code;
    this.email = email;
    this.userType = userType;
  }
}

class Student extends Person {
  constructor(
    name,
    address,
    code,
    email,
    userType,
    mathScore,
    physicsScore,
    chemistryScore
  ) {
    super(name, address, code, email, userType);
    this.mathScore = parseInt(mathScore);
    this.physicsScore = parseInt(physicsScore);
    this.chemistryScore = parseInt(chemistryScore);
  }
  calculateAverageScore = () =>
    ((this.mathScore + this.physicsScore + this.chemistryScore) / 3).toFixed(2);
}

class Employee extends Person {
  constructor(name, address, code, email, userType, dayWork, salaryDay) {
    super(name, address, code, email, userType);
    this.dayWork = parseInt(dayWork);
    this.salaryDay = parseInt(salaryDay);
  }
  calculateSalary = () => this.dayWork * this.salaryDay;
}

class Customer extends Person {
  constructor(
    name,
    address,
    code,
    email,
    userType,
    companyName,
    invoiceValue,
    vote
  ) {
    super(name, address, code, email, userType);
    this.companyName = companyName;
    this.invoiceValue = invoiceValue;
    this.vote = vote;
  }
}
