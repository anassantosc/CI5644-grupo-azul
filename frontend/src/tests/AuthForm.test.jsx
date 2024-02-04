import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthForm from '../components/AuthForm';

// Test para verificar que el componente se renderiza correctamente (Login)
it('renders correctly', () => {
  const { getByLabelText } = render(
    <AuthForm onSubmit={() => {}} onChange={() => {}} values={{username: '', password: ''}} errors={{}} isLogin={true} />
  );
  expect(getByLabelText('Usuario *')).toBeInTheDocument();
  expect(getByLabelText('Contraseña *')).toBeInTheDocument();
});

// Test para verificar que el componente se renderiza correctamente (Register)
it('renders correctly', () => {
  const { getByLabelText } = render(
    <AuthForm onSubmit={() => {}} onChange={() => {}} values={{username: '', password: '', confirmPassword: ''}} errors={{}} isLogin={false} />
  );
  expect(getByLabelText('Usuario *')).toBeInTheDocument();
  expect(getByLabelText('Contraseña *')).toBeInTheDocument();
  expect(getByLabelText('Confirmar contraseña *')).toBeInTheDocument();
});

// Test para verificar que el valor del campo de texto cambia cuando el usuario escribe en él
it('updates on change', () => {
  const onChangeMock = jest.fn();
  const { getByLabelText } = render(
    <AuthForm onSubmit={() => {}} onChange={onChangeMock} values={{username: '', password: '', confirmPassword: ''}} errors={{}} isLogin={false} />
  );
  fireEvent.change(getByLabelText('Usuario *'), { target: { value: 'test user' } });
  fireEvent.change(getByLabelText('Contraseña *'), { target: { value: 'test password' } });
  fireEvent.change(getByLabelText('Confirmar contraseña *'), { target: { value: 'test password' } });
  expect(onChangeMock).toHaveBeenCalledTimes(3);
});

// Test para verificar que se muestra el texto de ayuda cuando se pasa un error
it('shows helper text when error is passed', () => {
  const { getByText } = render(
    <AuthForm onSubmit={() => {}} onChange={() => {}} values={{username: '', password: '', confirmPassword: ''}} errors={{username: 'Test error'}} isLogin={true} />
  );
  expect(getByText('Test error')).toBeInTheDocument();
});