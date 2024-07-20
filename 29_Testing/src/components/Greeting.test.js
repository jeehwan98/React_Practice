import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe('Greeting component', () => {

    // check for the word Hello World
    test('renders Hello World as a text', () => {
        // Arrange
        render(<Greeting />);

        // Act
        // ... nothing

        // Assert
        const helloWorldElement = screen.getByText('Hello World', { exact: false }); // screen: gives us access to a virtual DOM
        expect(helloWorldElement).toBeInTheDocument();
    });

    //  when button is not clicked
    test('renders good to see you if the button was NOT clicked', () => {
        render(<Greeting />);

        const outputElement = screen.getByText('good to see you', { exact: false });
        expect(outputElement).toBeInTheDocument();
    });

    // when the button is clicked
    test('renders Changed! If the button was clicked', () => {
        // Arrange
        render(<Greeting />);

        // Act
        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);

        const outputElement = screen.getByText('Changed!', { exact: false });
        expect(outputElement).toBeInTheDocument();
    });

    // check for problems
    test('does not render "good to see you" if the button was clicked', () => {
        render(<Greeting />);

        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);

        const errorElement = screen.queryByText('good to see you', { exact: false });
        expect(errorElement).toBeNull();
    });
});