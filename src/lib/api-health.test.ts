import { describe, expect, it } from "vitest";
import { friendlyApiError } from "./api-health";

describe("friendlyApiError", () => {
  it("returns a clear message when the API is unavailable", () => {
    expect(friendlyApiError()).toBe(
      "The API is temporarily unavailable. Please try again later.",
    );
  });

  it("does not expose technical error details", () => {
    const message = friendlyApiError();

    expect(message).not.toContain("HTTP 500");
    expect(message).not.toContain("ECONNREFUSED");
    expect(message).not.toContain("Internal server error");
  });
});