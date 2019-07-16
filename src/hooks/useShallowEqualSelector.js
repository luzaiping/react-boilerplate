/**
 * 这个 hooks 用来代替默认的 useSelector
 * useSelector 采用的是 === 的比较方式，如果 useSelector 的返回值是 object 类型
 * 即使前后两次返回的值是一样，但是因为是不同引用，从而导致 === 比较结果是 false 从而触发 re-render；
 * 加上 shallowEqual 比较函数，行为就跟 mapStateToProps 一样，比较的是 object field，而不是整个 object
 * 这样只有对象内容不一样才会触发 re-render
 * shallowEqual 也可以换成 Lodash's _.isEqual() 或者 Immutable.js 的比较函数
 */

import { useSelector, shallowEqual } from 'react-redux';

export default function useShallowEqualSelector(selector) {
  return useSelector(selector, shallowEqual);
}
