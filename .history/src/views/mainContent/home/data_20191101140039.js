import React, { Component } from 'react';
import { getUsersList, putUser, delUserList } from '@/servers/homeApi';
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
    data: [],//当前表格数据
    selectedRowKeys: [],
    searchText: '',
    delLoading: false,
    tableLoading: true,
    reviseUser: {},//正在修改的用户信息
    page: 1,
    pageSize: 10,
    total: null,
  };


  // ........................数据函数区..........................

  userList = () => {//获取用户列表
    this.setState({ tableLoading: true });
    getUsersList(this.state.page, this.state.pageSize).then(res => {
      let tableData = res.data.results;
      tableData.forEach(item => {
        item.loading = false;//保存修改时的加载状态
        item.switchLoading = false;//选择是否启用时的加载状态
        item.isShowChange = false;//是否显示修改
      });
      this.setState({ total: res.data.len, data: tableData, tableLoading: false })
      console.log(tableData);
    })
  }

  //修改用户信息
  putChangeUser = record => {
    let that = this;
    if (!record.name || !record.phone) {
      message.error('姓名和手机号不能为空');
    } else {
      record.loading = true;
      this.setState({});
      let reviseUser = this.state.reviseUser;
      putUser(reviseUser.id, reviseUser).then(res => {
        that.userList();
        message.info(res.data.msg);
      })
    }
  }

  //删除用户
  delUser = () => {
    console.log(this.state.selectedRowKeys)
    let that = this;
    let data = { userIDs: this.state.selectedRowKeys }
    delUserList(data).then(res => {
      if ((this.state.total - this.state.selectedRowKeys.length) % this.state.pageSize == 0) {
        that.setState({ selectedRowKeys: [], page: this.state.page - 1 })
      } else {
        that.setState({ selectedRowKeys: [] })
      }
      that.userList();
      message.info(res.data.msg);
    })
  }

  //..............分页区................
  pageChange = (page, pageSize) => {
    console.log(page, pageSize);
    this.setState({ page: page, pageSize: pageSize }, () => {
      this.userList();
    })
  }

  onShowSizeChange = (current, pageSize) => {
    // console.log(current, pageSize);
    this.setState({ pageSize: pageSize }, () => {
      this.userList();
    })
  }

  //...............分页区................

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

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