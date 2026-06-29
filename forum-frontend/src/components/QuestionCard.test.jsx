import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import QuestionCard from "./QuestionCard";

test("renders question title", () => {
    const question = {
        id: 1,
        title: "Test title",
        status: "RECEIVED",
        creationDateTime: "2026-04-19T20:00:00",
        author: {
            id: 2,
            username: "maria"
        },
        tags: []
    };

    render(
        <MemoryRouter>
            <QuestionCard
                question={question}
                onDelete={() => {}}
                currentUser={null}
            />
        </MemoryRouter>
    );

    expect(screen.getByText("Test title")).toBeTruthy();
});

test("renders question status", () => {
    const question = {
        id: 2,
        title: "Another question",
        status: "IN_PROGRESS",
        creationDateTime: "2026-04-19T20:00:00",
        author: {
            id: 3,
            username: "sebastian"
        },
        tags: []
    };

    render(
        <MemoryRouter>
            <QuestionCard
                question={question}
                onDelete={() => {}}
                currentUser={null}
            />
        </MemoryRouter>
    );

    expect(screen.getByText("IN_PROGRESS")).toBeTruthy();
});