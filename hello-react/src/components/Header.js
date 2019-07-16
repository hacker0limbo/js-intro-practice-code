import React from 'react';

/**
 * Header 属于无状态组件, 只有只读的 props 属性, 同时没有生命周期
 */
const Header = (props) => {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-auto">
          <h1>Header</h1>
          <h2>{props.homeLink}</h2>
        </div>
      </div>
    </div>
  )
}

export default Header