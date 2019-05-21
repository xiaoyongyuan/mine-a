import React, { Component } from 'react';



class Preview extends Component {
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
    componentWillMount() {
        window.onresize=()=>{
            this.setState({
                Height:(parseInt(document.body.clientHeight)-50)+"px"
            })
        }
        console.log("height",(parseInt(document.body.clientHeight)-50));
    }
    componentDidMount() {
        this.setState({
            Height:(parseInt(document.body.clientHeight)-50)+"px"
        })
    }
  render() {
    return (
      <div className="Preview">
          <iframe style={{height:this.state.Height}} src='https://view.officeapps.live.com/op/view.aspx?src=api.aokecloud.cn/upload/椒图数据字典20190417.docx' width='100%' height='100%' frameBorder='1'></iframe>
      </div>
    );
  }
}

export default Preview;
