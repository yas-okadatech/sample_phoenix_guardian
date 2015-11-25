//jest.autoMockOff()
jest.dontMock('../DefaultPage.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

// TODO import not work...
//import DefaultPage from '../DefaultPage.jsx'
let DefaultPage = require('../DefaultPage.jsx')

describe('default page', () => {

  it('should show Default', () => {
    var defaultPage = TestUtils.renderIntoDocument(<DefaultPage />);
    var defaultPageNode = ReactDOM.findDOMNode(defaultPage);

    expect(defaultPageNode.textContent).toEqual('Default');
  });
});
