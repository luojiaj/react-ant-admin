import React, { Component } from 'react';
import { getUsersList } from '@/servers/homeApi';
import { Divider, Button, Switch } from 'antd';

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
}

export default stateData;