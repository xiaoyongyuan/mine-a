import React, { Component } from 'react';
import easy from "../../style/yal/image/easy.png";



class Pollution extends Component {
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
      <div className="Pollution">

      </div>
    );
  }
}

export default Pollution;
