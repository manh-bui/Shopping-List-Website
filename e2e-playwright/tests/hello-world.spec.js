import * as enumeration from "../enumeration.js";
const { test, expect } = require("@playwright/test");

test("Server responds with the title 'Shared shopping lists'", async ({ page }) => {
  await page.goto(enumeration.rootpath);
  await expect(page.locator("h2")).toHaveText("Page Statistics");
});

test("ShoppingLists page get accurate format", async ({ page }) => {
  await page.goto("/");
  await page.locator("input[type=text]").type("New Lists 1");
  await page.locator("input[type=submits]").click();
  await expect(page.locator("a")).toHaveText("New List 1");
});
