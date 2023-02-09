import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { Table, Card, Button, Switch, message, Input, Divider } from 'antd';
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

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    this.setState({ selectedRowKeys });
  };

  componentWillReceiveProps(nextProps) { }

  componentWillMount() { }

  componentDidMount() { }


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

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  changeUser = (record) => {
    record.isShowChange = true;
    this.setState({});
  };

  cancelChangeUser = (record) => {
    record.isShowChange = false;
    this.setState({})
  };

  changeName = (e, record) => {
    record.name = e.target.value;
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
            <Input className="PhoneInput" onChange={(e) => this.changePhone(e, record)} defaultValue={record.phone} allowClear></Input> :
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
            <Input className="PhoneInput" onChange={(e) => this.changeCompany(e, record)} defaultValue={record.company} allowClear></Input> :
            <p className="nameP">{record.company}</p>
        )
      },
      {
        title: '是否启用',
        dataIndex: 'isDownloadable',
        key: 'isDownloadable',
        width: 100,
        render: (text, record) => (
          <Switch onChange={() => this.onChange(record)} loading={record.switchLoading} checkedChildren="开" unCheckedChildren="关" defaultChecked={record.isDownloadable == 0 ? false : true} />
        ),
      },
      {
        title: '项目简介',
        dataIndex: 'projectSummary',
        key: 'projectSummary',
        render: (text, record) => (
          record.isShowChange == true ?
            <Input className="PhoneInput" onChange={(e) => this.changeProjectSummary(e, record)} defaultValue={record.projectSummary} allowClear></Input> :
            <p className="nameP">{record.projectSummary}</p>
        )
      },
      {
        title: '操作',
        key: 'action',
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
