import React, { Component } from 'react';
import BaseForm from "../common/BaseForm";
import {Button} from "antd";

class Warning extends Component {
    formList={
        type:'inline',
        item:[
            {
                type: 'RANGPICKER',
                label: 'ʱ��',
                field:'doubledata',
                placeholder:'��ѡ��ʱ��',
                showTime:true,
                format:'YYYY-MM-DD HH:mm:ss'
            },{
                type:'button',
                button:[
                    {
                        label:'��ѯ',
                        type:"primary",
                        click:'handleFilterSubmit',
                    },
                    {
                        label:'����',
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
      <div className="Warning">
          <div className="selectForm">
              <div className="leftForm">
                  <BaseForm formList={this.formList}/>
              </div>
              <div className="rightOpt">
                  <Button type="primary">����</Button>
              </div>
          </div>
      </div>
    );
  }
}

export default Warning;
