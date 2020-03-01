import React from 'react';
import renderer from 'react-test-renderer';

import App, { dataReducer } from '../src/App';

const list = ['a', 'b', 'c'];

describe('App', () => {
  test('snapshot render', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Reducer', () => {
    it('should set a list', () => {
      const state = { list: [], error: null };
      const newState = dataReducer(state, {
        type: 'SET_LIST',
        list
      });
      expect(newState).toEqual({ list, error: null });
    });

    test('should reset the error if list is set', () => {
      const state = { list: [], error: true };
      const newState = dataReducer(state, {
        type: 'SET_LIST',
        list
      });
      expect(newState).toEqual({ list, error: null });
    });

    test('should set the error', () => {
      const state = { list: [], error: null };
      const newState = dataReducer(state, {
        type: 'SET_ERROR'
      });
      expect(newState).toEqual({ list: [], error: true });
      expect(newState.error).toBeTruthy();
    });
  });
});
