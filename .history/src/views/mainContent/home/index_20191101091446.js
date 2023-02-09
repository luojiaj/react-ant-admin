import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { Table, Card, Button, Switch, message, Input, Divider, Popover } from 'antd';
import stateData from './data';
import { putAuthority } from '@/servers/homeApi';

class Home extends stateData {
  constructor(props) {
    super(props);
    this.changeUser = this.changeUser.bind(this);
    this.cancelChangeUser = this.cancelChangeUser.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changePhone = this.changePhone.bind(this);
    this.changeCompany = this.changeCompany.bind(this);
    this.changeProjectSummary = this.changeProjectSummary.bind(this);
  }

  componentWillReceiveProps(nextProps) { }

  componentWillMount() { }

  componentDidMount() { }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    this.setState({ selectedRowKeys });
  };

  onChange = (record) => {
    record.switchLoading = true;
    record.isDownloadable == 0 ?
      record.isDownloadable = 1 :
      record.isDownloadable = 0;
    this.setState({})
    putAuthority(record.id, { isDownloadable: record.isDownloadable }).then(res => {
      record.switchLoading = false;
      this.setState({});
      message.info(res.data.msg);
    })
  }

  changeUser = (record) => {
    record.isShowChange = true;
    this.state.data.forEach(item => {
      console.log(item)
      if (item.id != record.id) {
        item.isShowChange = false;
      }
    })
    this.setState({ reviseUser: { ...record } });
  };

  cancelChangeUser = (record) => {
    record.isShowChange = false;
    this.setState({})
  };

  changeName = (e) => {
    let reviseUser = this.state.reviseUser;
    reviseUser.name = e.target.value;
    this.setState({ reviseUser });
  };

  changePhone = (e) => {
    let reviseUser = this.state.reviseUser;
    reviseUser.phone = e.target.value;
    this.setState({ reviseUser });
  };

  changeCompany = (e) => {
    let reviseUser = this.state.reviseUser;
    reviseUser.company = e.target.value;
    this.setState({ reviseUser });
  };

  changeProjectSummary = (e) => {
    let reviseUser = this.state.reviseUser;
    reviseUser.projectSummary = e.target.value;
    this.setState({ reviseUser });
  }

  render() {
    const { selectedRowKeys, tableLoading, delLoading, data } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 260,
        ...this.getColumnSearchProps('name', '姓名'),
        render: (text, record) => (
          record.isShowChange == true ?
            <Input className="nameInput" onChange={(e) => this.changeName(e, record)} defaultValue={record.name} allowClear></Input> :
            <p className="nameP">{record.name}</p>
        )
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        width: 260,
        ...this.getColumnSearchProps('phone', '手机号'),
        render: (text, record) => (
          record.isShowChange == true ?
            <Input className="phoneInput" onChange={(e) => this.changePhone(e, record)} defaultValue={record.phone} allowClear></Input> :
            <p className="nameP">{record.phone}</p>
        )
      },
      {
        title: '公司',
        dataIndex: 'company',
        key: 'company',
        width: 260,
        ...this.getColumnSearchProps('company', '公司'),
        render: (text, record) => (
          record.isShowChange == true ?
            <Input className="companyInput" onChange={(e) => this.changeCompany(e, record)} defaultValue={record.company} allowClear></Input> :
            <Popover placement="topLeft" content={record.company}>
              <p className="nameP">{record.company}</p>
            </Popover>
        )
      },
      {
        title: '是否启用',
        dataIndex: 'isDownloadable',
        key: 'isDownloadable',
        width: 150,
        render: (text, record) => (
          <Switch onChange={() => this.onChange(record)} loading={record.switchLoading} checkedChildren="开" unCheckedChildren="关" defaultChecked={record.isDownloadable == 0 ? false : true} />
        ),
      },
      {
        title: '项目介绍',
        dataIndex: 'projectSummary',
        key: 'projectSummary',
        render: (text, record) => (
          record.isShowChange == true ?
            <Input className="projectSummaryInput" onChange={(e) => this.changeProjectSummary(e, record)} defaultValue={record.projectSummary} allowClear></Input> :
            <Popover placement="topLeft" content={record.projectSummary}>
              <p className="projectSummaryP">{record.projectSummary}</p>
            </Popover>
        )
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        render: (text, record) => (
          record.isShowChange == false ?
            <span>
              <Button type="primary" onClick={() => this.changeUser(record)}>修改</Button>
            </span> :
            <span>
              <Button type="danger" onClick={() => this.putChangeUser(record)} loading={record.loading}>保存</Button>
              <Divider type="vertical" />
              <Button type="primary" onClick={() => this.cancelChangeUser(record)}>取消</Button>
            </span>
        ),
      },
    ]
    return (
      <div className='home'>
        <Card style={{ 'border-bottom': 0 }} bodyStyle={{ 'height': 62 }}>
          <Button type="danger" className="shanchu" loading={delLoading}>删除</Button>
        </Card>
        <Card>
          <Table loading={tableLoading} rowSelection={rowSelection} columns={columns} dataSource={data} rowKey={record => record.id} />
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    windowInfo: state.Common.windowInfo,
  }
};

export default connect(mapStateToProps)(Home);
