import React from 'react';
import {create} from 'react-test-renderer';
import Register from '../../src/screens/Register';
import ContainerTesting from '../../src/helpers/ReduxTesting';
// const tree = create(<Home />);

// test('snapshot', () => {
//   expect(tree).toMatchSnapshot();
// });
jest.runAllTimers();
describe('Group Name', () => {
  describe('Register', () => {
    it('renders correctly', () => {
      const tree = create(ContainerTesting(<Register />));
      expect(tree).toMatchSnapshot();
    });
  });
});
