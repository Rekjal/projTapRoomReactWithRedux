import formToRenderReducer from '../../reducers/form-to-render-reducer';

describe("formToRenderReducer", () => {

  test('TEST-1 (formToRenderReducer): Should return default state if no action type is recognized', () => {
    expect(formToRenderReducer(false, { type: null })).toEqual(false);
  });

  test('TEST-2 (formToRenderReducer): Should toggle form visibility state to true', () => {
    expect(formToRenderReducer(false, { type: 'TOGGLE_FORM' })).toEqual(true);
  });

});