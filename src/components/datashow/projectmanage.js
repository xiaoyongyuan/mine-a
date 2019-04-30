import React, { Component } from 'react';
import OverallEcharts from "./OverallEcharts";
import Map from "./Map";
import "./index.less";

class Projectmanage extends Component {
  constructor(props){
      super(props);
      this.state={
          width:"",
          height:"",
          projectHeight:""
      };
  }
  componentWillMount() {
    window.onresize=()=>{
      this.setState({
          width:document.body.clientWidth,
          height:document.body.clientHeight -64+"px",
          projectHeight:(parseInt(document.body.clientHeight -64)/3)-20+"px"
      })
    }
  }
  componentDidMount() {
        this.setState({
            width:document.body.clientWidth,
            height:document.body.clientHeight -64+"px",
            projectHeight:(parseInt(document.body.clientHeight -64)/3)-20+"px"
        })
  }
    render() {
    return (
      <div className="projectmanage" style={{width:this.state.width,height:this.state.height}}>
        <div className="projectContext">
            <div className="projectTop">
                <div className="projectTopLeft" style={{height:this.state.projectHeight}}>
                    <div className="projectTitle"><span className="proCircle" /><span className="proName">项目总体计划</span></div>
                    <OverallEcharts
                        type="masterPlan"
                        proHeight={parseInt(this.state.projectHeight)-35}
                    />
                </div>
                <div className="projectTopLeftCenter" style={{height:this.state.projectHeight}}>
                    <div className="projectTitle"><span className="proCircle" /><span className="proName">项目方案</span></div>
                    <OverallEcharts
                        type="programme"
                        proHeight={parseInt(this.state.projectHeight)-35}
                    />
                </div>
                <div className="projectTopLeft" style={{height:this.state.projectHeight}}>
                    <div className="projectTitle"><span className="proCircle" /><span className="proName">项目勘察</span></div>
                    <OverallEcharts
                        type="investigation"
                        proHeight={parseInt(this.state.projectHeight)-35}
                    />
                </div>
            </div>
            <div className="projectCenter">
                <div className="projectCenterTop" style={{height:(parseInt(this.state.height)/3)*2-20}}>
                    <Map mapHeight={(parseInt(this.state.height)/3)*2-20}/>
                </div>
                <div className="projectCenterBottom">
                    <div className="construction" style={{height:this.state.projectHeight}}>
                        <div className="projectTitle"><span className="proCircle" /><span className="proName">项目设计</span></div>
                        <OverallEcharts
                            type="design"
                            proHeight={parseInt(this.state.projectHeight)-35}
                        />
                    </div>
                    <div className="construction design" style={{height:this.state.projectHeight}}>
                        <div className="projectTitle"><span className="proCircle" /><span className="proName">项目施工</span></div>
                        <OverallEcharts
                            type="construction"
                            proHeight={parseInt(this.state.projectHeight)-35}
                        />
                    </div>
                    <div className="construction" style={{height:this.state.projectHeight}}>
                        <div className="projectTitle"><span className="proCircle" /><span className="proName">项目监理</span></div>
                        <OverallEcharts
                            type="supervisor"
                            proHeight={parseInt(this.state.projectHeight)-35}
                        />
                    </div>
                </div>
            </div>
            <div className="projectTop">
                <div className="projectTopLeft" style={{height:this.state.projectHeight}}>
                    <div className="projectTitle"><span className="proCircle" /><span className="proName">基金管理</span></div>
                    <OverallEcharts
                        type="fund"
                        proHeight={parseInt(this.state.projectHeight)-35}
                    />
                </div>
                <div className="projectTopLeftCenter" style={{height:this.state.projectHeight}}>
                    <div className="projectTitle"><span className="proCircle" /><span className="proName">土地损毁于复垦</span></div>
                    <OverallEcharts
                        type="land"
                        proHeight={parseInt(this.state.projectHeight)-35}
                    />
                </div>
                <div className="projectTopLeft" style={{height:this.state.projectHeight}}>
                    <div className="projectTitle"><span className="proCircle" /><span className="proName">项目验收</span></div>
                    <OverallEcharts
                        type="acceptance"
                        proHeight={parseInt(this.state.projectHeight)-35}
                    />
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Projectmanage;
