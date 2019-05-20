import React, { Component } from 'react';



class Pollutionmanage extends Component {
  constructor(props){
    super(props);
    this.state={
      list:[],
      pagination:{}
    };
    this.params = {
        page:1,
    }
  }
  componentDidMount(){
  }

  render() {
    return (
      <div className="Pollutionmanage">
        
      </div>
    );
  }
}

export default Pollutionmanage;
