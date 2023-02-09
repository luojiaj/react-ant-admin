import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { Table, Card, Search } from 'antd';
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

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    return (
      <div className='home'>
        <Card>
          <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={value => console.log(value)}
          />
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
