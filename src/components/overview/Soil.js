import React, { Component } from 'react';



class Soil extends Component {
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
      <div className="Soil">
        
      </div>
    );
  }
}

export default Soil;
