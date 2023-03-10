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
        width: 350,
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
        width: 350,
        ...this.getColumnSearchProps('phone', '?????????'),
        render: (text, record) => (
          record.isShowChange == true ?
            <Input className="PhoneInput" onChange={(e) => this.changePhone(e, record)} defaultValue={record.phone} allowClear></Input> :
            <p className="nameP">{record.phone}</p>
        )
      },
      {
        title: '??????',
        dataIndex: 'company',
        key: 'company',
        width: 350,
        ...this.getColumnSearchProps('company', '??????'),
        render: (text, record) => (
          record.isShowChange == true ?
            <Input className="PhoneInput" onChange={(e) => this.changeCompany(e, record)} defaultValue={record.company} allowClear></Input> :
            <p className="nameP">{record.phone}</p>
        )
      },
      {
        title: '????????????',
        dataIndex: 'isDownloadable',
        key: 'isDownloadable',
        render: (text, record) => (
          <Switch onChange={() => this.onChange(record)} loading={record.switchLoading} checkedChildren="???" unCheckedChildren="???" defaultChecked={record.isDownloadable == 0 ? false : true} />
        ),
      },
      {
        title: '??????',
        key: 'action',
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
