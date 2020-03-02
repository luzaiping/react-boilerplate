import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import axios from 'axios';

import App, { dataReducer } from '../src/App';
import Counter from '../src/Counter';

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

    it('passes all props to Counter', () => {
      const appWrapper = mount(<App />);
      const counterWrapper = appWrapper.find(Counter);

      expect(counterWrapper.find('p').text()).toEqual('0');
    });

    it('increments the counter', () => {
      const wrapper = mount(<App />);

      wrapper
        .find('button')
        .at(0)
        .simulate('click');

      const counterWrapper = wrapper.find(Counter);
      expect(counterWrapper.find('p').text()).toBe('1');
    });

    it('decrements the counter', () => {
      const wrapper = mount(<App />);

      wrapper
        .find('button')
        .at(1)
        .simulate('click');

      const counterWrapper = wrapper.find(Counter);
      expect(counterWrapper.find('p').text()).toBe('-1');
    });

    it('fetches async data', () => {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: {
              hits: [
                { objectID: '1', title: 'a' },
                { objectID: '2', title: 'b' }
              ]
            }
          });
        }, 100);
      });

      axios.get = jest.fn(() => promise);

      const wrapper = mount(<App />);
      expect(wrapper.find('li').length).toEqual(0);

      promise.then(() => {
        setImmediate(() => {
          wrapper.update();
          expect(wrapper.find('li').length).toEqual(2);
          axios.get.mockClear();

          // done();
        });
      });
    });

    it('fetches async data but fails', () => {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Whoops!'));
        }, 100);
      });

      axios.get = jest.fn(() => promise);

      const wrapper = mount(<App />);

      promise.catch(() => {
        setImmediate(() => {
          wrapper.update();

          expect(wrapper.find('li').length).toBe(0);
          expect(wrapper.find('.error').length).toBe(1);

          axios.get.mockClear();
          // done();
        });
      });
    });
  });
});
