
import React, { Component } from 'react';
import { Breadcrumb, Icon } from 'antd';
import {Link} from "react-router-dom";

export default class PageBreadcrumb extends Component {
    constructor(props){
        super(props);
        this.state={
            routes:[]
        }
    }
    componentDidMount(){
        this.setState({
            routes:this.props.routes
        })
    }
    render() {
        return (
            <div style={{margin:"10px auto 15px 0",borderBottom:"1px solid gray"}}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={'/pandect/mapshow'}>
                            <span>首页</span>
                        </Link>
                    </Breadcrumb.Item>
                    {this.state.routes.map(function(item,key){
                        if(item.path==""){
                            return (
                                <Breadcrumb.Item key={item.breadcrumbName}>
                                        <span>{item.breadcrumbName}</span>
                                </Breadcrumb.Item>
                            )
                        }else{
                            return (
                                <Breadcrumb.Item key={item.breadcrumbName}>
                                    <Link to={item.path}>
                                        <span>{item.breadcrumbName}</span>
                                    </Link>
                                </Breadcrumb.Item>
                            )
                        }
                        
                    })}
                </Breadcrumb>
            </div>
        )
    }
}