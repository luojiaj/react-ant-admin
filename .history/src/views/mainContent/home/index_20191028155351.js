import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { Table, Card, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
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




  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        ...this.getColumnSearchProps('phone'),
      },
      {
        title: '是否启用',
        dataIndex: 'isDownloadable',
        key: 'isDownloadable',
        render: (text, record) => (
          record.isDownloadable == 0 ?
            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={false} /> :
            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button type="primary" loading={record.loading}>修改</Button>
            {/* <Divider type="vertical" /> */}
          </span>
        ),
      },
    ]
    return (
      <div className='home'>
        <Card style={{ 'border-bottom': 0 }}>
          <Button type="danger" className="shanchu">删除</Button>
        </Card>
        <Card>
          <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
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
