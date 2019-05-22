import React, { Component } from 'react';
import {Table,Row, Col,Select,Upload,Icon,Modal,message,DatePicker,Input,Button,Popconfirm,Form} from 'antd'
import easy from "../../style/yal/image/easy.png";
import "../../style/yal/css/soil.css";
import moment from "moment";

const EditableContext = React.createContext();
const EditableContext2 = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableRow2 = ({ form, index, ...props }) => (
    <EditableContext2.Provider value={form}>
        <tr {...props} />
    </EditableContext2.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
const EditableFormRow2 = Form.create()(EditableRow2);



const { MonthPicker, RangePicker } = DatePicker;
const Dragger = Upload.Dragger;
const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            handleSave2,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        );
    }
}

class EditableCell2 extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            handleSave2,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        );
    }
}

class Soilbreathe extends Component {
  constructor(props){
    super(props);
      this.columns = [
          {
              title: '序号',
              dataIndex: 'index',
              // width:'8%',
              render: (text, record,index) => (index+1),
          },
          {
              title: '损毁地点',
              dataIndex: 'name',
              // width: '30%',
              editable: true,
          },
          {
              title: '损毁面积(㎡)',
              dataIndex: 'area',
              editable: true,
          },
          {
              title: '描述',
              dataIndex: 'address',
              editable: true,
          },
          {
              title: '采集时间',
              dataIndex: 'time',
              editable: true,
          },
          {
              title: '操作',
              dataIndex: 'operation',
              render: (text, record) =>
                  this.state.dataSource.length >= 1 ? (
                      <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                          <a href="javascript:;">删除</a>
                      </Popconfirm>
                  ) : null,
          },
      ];

      this.columns2 = [
          {
              title: '序号',
              dataIndex: 'index',
              // width:'8%',
              render: (text, record,index) => (index+1),
          },
          {
              title: '损毁地点',
              dataIndex: 'name',
              // width: '30%',
              editable: true,
          },
          {
              title: '损毁面积(㎡)',
              dataIndex: 'area',
              editable: true,
          },
          {
              title: '描述',
              dataIndex: 'address',
              editable: true,
          },
          {
              title: '采集时间',
              dataIndex: 'time',
              editable: true,
          },
          {
              title: '操作',
              dataIndex: 'operation',
              render: (text, record) =>
                  this.state.dataSource.length >= 1 ? (
                      <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete2(record.key)}>
                          <a href="javascript:;">删除</a>
                      </Popconfirm>
                  ) : null,
          },
      ];
    this.state={
        lists:[],
      pagination:{},
        loading: false,
        dataSource: [
            {
                key: '0',
                name: '西安',
                area: '32',
                address: '描述一下',
                time:'2012-12-12 09:28'
            },
            {
                key: '1',
                name: '北京',
                area: '66.8',
                address: '不知道',
                time:'2012-12-12 09:28'
            },
        ],
        dataSource2: [
            {
                key: '0',
                name: '西安',
                area: '32',
                address: '描述一下',
                time:'2012-12-12 09:28'
            },
            {
                key: '1',
                name: '北京',
                area: '66.8',
                address: '不知道',
                time:'2012-12-12 09:28'
            },
        ],
        count: 2,
        count2: 2,
    };
    this.params = {
        page:1,
    }
  }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };
    handleDelete2 = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            area: 0,
            address: `London, Park Lane no. ${count}`,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

    handleAdd2 = () => {
        const { count2, dataSource2 } = this.state;
        const newData = {
            key: count2,
            name: `Edward King ${count2}`,
            area: 0,
            address: `London, Park Lane no. ${count2}`,
        };
        this.setState({
            dataSource2: [...dataSource2, newData],
            count: count2 + 1,
        });
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    };

    handleSave2 = row => {
        const newData = [...this.state.dataSource2];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource2: newData });
    };


    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

     beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    };
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };


  componentDidMount(){
  }

  render() {
      const uploadButton = (
          <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">点击上传地形地貌图</div>
          </div>
      );
      const imageUrl = this.state.imageUrl;
      const { dataSource } = this.state;
      const { dataSource2 } = this.state;
      const components = {
          body: {
              row: EditableFormRow,
              cell: EditableCell,
          },
      };
      const components2 = {
          body: {
              row: EditableFormRow2,
              cell: EditableCell2,
          },
      };

      const columns = this.columns.map(col => {
          if (!col.editable) {
              return col;
          }
          return {
              ...col,
              onCell: record => ({
                  record,
                  editable: col.editable,
                  dataIndex: col.dataIndex,
                  title: col.title,
                  handleSave: this.handleSave,
              }),
          };
      });
      const columns2 = this.columns.map(col => {
          if (!col.editable) {
              return col;
          }
          return {
              ...col,
              onCell: record => ({
                  record,
                  editable: col.editable,
                  dataIndex: col.dataIndex,
                  title: col.title,
                  handleSave2: this.handleSave2,
              }),
          };
      });

    return (
      <div className="Soilbreathe">
          <Row className="upload-row" type="flex" justify="space-around">
              <Col className="upload-col" span={6}>
                  <div className="uploaddiv">
                      <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          beforeUpload={this.beforeUpload}
                          onChange={this.handleChange}
                      >
                          {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                      </Upload>
                  </div>
              </Col>
              <Col span={6}>
                  <div className="uploaddiv">
                      <Dragger {...props}>
                          <p className="ant-upload-drag-icon">
                              <Icon type="inbox" />
                          </p>
                          <p className="ant-upload-text">点击上传地形地貌分析报告</p>
                          {/*<p className="ant-upload-hint">*/}
                              {/*Support for a single or bulk upload. Strictly prohibit from uploading company data or other*/}
                              {/*band files*/}
                          {/*</p>*/}
                      </Dragger>,
                  </div>
              </Col>
          </Row>
          <Row>
              <Col span={12}>
                  <label>采集时间：</label>
                  <MonthPicker defaultValue={moment('2015-06', 'YYYY-MM')} />
              </Col>
          </Row>
          <Row className="breathedetail-row">
              <Col>
                  <span>损毁详情</span>
              </Col>
          </Row>
          <Row className="breathetable-row">
              <Col span={24} className="breathetable-col">
                  <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                      <Icon type="plus-circle" />添加行
                  </Button>
                  <Table
                      components={components}
                      rowClassName={() => 'editable-row'}
                      bordered
                      pagination={false}
                      dataSource={dataSource}
                      columns={columns}
                      footer={() => '合计：'}
                  />
              </Col>
          </Row>
          <Row className="breathedetail-row">
              <Col>
                  <span>复垦详情</span>
              </Col>
          </Row>
          <Row className="breathetable-row">
              <Col span={24} className="breathetable-col">
                  <Button onClick={this.handleAdd2} type="primary" style={{ marginBottom: 16 }}>
                      <Icon type="plus-circle" />添加行
                  </Button>
                  <Table
                      components={components}
                      rowClassName={() => 'editable-row'}
                      bordered
                      pagination={false}
                      dataSource={dataSource2}
                      columns={columns2}
                      footer={() => '合计：'}
                  />
              </Col>
          </Row>
      </div>
    );
  }
}

export default Soilbreathe;
