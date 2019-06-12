import React, { Component } from 'react';
import BaseForm from "../common/BaseForm"
import {Button} from "antd";

class Threshold extends Component {
    formList={
        type:'inline',
        item:[
            {
                type: 'RANGPICKER',
                label: '时间',
                field:'doubledata',
                placeholder:'请选择时间',
                showTime:true,
                format:'YYYY-MM-DD HH:mm:ss'
            },{
                type:'button',
                button:[
                    {
                        label:'查询',
                        type:"primary",
                        click:'handleFilterSubmit',
                    },
                    {
                        label:'重置',
                        click:'reset',
                    },
                ]
            }
        ]
    };

  componentDidMount() {
  }


    render() {
    return (
      <div className="Threshold">
          <div className="selectForm">
              <div className="leftForm">
                  <BaseForm formList={this.formList}/>
              </div>
              <div className="rightOpt">
                  <Button type="primary">新增</Button>
              </div>
          </div>
      </div>
    );
  }
}

export default Threshold;
