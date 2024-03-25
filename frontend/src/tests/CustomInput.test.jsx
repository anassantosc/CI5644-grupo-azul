import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomInput from '../components/CustomInput';

// Test para verificar que el componente se renderiza correctamente
it('renders correctly', () => {
  const { getByLabelText } = render(
    <CustomInput type="text" label="Test Input" onChange={() => {}} name="test" required={true} options={null}/>
  );
  expect(getByLabelText('Test Input *')).toBeInTheDocument();
});

// Test para verificar que el valor del campo de texto cambia cuando el usuario escribe en él
it('updates on change', () => {
  const onChangeMock = jest.fn();
  const { getByLabelText } = render(
    <CustomInput type="text" label="Test Input" onChange={onChangeMock} name="test" required={true} options={null}/>
  );
  fireEvent.change(getByLabelText('Test Input *'), { target: { value: 'test value' } });
  expect(onChangeMock).toHaveBeenCalled();
});

// Test para verificar que se muestra el texto de ayuda cuando se pasa un error
it('shows helper text when error is passed', () => {
  const { getByText } = render(
    <CustomInput type="text" label="Test Input" onChange={() => {}} name="test" error="Test error" />
  );
  expect(getByText('Test error')).toBeInTheDocument();
});

// Test para verificar que no se muestra el texto de ayuda cuando no se pasa un error
it('does not show helper text when no error is passed', () => {
  const { queryByText } = render(
    <CustomInput type="text" label="Test Input" onChange={() => {}} name="test" />
  );
  expect(queryByText('Test error')).not.toBeInTheDocument();
});