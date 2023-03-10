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
    this.setState({ reviseUser: record });
  };

  cancelChangeUser = (record) => {
    record.isShowChange = false;
    this.setState({})
  };

  changeName = (e, record) => {
    let reviseUser = this.state.reviseUser;
    reviseUser.name = e.target.value;
    this.setState({ reviseUser });
  };

  changePhone = (e, record) => {
    record.phone = e.target.value;
  };

  changeCompany = (e, record) => {
    record.company = e.target.value;
  };

  changeProjectSummary = (e, record) => {
    record.projectSummary = e.target.value;
  }

  render() {
    const { selectedRowKeys, tableLoading, delLoading, data } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    const columns = [
      {
        title: '??????',
        dataIndex: 'name',
        key: 'name',
        width: 260,
        ...this.getColumnSearchProps('name', '??????'),
        render: (text, record) => (
          record.isShowChange == true ?
            <Input className="nameInput" onChange={(e) => this.changeName(e, record)} defaultValue={record.name} allowClear></Input> :
            <p className="nameP">{record.name}</p>
        )
      },
      {
        title: '?????????',
        dataIndex: 'phone',
        key: 'phone',
        width: 260,
        ...this.getColumnSearchProps('phone', '?????????'),
        render: (text, record) => (
          record.isShowChange == true ?
            <Input className="phoneInput" onChange={(e) => this.changePhone(e, record)} defaultValue={record.phone} allowClear></Input> :
            <p className="nameP">{record.phone}</p>
        )
      },
      {
        title: '??????',
        dataIndex: 'company',
        key: 'company',
        width: 260,
        ...this.getColumnSearchProps('company', '??????'),
        render: (text, record) => (
          record.isShowChange == true ?
            <Input className="companyInput" onChange={(e) => this.changeCompany(e, record)} defaultValue={record.company} allowClear></Input> :
            <Popover content={record.company}>
              <p className="nameP">{record.company}</p>
            </Popover>
        )
      },
      {
        title: '????????????',
        dataIndex: 'isDownloadable',
        key: 'isDownloadable',
        width: 150,
        render: (text, record) => (
          <Switch onChange={() => this.onChange(record)} loading={record.switchLoading} checkedChildren="???" unCheckedChildren="???" defaultChecked={record.isDownloadable == 0 ? false : true} />
        ),
      },
      {
        title: '????????????',
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
        title: '??????',
        key: 'action',
        width: 200,
        render: (text, record) => (
          record.isShowChange == false ?
            <span>
              <Button type="primary" onClick={() => this.changeUser(record)}>??????</Button>
            </span> :
            <span>
              <Button type="danger" onClick={() => this.putChangeUser(record)} loading={record.loading}>??????</Button>
              <Divider type="vertical" />
              <Button type="primary" onClick={() => this.cancelChangeUser(record)}>??????</Button>
            </span>
        ),
      },
    ]
    return (
      <div className='home'>
        <Card style={{ 'border-bottom': 0 }} bodyStyle={{ 'height': 62 }}>
          <Button type="danger" className="shanchu" loading={delLoading}>??????</Button>
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
