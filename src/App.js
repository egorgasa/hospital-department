import React, { Component } from "react";
import { getEmployees, getWorklog } from "./api";
import Header from './components/header' 
import Table from './components/table'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HeaderWorkLog from './components/headerWorkLog'
import TableWorkLog from "./components/tableWorkLog";

class App extends Component {
  state = {
    loading: true,
    employees: [],
    worklog: [],
    textToFilter: '',
    id: undefined
  };

  onUpdateID = (id) => {
    this.setState({id})
  };

  onUpdateSearch = (textToFilter) => {
    this.setState({textToFilter})
  };

searchViolation = (arr) => {
  arr.map((value, index, array) => {
    let num = 0;
    value.violation = array.some((element) => {
      if (element.from < value.from && element.to > value.from) {
        num++;
        if (num >= 3) {
          return true;
        }
      }
      return false;
    });
    return value;
  })
}

searchPost = (employees, textToFilter) => {
  if (textToFilter.length === 0) {
      return employees
  }
  return employees.filter((employee) => {
      return employee.firstName.indexOf(textToFilter) > -1
  });
};

sortByName = (arr) =>{
arr.sort((a,b)=> a.firstName > b.firstName ? 1 : -1)
}


  render(){
    const{employees,textToFilter,worklog,id}= this.state;
    this.sortByName(employees)
    this.searchViolation(worklog)
    const visibleEmloyees = this.searchPost(employees, textToFilter);
    const visibleWorkLog = worklog.filter(work => {
      if(work.employee_id === id){
        return work
      }
    return 0
  })

    return (
      <Router>
      <div>
        <Switch>
        <Route path='/'exact>
          <Header
          onUpdateSearch={this.onUpdateSearch}
          />
          <Table
          employees={visibleEmloyees}
          update={this.onUpdateID}
          />
        </Route>

        <Route path={"/worklog"}>
            <HeaderWorkLog
            />
            <TableWorkLog
            worklog={visibleWorkLog}
            /> 
        </Route>

        </Switch>
        
        
      </div>
      </Router>
    )
  }


  componentDidMount(){
    getEmployees()
    .then(res=>
      this.setState({
        employees:res
      }));
      getWorklog()
      .then(res=>{
        this.setState({
          worklog:res
        })
      })
  }
}

export default App;