import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthForm from '../components/AuthForm';

// Test para verificar que el componente se renderiza correctamente (Login)
it('renders correctly', () => {
  const { getByLabelText } = render(
    <AuthForm onSubmit={() => {}} onChange={() => {}} values={{username: '', password: ''}} isLogin={true} />
  );
  expect(getByLabelText('Usuario *')).toBeInTheDocument();
  expect(getByLabelText('Contraseña *')).toBeInTheDocument();
});

// Test para verificar que el componente se renderiza correctamente (Register)
it('renders correctly', () => {
  const { getByLabelText } = render(
    <AuthForm onSubmit={() => {}} onChange={() => {}} values={{username: '', password: '', confirmPassword: '', gender: 'Masculino'}} isLogin={false} />
  );
  expect(getByLabelText('Usuario *')).toBeInTheDocument();
  expect(getByLabelText('Contraseña *')).toBeInTheDocument();
  expect(getByLabelText('Confirmar contraseña *')).toBeInTheDocument();
});

// Test para verificar que el valor del campo de texto cambia cuando el usuario escribe en él
it('updates on change', () => {
  const onChangeMock = jest.fn();
  const { getByLabelText } = render(
    <AuthForm onSubmit={() => {}} onChange={onChangeMock} values={{username: '', password: '', confirmPassword: '', name: '', mail: '', gender: 'Masculino'}} isLogin={false} />
  );
  fireEvent.change(getByLabelText('Usuario *'), { target: { value: 'test user' } });
  fireEvent.change(getByLabelText('Contraseña *'), { target: { value: 'test password' } });
  fireEvent.change(getByLabelText('Confirmar contraseña *'), { target: { value: 'test password' } });
  expect(onChangeMock).toHaveBeenCalledTimes(3);
});

// Test para verificar que el formulario se renderiza correctamente con los props dados
test("renderiza el componente AuthForm con los props dados", () => {
  const props = {
    onSubmit: () => {},
    onChange: () => {},
    values: {username: '', password: '', confirmPassword: '', name: '', mail: '', gender: 'Masculino'},
    isLogin: false
  };

  render(<AuthForm {...props} />);

  const usernameElement = screen.getByLabelText('Usuario *');
  const passwordElement = screen.getByLabelText('Contraseña *');
  const confirmPasswordElement = screen.getByLabelText('Confirmar contraseña *');

  expect(usernameElement).toBeTruthy();
  expect(passwordElement).toBeTruthy();
  expect(confirmPasswordElement).toBeTruthy();
});
