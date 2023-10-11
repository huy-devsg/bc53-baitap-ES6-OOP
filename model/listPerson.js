class ListPerson {
  constructor() {
    this.people = [];
  }

  addPerson(person) {
    this.people.push(person);
    localStorage.setItem("listPerson", JSON.stringify(this.people));
  }
  editPerson(personId, updatedPerson) {
    const personIndex = this.people.findIndex(
      (person) => person.code === personId
    );

    if (personIndex !== -1) {
      this.people[personIndex] = updatedPerson;
      localStorage.setItem("listPerson", JSON.stringify(this.people));
      alert("Chỉnh sửa người dùng thành công !");
    }
  }
  removePerson(person) {
    if (confirm(`Xác nhận xóa người dùng ID ${person} ?`) === true) {
      this.people = this.people.filter(
        (personList) => personList.code !== person
      );
      localStorage.setItem("listPerson", JSON.stringify(this.people));
    }
  }

  getAllPeople() {
    return this.people;
  }
}
