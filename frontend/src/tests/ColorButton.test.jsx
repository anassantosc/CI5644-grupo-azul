import { render, fireEvent } from '@testing-library/react';
import ColorButton from '../components/ColorButton';

// Test para renderizado correcto
it('renders correctly', () => {
  const { asFragment } = render(<ColorButton bgcolor="blue" textcolor="white">Test Button</ColorButton>);
  expect(asFragment()).toMatchSnapshot();
});

// Test para diferentes props
it('renders with different props', () => {
  const { asFragment } = render(<ColorButton bgcolor="red" textcolor="black">Test Button</ColorButton>);
  expect(asFragment()).toMatchSnapshot();
});

// Tests para el evento onClick
it('calls onClick prop when clicked', () => {
  const onClickMock = jest.fn();
  const { getByText } = render(<ColorButton onClick={onClickMock}>Test Button</ColorButton>);
  fireEvent.click(getByText('Test Button'));
  expect(onClickMock).toHaveBeenCalled();
});