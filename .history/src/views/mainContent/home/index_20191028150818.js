import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { Table, Card, Input } from 'antd';
import stateData from './data'
const { Search } = Input;
const InputGroup = Input.Group;
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

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    return (
      <div className='home'>
        <Card>
          <InputGroup compact>
            <Search
              placeholder="姓名"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
              allowClear
              loading
            />
            <Search
              placeholder="手机号"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
              allowClear
            />
          </InputGroup>
        </Card>
        <Card>
          <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} />
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
