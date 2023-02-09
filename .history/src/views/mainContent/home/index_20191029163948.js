import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { Table, Card, Button, Switch } from 'antd';
import stateData from './data'
class Home extends stateData {
  constructor(props) {
    super(props);
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    this.setState({ selectedRowKeys });
  };

  componentWillReceiveProps(nextProps) { }

  componentWillMount() { }

  componentDidMount() { }


  onChange = (record) => {
    console.log(record);
    if (record.isDownloadable == 0) record.isDownloadable = 1;
    if (record.isDownloadable == 1) record.isDownloadable = 0;
    this.setState({})
  }

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

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
        ...this.getColumnSearchProps('name', '姓名'),
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        ...this.getColumnSearchProps('phone', '手机号'),
      },
      {
        title: '是否启用',
        dataIndex: 'isDownloadable',
        key: 'isDownloadable',
        render: (text, record) => (
          <Switch onChange={() => this.onChange(record)} loading checkedChildren="开" unCheckedChildren="关" defaultChecked={record.isDownloadable == 0 ? false : true} />
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button type="primary" onClick={() => this.changeUser(record)} loading={record.loading}>修改</Button>
            {/* <Divider type="vertical" /> */}
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
          <Table loading={tableLoading} rowSelection={rowSelection} columns={columns} dataSource={data} />
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
