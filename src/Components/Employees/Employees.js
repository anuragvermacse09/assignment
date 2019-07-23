import React, { Component } from 'react';
//import Searchbar from '../Search/Searchbar';
import SearchableGrid from '../Search/SearchableGrid';


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

  render(){
    return (
        <div className="mainDiv">
        
        <form>
            <label htmlFor="Search">Filter Records As per Name: </label>
            <input type="text" value={this.state.searchStr} placeholder = "Search Employees ..." onChange = {this.handlesearch} />
          </form>

        <SearchableGrid searchStr={this.state.searchStr}/>

        </div>
      );
    }
  }

export default Employees;