import React, { Component } from 'react';
import MineEcharts from "./MineEcharts";
import "./index.less";

class Datamanage extends Component {
  constructor(props){
    super(props);
    this.state={};
  }
  componentWillMount() {
      window.onresize=()=>{
          this.setState({
              width:document.body.clientWidth,
              height:document.body.clientHeight -64+"px",
              dataManageHeight:(parseInt(document.body.clientHeight -64)/3)-20+"px"
          })
      }
  }
  componentDidMount() {
      this.setState({
          width:document.body.clientWidth,
          height:document.body.clientHeight -64+"px",
          dataManageHeight:(parseInt(document.body.clientHeight -64)/3)+"px"
      })
  }

    render() {
    return (
      <div className="dataManage" style={{width:this.state.width,height:this.state.height}}>
        <div className="dataManageCont" >
            <div className="dataManageEdge">
                <div className="dataManageMine" style={{height:this.state.dataManageHeight}}>
                    <div className="projectTitle"><span className="proCircle" /><span className="proName">矿山整体大数据</span></div>
                    <MineEcharts
                        type="mine"
                        dataHeight={parseInt(this.state.dataManageHeight)-51}
                    />
                </div>
                <div className="dataManageMine dataManageMineCenter" style={{height:this.state.dataManageHeight}}>
                    <div className="projectTitle"><span className="proCircle" /><span className="proName">地质灾害数据</span></div>
                    <MineEcharts
                        type="earth"
                        dataHeight={parseInt(this.state.dataManageHeight)-61}
                    />
                </div>
                <div className="dataManageMine" style={{height:this.state.dataManageHeight}}>
                    <div className="projectTitle"><span className="proCircle" /><span className="proName">地形地貌数据总览</span></div>
                    <MineEcharts
                        type="terrain"
                        dataHeight={parseInt(this.state.dataManageHeight)-51}
                    />
                </div>
            </div>
            <div className="dataManageCenter">

            </div>
            <div className="dataManageEdge">
                <div className="dataManageMine" style={{height:this.state.dataManageHeight}}>
                    <div className="projectTitle"><span className="proCircle" /><span className="proName">含水层数据</span></div>
                    <MineEcharts
                        type="waterLayer"
                        dataHeight={parseInt(this.state.dataManageHeight)-180}
                    />
                    <MineEcharts
                        type="waterLayer1"
                        dataHeight={parseInt(this.state.dataManageHeight)-180}
                    />

                </div>
                <div className="dataManageMine dataManageMineCenter" style={{height:this.state.dataManageHeight}}>
                    <div className="projectTitle"><span className="proCircle" /><span className="proName">水土污染总览</span></div>
                    <MineEcharts
                        type="soilWater"
                        dataHeight={parseInt(this.state.dataManageHeight)-61}
                    />
                </div>
                <div className="dataManageMine" style={{height:this.state.dataManageHeight}}>
                    <div className="projectTitle"><span className="proCircle" /><span className="proName">土地损毁与复垦总览</span></div>
                    <MineEcharts
                        type="destruction"
                        dataHeight={parseInt(this.state.dataManageHeight)-51}
                    />
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Datamanage;
