import React, {Component} from 'react';
import { connect} from 'react-redux';
import './index.scss';

class Home extends Component{
  constructor(props) {
    super(props);
  }

  state = {};

  componentWillReceiveProps(nextProps){}

  componentWillMount(){}

  componentDidMount(){}

  render(){
    return (
      <div className='home'>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    windowInfo: state.Common.windowInfo,
  }
};

export default  connect(mapStateToProps)(Home);
