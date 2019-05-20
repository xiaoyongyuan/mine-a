import React, { Component } from 'react';



class Soilmanage extends Component {
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
      <div className="Soilmanage">
        
      </div>
    );
  }
}

export default Soilmanage;
