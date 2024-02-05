import { render, fireEvent, screen } from "@testing-library/react";
import { Card } from "./../components/Card";

const props = {
    name: "Cristiano Ronaldo",
    number: 7,
    position: "DC",
    height: "1.87cm",
    weight: "83kg",
};

// Verificar que se renderice la card:
it("renders correctly", () => {
    const { asFragment } = render(<Card {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

// Verificar que se renderice la card con los props:
test("renderiza el componente Card con los props dados", () => {
    render(<Card {...props} />);

    const nameElement = screen.getByText(props.name);
    const numberElement = screen.getByText(props.number.toString());
    const positionElement = screen.getByText(props.position);
    const heightElement = screen.getByText(props.height);
    const weightElement = screen.getByText(props.weight);

    expect(nameElement).toBeTruthy();
    expect(numberElement).toBeTruthy();
    expect(positionElement).toBeTruthy();
    expect(heightElement).toBeTruthy();
    expect(weightElement).toBeTruthy();
});
