import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PetBreakthroughStarTrack } from "../src/components/calculators/pet-breakthrough-star-track";

describe("PetBreakthroughStarTrack Component", () => {
  it("renders 19 milestones for Mythic pet (Break 5 to 23)", () => {
    const handleChangeRange = vi.fn();

    render(
      <PetBreakthroughStarTrack
        minBreak={5}
        maxBreak={23}
        fromBreak={5}
        toBreak={16}
        locale="vi"
        onChangeRange={handleChangeRange}
      />
    );

    // Component container exists
    expect(screen.getByTestId("pet-breakthrough-star-track")).toBeDefined();

    // Check presence of milestone strip
    expect(screen.getByTestId("pet-star-milestones-strip")).toBeDefined();

    // Node 5 exists and Node 23 exists
    expect(screen.getByTestId("pet-star-node-5")).toBeDefined();
    expect(screen.getByTestId("pet-star-node-16")).toBeDefined();
    expect(screen.getByTestId("pet-star-node-23")).toBeDefined();

    // Node 4 (Rare) should not be visible for Mythic pet starting at Break 5
    expect(screen.queryByTestId("pet-star-node-4")).toBeNull();

    // Form badges F2, F3, F4
    expect(screen.getByText("F2")).toBeDefined();
    expect(screen.getByText("F3")).toBeDefined();
    expect(screen.getByText("F4")).toBeDefined();
  });

  it("renders 18 milestones for Rare pet (Break 0 to 17)", () => {
    const handleChangeRange = vi.fn();

    render(
      <PetBreakthroughStarTrack
        minBreak={0}
        maxBreak={17}
        fromBreak={0}
        toBreak={10}
        locale="vi"
        onChangeRange={handleChangeRange}
      />
    );

    // Node 0 should exist
    expect(screen.getByTestId("pet-star-node-0")).toBeDefined();
    // Node 17 should exist
    expect(screen.getByTestId("pet-star-node-17")).toBeDefined();
    // Node 18 should not exist
    expect(screen.queryByTestId("pet-star-node-18")).toBeNull();
  });

  it("calls onChangeRange when clicking on a higher milestone star node", () => {
    const handleChangeRange = vi.fn();

    render(
      <PetBreakthroughStarTrack
        minBreak={5}
        maxBreak={23}
        fromBreak={5}
        toBreak={16}
        locale="vi"
        onChangeRange={handleChangeRange}
      />
    );

    // Click on Break 20 node
    const node20 = screen.getByTestId("pet-star-node-20");
    fireEvent.click(node20);

    expect(handleChangeRange).toHaveBeenCalledWith(5, 20);
  });

  it("calls onChangeRange when clicking on a lower milestone star node (sets as new fromBreak)", () => {
    const handleChangeRange = vi.fn();

    render(
      <PetBreakthroughStarTrack
        minBreak={0}
        maxBreak={23}
        fromBreak={10}
        toBreak={16}
        locale="vi"
        onChangeRange={handleChangeRange}
      />
    );

    // Click on Break 5 node (< 10)
    const node5 = screen.getByTestId("pet-star-node-5");
    fireEvent.click(node5);

    expect(handleChangeRange).toHaveBeenCalledWith(5, 16);
  });

  it("triggers +1 step button accurately", () => {
    const handleChangeRange = vi.fn();

    render(
      <PetBreakthroughStarTrack
        minBreak={5}
        maxBreak={23}
        fromBreak={5}
        toBreak={10}
        locale="vi"
        onChangeRange={handleChangeRange}
      />
    );

    const singleStepBtn = screen.getByTestId("pet-star-track-single-step");
    fireEvent.click(singleStepBtn);

    // from 5, to should be clamped to from + 1 = 6
    expect(handleChangeRange).toHaveBeenCalledWith(5, 6);
  });

  it("handles dual range slider changes safely", () => {
    const handleChangeRange = vi.fn();

    render(
      <PetBreakthroughStarTrack
        minBreak={5}
        maxBreak={23}
        fromBreak={5}
        toBreak={16}
        locale="vi"
        onChangeRange={handleChangeRange}
      />
    );

    const fromSlider = screen.getByTestId("pet-star-track-from-slider");
    fireEvent.change(fromSlider, { target: { value: "8" } });
    expect(handleChangeRange).toHaveBeenCalledWith(8, 16);

    const toSlider = screen.getByTestId("pet-star-track-to-slider");
    fireEvent.change(toSlider, { target: { value: "22" } });
    expect(handleChangeRange).toHaveBeenCalledWith(5, 22);
  });

  it("handles stepper increase and decrease buttons", () => {
    const handleChangeRange = vi.fn();

    render(
      <PetBreakthroughStarTrack
        minBreak={5}
        maxBreak={23}
        fromBreak={8}
        toBreak={16}
        locale="vi"
        onChangeRange={handleChangeRange}
      />
    );

    // Increase from
    const fromIncBtn = screen.getByTestId("pet-from-break-increase");
    fireEvent.click(fromIncBtn);
    expect(handleChangeRange).toHaveBeenCalledWith(9, 16);

    // Decrease from
    const fromDecBtn = screen.getByTestId("pet-from-break-decrease");
    fireEvent.click(fromDecBtn);
    expect(handleChangeRange).toHaveBeenCalledWith(7, 16);

    // Increase to
    const toIncBtn = screen.getByTestId("pet-to-break-increase");
    fireEvent.click(toIncBtn);
    expect(handleChangeRange).toHaveBeenCalledWith(8, 17);

    // Decrease to
    const toDecBtn = screen.getByTestId("pet-to-break-decrease");
    fireEvent.click(toDecBtn);
    expect(handleChangeRange).toHaveBeenCalledWith(8, 15);
  });
});
