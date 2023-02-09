import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { Table, Divider, Tag } from 'antd';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
  };
  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
        <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} />
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
