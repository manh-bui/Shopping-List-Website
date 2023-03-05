const { test, expect } = require("@playwright/test");

test("Main Page got accurate format", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("First Project");
  await expect(page.locator("h1")).toHaveText("Shared shopping lists");
  await expect(page.locator("h2")).toHaveText("Page Statistics");
});

test("ShoppingLists page got accurate format", async ({ page }) => {
  await page.goto("/lists");
  await expect(page).toHaveTitle("First Project");
  await expect(page.locator("h1")).toHaveText("Lists");
  await expect(page.locator("h2")).toHaveText(["Add a list", "Active lists"]);
});

test("ShoppingLists page create task accuratey", async ({ page }) => {
  await page.goto("/lists");
  const listName = `List number: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByText("Create list!").click();
  await expect(page.getByTitle("name")).toHaveText(listName);
});

test("Can open an individual list page.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `List number: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByText("Create list!").click();
  await page.locator(`a >> text='${listName}'`).click();
  await expect(page.locator("h1")).toHaveText(listName);
});

test("Can add item in an individual list page.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `List number: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByText("Create list!").click();
  await page.locator(`a >> text='${listName}'`).click();
  const itemName = `Item number: ${Math.random()}`;
  await page.locator("input[type=text]").type(itemName);
  await page.getByText("Add item to the list").click();
  await expect(page.getByTitle("name")).toHaveText(itemName);
});
