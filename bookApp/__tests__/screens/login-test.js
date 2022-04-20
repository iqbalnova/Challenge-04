import React from 'react';
import {create} from 'react-test-renderer';
import Login from '../../src/screens/Login';
import ContainerTesting from '../../src/helpers/ReduxTesting';
// const tree = create(<Home />);

// test('snapshot', () => {
//   expect(tree).toMatchSnapshot();
// });
jest.runAllTimers();
describe('Group Name', () => {
  describe('Login', () => {
    it('renders correctly', () => {
      const tree = create(ContainerTesting(<Login />));
      expect(tree).toMatchSnapshot();
    });
  });
});
