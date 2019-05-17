import React, { Component } from 'react';
import {Row, Col} from "antd";
import "../../style/yal/css/qualityeasy.css";
import test from '../../style/yal/image/easy.png';
import DataOverviewEcharts from "../DataOverviewEcharts";

const list=[
    {
        code:'1',
    },
    {
        code:'1',
    },
    {
        code:'1',
    },
    {
        code:'1',
    },
    {
        code:'1',
    },
];

class Qualityeasy extends Component {
  constructor(props){
    super(props);
    this.state={
      list:list
    };
  }

    render() {
      return (
        <div className="Qualityeasy">
            {
                this.state.list.map((v,i)=>(
                    <div className="qualityeasy-item">
                        <div className="qualityeasy-word">
                            矿山XXX监测点
                        </div>
                        <div className="qualityeasy-img">
                            <div className="innerimage">
                                <img src={test} alt="1"/>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
      );
  }
}

export default Qualityeasy;
