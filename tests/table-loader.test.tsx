import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  TableSkeletonRows,
  TableOverlayLoader,
  TableContainer,
} from "@/components/ui/table-loader";

describe("TableLoader Component Suite", () => {
  it("renders TableSkeletonRows with default 5 rows and 6 columns", () => {
    const { container } = render(
      <table>
        <tbody>
          <TableSkeletonRows />
        </tbody>
      </table>
    );
    const rows = container.querySelectorAll("tr");
    expect(rows.length).toBe(5);
    const firstRowCells = rows[0].querySelectorAll("td");
    expect(firstRowCells.length).toBe(6);
  });

  it("renders TableSkeletonRows with custom rows and columns", () => {
    const { container } = render(
      <table>
        <tbody>
          <TableSkeletonRows rows={3} columns={4} />
        </tbody>
      </table>
    );
    const rows = container.querySelectorAll("tr");
    expect(rows.length).toBe(3);
    const firstRowCells = rows[0].querySelectorAll("td");
    expect(firstRowCells.length).toBe(4);
  });

  it("renders TableOverlayLoader with custom label and spinner", () => {
    const { container } = render(
      <TableOverlayLoader label="Đang cập nhật danh sách..." />
    );
    expect(screen.getByText("Đang cập nhật danh sách...")).toBeDefined();
    const spinner = container.querySelector(".animate-spin");
    expect(spinner != null).toBe(true);
    const status = screen.getByRole("status");
    expect(status).toBeDefined();
  });

  it("renders TableContainer with overlay when isOverlayLoading is true", () => {
    render(
      <TableContainer isOverlayLoading overlayLabel="Đang lọc tài khoản...">
        <table>
          <tbody>
            <tr>
              <td>Dữ liệu cũ</td>
            </tr>
          </tbody>
        </table>
      </TableContainer>
    );
    expect(screen.getByText("Dữ liệu cũ")).toBeDefined();
    expect(screen.getByText("Đang lọc tài khoản...")).toBeDefined();
  });

  it("renders TableContainer without overlay when isOverlayLoading is false", () => {
    render(
      <TableContainer isOverlayLoading={false} overlayLabel="Đang lọc tài khoản...">
        <table>
          <tbody>
            <tr>
              <td>Dữ liệu cũ</td>
            </tr>
          </tbody>
        </table>
      </TableContainer>
    );
    expect(screen.getByText("Dữ liệu cũ")).toBeDefined();
    expect(screen.queryByText("Đang lọc tài khoản...")).toBeNull();
  });
});
