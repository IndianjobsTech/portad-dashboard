import { describe, expect, it } from "vitest";
import { friendlyAuthError } from "./auth";

describe("friendlyAuthError", () => {
  it("shows a helpful message for invalid credentials", () => {
    expect(
      friendlyAuthError({ code: "auth/invalid-credential" }),
    ).toBe("Wrong email or password.");
  });

  it("explains when an email is already registered", () => {
    expect(
      friendlyAuthError({ code: "auth/email-already-in-use" }),
    ).toBe("This email is already registered — try signing in.");
  });

  it("gives a helpful message for network failures", () => {
    expect(
      friendlyAuthError({ code: "auth/network-request-failed" }),
    ).toBe("Network error — check your connection and retry.");
  });

  it("does not expose unexpected technical error details", () => {
    expect(
      friendlyAuthError(
        new Error("Internal server error: sensitive diagnostic details"),
      ),
    ).toBe("Sign-in failed — please try again.");
  });

  it("handles unknown errors safely", () => {
    expect(friendlyAuthError(null)).toBe(
      "Sign-in failed — please try again.",
    );
  });
});