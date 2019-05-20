import React, { Component } from 'react';



class Landformmanage extends Component {
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
      <div className="Landformmanage">
        
      </div>
    );
  }
}

export default Landformmanage;
