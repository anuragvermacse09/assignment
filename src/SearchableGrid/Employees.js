import React, { Component } from 'react';
import SearchableGrid from './SearchableGrid/SearchableGrid';
import './App.css';

class Employees extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchStr: '',
    }
  };

  componentDidMount(){
    fetch('http://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((findResponse) => {
      this.setState({
        datas: findResponse,
      })
    });
  }

  handlesearch = (e) => {
    this.setState({
      searchStr: e.target.value
    });
  };

  searchingFor = (searchStr) => {
    return function(x){
      return x.title.toLowerCase().includes(searchStr.toLowerCase()) || !searchStr;
    }
  }

  render(){
    return (
        <div className="mainDiv">
        <form>
          <label htmlFor="Search">Filter Records As per Title: </label>
          <input type="text" value= {this.state.searchStr} placeholder = "Search title ..." onChange = {this.handlesearch} />
        </form>
        <SearchableGrid searchStr={this.state.searchStr} /> 
        </div>
      );
    }
  }

export default Employees;