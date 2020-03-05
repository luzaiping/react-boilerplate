/**
 * 创建action减少模版代码.
 * @param type  actionType
 * @param argNames 所有附带数据的属性名称
 * @returns {{ type: *, ... }}
 */
export function createActionCreator(type, ...argNames) {
  return (...argValues) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = argValues[index];
    });
    return action;
  };
}

/**
 * 创建一个 async ActionType 对象，包含 REQUEST，SUCCESS，FAILURE
 * @param type XX
 * @returns {{REQUEST: string, SUCCESS: string, FAILURE: string}}
 */
export function createAsyncActionType(type) {
  return {
    REQUEST: `${type}_REQUEST`,
    SUCCESS: `${type}_SUCCESS`,
    FAILURE: `${type}_FAILURE`
  };
}
