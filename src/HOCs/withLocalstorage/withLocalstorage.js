import React, { Component } from 'react';
import { load, save } from '../../localstorage';

const withLocalstorage = (localstorageKey, initValue) => (WrappedComponent) => {
  class Wrapper extends Component {
    saveData = data => {
      save(localstorageKey, data);
      this.forceUpdate();
    };

    loadData() {
      return load(localstorageKey) || initValue;
    }

    render() {
      const {forwaredRef, ...rest} = this.props;

      //console.log(forwaredRef);
      //console.log(...rest);
      //console.log(this.props);

      return (
        <WrappedComponent
          {...rest}
          ref={forwaredRef}
          savedData={this.loadData()}
          saveData={this.saveData}
        />
      )
    }
  }

  return React.forwardRef((props, ref) => (
    <Wrapper {...props} forwaredRef={ref} />
  ));
};

export default withLocalstorage;
