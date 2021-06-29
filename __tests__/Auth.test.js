import React from "react"
import { render, screen } from '@testing-library/react';
import Auth from "../components/pages/Auth";

describe("Test Auth component", () => {
    test("Check if login component is rendered", () => {
        render(<Auth />);
        expect(screen.getByTestId("login")).toBeInTheDocument();
    });

    test("Check if register component is rendered", () => {
        render(<Auth />);
        expect(screen.getByTestId("login")).toBeInTheDocument();
    });
});

describe("Test Login component", () => {
    test("Check if form labels are rendered", () => {
        render(<Auth />);
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    test("Check if progress indicator is not visible initially", () => {
        render(<Auth />);
        expect(screen.queryByTestId("progress")).not.toBeInTheDocument();
    })
});