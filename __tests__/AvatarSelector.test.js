import {render, screen} from "@testing-library/react";
import React from "react";
import AvatarSelector from "../components/AvatarSelector";


describe("Test AvatarSelector component", () => {
    test("Check if Avatar preview is visible", () => {
        render(<AvatarSelector />);
        expect(screen.getByTestId("preview")).toBeInTheDocument();
    });

    test("Check if FileUpload component is not visible initially", () => {
        render(<AvatarSelector />);
        expect(screen.queryByTestId("fileUpload")).not.toBeInTheDocument();
    })
});