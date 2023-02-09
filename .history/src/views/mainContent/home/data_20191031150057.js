import React, { Component } from 'react';
import { getUsersList, putUser } from '@/servers/homeApi';
import { Divider, Button, Input, Icon, message } from 'antd';
import Highlighter from 'react-highlight-words';

class stateData extends Component {

  constructor(props) {
    super(props);
    this.getColumnSearchProps = this.getColumnSearchProps.bind(this);
    this.putChangeUser = this.putChangeUser.bind(this);
    this.userList();
  }
  state = {
    data: [],
    selectedRowKeys: [],
    searchText: '',
    delLoading: true,
    tableLoading: true,
  };


  // ........................数据函数区..........................

  userList = () => {//获取用户列表
    this.setState({ tableLoading: true });
    getUsersList().then(res => {
      let tableData = res.data.results;
      tableData.forEach(item => {
        item.loading = false;//保存修改时的加载状态
        item.switchLoading = false;//选择是否启用时的加载状态
        item.isShowChange = false;//是否显示修改
      });
      this.setState({ data: tableData, tableLoading: false })
      console.log(tableData);
    })
  }

  //修改用户信息
  putChangeUser = record => {
    console.log(record)
    record.loading = true;
    this.setState({})
    putUser(record.id, record).then(res => {
      record.loading = false;
      record.isShowChange = false;
      this.setState({});
      message.info(res.data.msg);
    })
  }

  //tableData搜索
  getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`查询 ${title}`}
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
          查询
          </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          重置
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