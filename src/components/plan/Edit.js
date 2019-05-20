import React, { Component } from 'react';


class MyPlan extends Component {
  constructor(props){
    super(props);
    this.state={
      page:1,
      equipment:'1'
    };
    this.params = {
        page:1,   
    }

    

  }
  componentDidMount(){

  }




  render() {
      
    return (
      <div className="MyPlan">
      </div>
    );
  }
}

export default MyPlan;
