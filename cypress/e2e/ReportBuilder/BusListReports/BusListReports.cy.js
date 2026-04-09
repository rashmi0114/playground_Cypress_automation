require("cypress-xpath");

import * as selectpastweek from "../../../support/datePickerHelpers";

describe("Launch Application", () => {
  const busListReportsHeader =
    "//h1[normalize-space()='Bus List Reports']";
  const weekPickerInput =
    'nz-week-picker[formcontrolname="calendarWeek"] input[placeholder="select week"]';
  const datePickerInput =
    'nz-date-picker[formcontrolname="calendarWeek"] input[placeholder="select day"]';
  const ReportTypeDropdown = '[formcontrolname="type"]';
  const busDropdown = '[formcontrolname="bus"]';
  const bookingTypeDropdown = '[formcontrolname="bookingType"]';
  const btnDownload =
    '[class$="ant-btn ant-btn-primary ant-dropdown-trigger"]';
  const btnfile = "li.ant-dropdown-menu-item";

  beforeEach(() => {
    // Login to the application
    cy.loadWithEnvironmentConfig();
    cy.login();
    // Wait for dashboard to load
    cy.wait(3000);
    // Close popup if visible
    cy.closeNotificationPopup();
    // Navigate to Bus List Reports
    cy.selectMainMenu("Bus List Reports");
    cy.xpath(busListReportsHeader).should("be.visible");
  });

  // Generate Bus List Report (Weekly)
  it("Generate Bus List Report (Weekly)", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Bus List Report (Weekly)", 0);
    cy.clickFieldAction("Room", "Select All");
    cy.selectFromNzSelectOverlayNormalized(busDropdown, "Kinder SP prod");
    cy.get(weekPickerInput).click({ force: true });
    selectpastweek.selectPastWeek(0);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
  });

  // Generate Bus List Report (Daily)
  it("Generate Bus List Report (Daily)", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Bus List Report (Daily)", 0);
    cy.clickFieldAction("Room", "Select All");
    cy.selectFromNzSelectOverlayNormalized(busDropdown, "Kinder SP prod");
    cy.get(datePickerInput).click({ force: true });
    selectpastweek.selectPastWeek(0);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();

  });

  // Generate Daily Bus List with Security Clearance Report
  it("Generate Daily Bus List with Security Clearance Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Daily Bus List with Security Clearance Report");
    cy.clickFieldAction("Room", "Select All");
    cy.selectFromNzSelectOverlayNormalized(busDropdown, "Kinder SP prod");
    cy.get(datePickerInput).click({ force: true });
    selectpastweek.selectPastWeek(0);
    cy.selectFromNzSelectOverlayNormalized(bookingTypeDropdown, "Booked");
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
  });

  // Generate Home Bus List Report (Weekly)
  it("Generate Home Bus List Report (Weekly)", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Home Bus List Report (Weekly)");
    cy.clickFieldAction("Room", "Select All");
    cy.selectFromNzSelectOverlayNormalized(busDropdown, "Kinder SP prod");
    cy.get(weekPickerInput).click({ force: true });
    selectpastweek.selectPastWeek(0);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
  });

  // Generate Home Bus List Report (Daily)
  it("Generate Home Bus List Report (Daily)", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Home Bus List Report (Daily)");
     cy.clickFieldAction("Room", "Select All");
    cy.selectFromNzSelectOverlayNormalized(busDropdown, "Kinder SP prod");
    cy.get(datePickerInput).click({ force: true });
    selectpastweek.selectPastWeek(0);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
  });

  afterEach(() => {
    cy.logout();
  });
});
