import React, { Component } from 'react';
import { getUsersList } from '@/servers/homeApi';
import { Divider, Button } from 'antd';

class stateData extends Component {

  constructor(props) {
    super(props);
    this.userList();
  }
  state = {
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '是否启用',
        dataIndex: 'isDownloadable',
        key: 'isDownloadable',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button type="primary" loading={record.loading}>修改</Button>
            <Divider type="vertical" />
            <Button type="danger">删除</Button>
          </span>
        ),
      },
    ],
    data: [],
    selectedRowKeys: [],
  };

  // ........................函数区..........................

  userList() {//获取用户列表
    getUsersList().then(res => {
      let tableData = { ...res.data };
      tableData.forEach(item => {
        item.loading = true;
      });
      this.setState({ data: tableData })
      console.log(tableData);
    })
  }
}

export default stateData;