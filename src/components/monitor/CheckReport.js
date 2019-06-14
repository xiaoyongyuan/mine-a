import React, { Component } from "react";
import Etable from "../common/Etable";
import BaseForm from "../common/BaseForm";
class CheckReport extends Component {
  constructor(props) {
    super(props);
  }
    formList = {
        type: "inline",
        item: [
            {
                type: "RANGPICKER",
                label: "双日期",
                field: "doubledata",
                // rules:,
                placeholder: "请选择日期",
                initialValue: ["2019-03-09 12:09:09", "2019-03-09 12:09:09"],
                showTime: true,
                format: "YYYY-MM-DD HH:mm:ss"
            },
            {
                type: "button",
                button: [
                    {
                        label: "查询",
                        type: "primary",
                        click: "handleFilterSubmit"
                    }
                ]
            }
        ]
    };
  render() {
      const _this=this;
      const columns=[{
          title: '序号',
          dataIndex: 'index',
          render: (text, record,index) => (index+1),
      },{
          title: '报告名称',
          dataIndex: 'username',
      },{
          title: '时间',
          dataIndex: 'tel',
      },{
          title: '操作',
          key:'option',
          dataIndex: 'code',
          columnWidth:'100px',
          render: (text,record,index) =>{
              return(<div className="tableoption"><span className="greencolor" >预览</span><span className="redcolor">下载</span></div>)
          }
      }];
    return (
        <div className="CheckReport">
            <Etable
                ref="pageChange"
                bordered
                columns={columns}
                // dataSource={this.state.list}
                // pagination={{
                //     defaultPageSize: 10,
                //     current: this.state.page,
                //     total: this.state.total,
                //     onChange: this.changePage,
                // }}
                // pagination={this.state.pagination}
            />
        </div>
    );
  }
}
export default CheckReport;
