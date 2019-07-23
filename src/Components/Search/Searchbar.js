import React, { Component } from 'react';

class Searchbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchStr: '',
    }
  };

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
        		<input type="text" value={this.state.searchStr} placeholder = "Search title ..." />
            <input type = "button" name="Search" value="Search" onClick = {this.handlesearch}/>
        	</form>        
        </div>
      );
    }
  }

export default Searchbar;





