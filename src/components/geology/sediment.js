import React, { Component } from 'react';
import {Row, Col} from "antd";
import DataOverviewEcharts from "../DataOverviewEcharts";
import "../../style/yal/css/sediment.css";


class Sediment extends Component {
  constructor(props){
    super(props);
    this.state={};
  }

    render() {
    return (
      <div className="Sediment">
          <div className="SedimentTop">
              {/*<DataOverviewEcharts*/}
                  {/*type="acceptance"*/}
              {/*/>*/}
          </div>

      </div>
    );
  }
}

export default Sediment;
