import API from "../utils/API";
import React, { Component } from "react";
import SearchBox from "./SearchBox";
import TableData from "./TableData";
import "./style.css";

class Container extends Component {
  // Setting the component's initial state
  // Search starts as an empty string
  // Employees and filtered employees are empty arrays because that it's the structure of the data we'll be working with
  // It's to reference the order that the employees are. By default they come randomly and the first click will trigger them to be in an ascending order
  state = {
    search: "",
    employees: [],
    filteredEmployees: [],
    order: "",
  };

  // This is the initialization, what do you want the page to display when page it's first loaded
  componentDidMount() {
    API.getUsers()
      .then((res) =>
        this.setState({
          employees: res.data.results,
          filteredEmployees: res.data.results,
        })
      )
      .catch((err) => console.log(err));
  }

  // If "name" it's clicked employee are shown by ascending/descending order

  sortByName = () => {
    const filtereds = this.state.filteredEmployees;
    if (this.state.order === "asc") {
      const sorteds = filtereds.sort((a, b) =>
        a.name.first > b.name.first ? 1 : -1
      );
      console.log(sorteds);

      this.setState({
        filteredEmployees: sorteds,
        order: "desc",
      });
    } else {
      const sorteds = filtereds.sort((a, b) =>
        a.name.first > b.name.first ? -1 : 1
      );
      console.log(sorteds);

      this.setState({
        filteredEmployees: sorteds,
        order: "asc",
      });
    }
  };
  // When input is changing it will dynamically show the associates names that match in the screen
  handleInputChange = (event) => {
    const employees = this.state.employees;
    const UserInput = event.target.value;
    const filteredEmployees = employees.filter(
      (employee) =>
        employee.name.first.toLowerCase().indexOf(UserInput.toLowerCase()) > -1
    );
    this.setState({
      // Change the state of  filteredEmployees now it holds all the employees that matches users
      // Search and will be passed down in this state

      filteredEmployees,
    });
  };

  // API call triggered when page it's refreshed and  when application it's loaded
  employeeSearch = () => {
    API.getUsers()
      .then((res) =>
        this.setState({
          // Change their both states to hold all the data from the API call(all employess) and will be passed down trough props like that
          // Employee will remain the same and filteredEmployees will be changed and passed down during application's life. Employee will always hold all employess.
          filteredEmployees: res.data.results,
          employees: res.data.results,
        })
      )
      .catch((err) => console.log(err));
  };

  // When button search it's clicked
  handleSearch = (event) => {
    event.preventDefault();
    if (!this.state.search) {
      alert("Enter a name");
    }
    const { employees, search } = this.state;

    // Filters the object looking for the value that matches the value entered in the input box by the user  (search.this.state)
    const filteredEmployees = employees.filter((employee) =>
      employee.name.first.toLowerCase().includes(search.toLowerCase())
    );

    this.setState({
      filteredEmployees,
    });
  };

  render() {
    return (
      <div>
        <SearchBox
          employee={this.state.employees}
          handleSearch={this.handleSearch}
          handleInputChange={this.handleInputChange}
        />
        <TableData
          results={this.state.filteredEmployees}
          sortByName={this.sortByName}
        />
      </div>
    );
  }
}

export default Container;
