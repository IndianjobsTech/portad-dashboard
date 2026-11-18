import { test, expect } from "@playwright/test";

test.describe("Migration wizard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/migrate");
  });

  test("shows the initial source step and prevents advancing without a selection", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "Four steps, zero surprises" }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Choose a source" }),
    ).toBeVisible();

    await expect(page.getByText("step 1 / 4")).toBeVisible();
    await expect(page.getByRole("button", { name: "Back" })).toBeDisabled();
    await expect(
      page.getByRole("button", { name: "Next", exact: true }),
    ).toBeDisabled();
  });

  test("does not allow selecting a source that is only planned", async ({
    page,
  }) => {
    await expect(page.getByRole("button", { name: /Trello/ })).toBeDisabled();

    await expect(page.getByRole("button", { name: /ClickUp/ })).toBeDisabled();

    await expect(
      page.getByRole("button", { name: /Fixtures demo/ }),
    ).toBeEnabled();
  });

  test("moves from source to target and supports back navigation", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /Fixtures demo/ }).click();
    await page.getByRole("button", { name: "Next", exact: true }).click();

    await expect(
      page.getByRole("heading", { name: "Choose a target" }),
    ).toBeVisible();
    await expect(page.getByText("step 2 / 4")).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Next", exact: true }),
    ).toBeDisabled();

    await page.getByRole("button", { name: /^Huly/ }).click();
    await page.getByRole("button", { name: "Next", exact: true }).click();

    await expect(
      page.getByRole("heading", { name: "Attach a package" }),
    ).toBeVisible();
    await expect(page.getByText("step 3 / 4")).toBeVisible();

    await page.getByRole("button", { name: "Back" }).click();

    await expect(
      page.getByRole("heading", { name: "Choose a target" }),
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Next", exact: true }),
    ).toBeEnabled();
  });

  test("requires a package before continuing to the run step", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /Fixtures demo/ }).click();
    await page.getByRole("button", { name: "Next", exact: true }).click();

    await page.getByRole("button", { name: /^Huly/ }).click();
    await page.getByRole("button", { name: "Next", exact: true }).click();

    await expect(
      page.getByRole("heading", { name: "Attach a package" }),
    ).toBeVisible();

    await expect(page.getByRole("button", { name: "Continue" })).toBeDisabled();

    await page.locator('input[type="file"]').setInputFiles({
      name: "sample.portad",
      mimeType: "application/octet-stream",
      buffer: Buffer.from("Playwright test package"),
    });
    await expect(
      page.getByText("sample.portad", { exact: true }),
    ).toBeVisible();

    await expect(page.getByRole("button", { name: "Continue" })).toBeEnabled();

    await page.getByRole("button", { name: "Continue" }).click();

    await expect(
      page.getByRole("heading", { name: "Run the migration" }),
    ).toBeVisible();
    await expect(page.getByText("step 4 / 4")).toBeVisible();
  });
  test("rejects files with unsupported extensions", async ({ page }) => {
    await page.getByRole("button", { name: /Fixtures demo/ }).click();
    await page.getByRole("button", { name: "Next", exact: true }).click();

    await page.getByRole("button", { name: /^Huly/ }).click();
    await page.getByRole("button", { name: "Next", exact: true }).click();

    await page.locator('input[type="file"]').setInputFiles({
      name: "sample.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("Invalid test file"),
    });

    await expect(page.locator('p[role="alert"]')).toHaveText(
      "✕ Invalid file type. Please upload a valid .portad or .zip package archive.",
    );

    await expect(page.getByRole("button", { name: "Continue" })).toBeDisabled();
  });
  test("keeps hosted migration disabled", async ({ page }) => {
    await page.getByRole("button", { name: /Fixtures demo/ }).click();
    await page.getByRole("button", { name: "Next", exact: true }).click();

    await page.getByRole("button", { name: /^Huly/ }).click();
    await page.getByRole("button", { name: "Next", exact: true }).click();

    await page.locator('input[type="file"]').setInputFiles({
      name: "sample.portad",
      mimeType: "application/octet-stream",
      buffer: Buffer.from("Playwright test package"),
    });

    await page.getByRole("button", { name: "Continue" }).click();

    await expect(
      page.getByRole("heading", { name: "Run the migration" }),
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Run hosted migration" }),
    ).toBeDisabled();

    await expect(
      page.getByText(/Hosted execution not enabled yet/),
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Next", exact: true }),
    ).toBeDisabled();
  });
});
