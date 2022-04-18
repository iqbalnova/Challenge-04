import React from 'react';
import {create} from 'react-test-renderer';
import Home from '../../src/screens/Home';
import ContainerTesting from '../../src/helpers/ReduxTesting';
// const tree = create(<Home />);

// test('snapshot', () => {
//   expect(tree).toMatchSnapshot();
// });
jest.runAllTimers();
describe('Group Name', () => {
  describe('Home', () => {
    it('renders correctly', () => {
      const tree = create(ContainerTesting(<Home />));
      expect(tree).toMatchSnapshot();
    });
  });
});
