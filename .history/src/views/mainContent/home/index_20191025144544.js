import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { Table } from 'antd';
import stateData from './data'

class Home extends stateData {
  constructor(props) {
    super(props);
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    this.setState({ selectedRowKeys });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.num === nextProps.num) {
      //不做渲染
      return false
    }

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
