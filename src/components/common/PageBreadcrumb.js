
import React, { Component } from 'react';
import { Breadcrumb, Icon } from 'antd';
import {Link} from "react-router-dom";

// redux需要
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Location } from '../../actions/postActions';

class PageBreadcrumb extends Component {
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
    showModalreset = (val) => {
       // redux知道全局location，菜单展开
        this.props.Location(val);
    };
    render() {
        let _this=this;
        return (
            <div style={{margin:"10px auto 15px 0",borderBottom:"1px solid gray"}}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={'/pandect/mapshow'}>
                            <span onClick={()=>_this.showModalreset("/pandect/mapshow")}>首页</span>
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
                                        <span onClick={()=>_this.showModalreset(item.breadcrumbName)}>{item.breadcrumbName}</span>
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


PageBreadcrumb.propTypes = {
    Location: PropTypes.func.isRequired
}
  
export default connect(null, { Location })(PageBreadcrumb); 