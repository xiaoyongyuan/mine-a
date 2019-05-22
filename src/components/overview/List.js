import React, { Component } from 'react';
import {Tabs,Row, Col,Select,Upload,Icon,Modal,message,DatePicker} from 'antd'


class List extends React.Component {
    render() {
        return (
            <tr id={this.props.index} className="alt">
                <td>
                    <input type="text" defaultValue={this.props.info} />
                </td>
                <td>
                    <button onClick={this.props.delete} data-index={this.props.index}>删除</button>
                </td>
            </tr>
        )
    }
}


export default List;