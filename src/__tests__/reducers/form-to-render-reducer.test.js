import formToRenderReducer from '../../reducers/form-to-render-reducer';

describe("formToRenderReducer", () => {

  test('Should return default state if no action type is recognized', () => {
    expect(formToRenderReducer(false, { type: null })).toEqual(false);
  });

  test('Should toggle form visibility state to true', () => {
    expect(formToRenderReducer(false, { type: 'TOGGLE_FORM' })).toEqual(true);
  });

});