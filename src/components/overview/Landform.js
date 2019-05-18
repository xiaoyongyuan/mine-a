import React, { Component } from 'react';



class Landform extends Component {
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
      <div className="Landform">
        
      </div>
    );
  }
}

export default Landform;
