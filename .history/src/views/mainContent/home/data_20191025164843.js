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
        title: 'Action',
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
    data: [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
        loading: false,
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
        loading: false,
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
        loading: false,
      },
    ],
    selectedRowKeys: [],
  };

  // ........................函数区..........................

  userList() {//获取用户列表
    getUsersList().then(res => {
      console.log(res.data)
    })
  }
}

export default stateData;