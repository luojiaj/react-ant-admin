import React, { Component } from 'react';
import { getUsersList } from '@/servers/homeApi';
import { Divider, Button, Switch } from 'antd';

class stateData extends Component {

  constructor(props) {
    super(props);
    this.getColumnSearchProps = this.getColumnSearchProps.bind(this);
    this.userList();
  }
  state = {
    columns: [
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
    ],
    data: [],
    selectedRowKeys: [],
    searchText: '',
  };

  // ........................函数区..........................

  userList() {//获取用户列表
    getUsersList().then(res => {
      let tableData = res.data.results;
      tableData.forEach(item => {
        item.loading = false;
      });
      this.setState({ data: tableData })
      console.log(tableData);
    })
  }

  //搜索
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
          </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
          </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });
}

export default stateData;