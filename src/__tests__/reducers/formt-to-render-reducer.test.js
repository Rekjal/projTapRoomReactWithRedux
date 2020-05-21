import formToRender from '../../reducers/form-to-render-reducer';

describe("formToRender", () => {

  test('Should return default state if no action type is recognized', () => {
    expect(formToRender(false, { type: null })).toEqual(false);
  });
});