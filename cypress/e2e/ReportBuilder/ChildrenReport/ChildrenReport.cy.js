require("cypress-xpath");
import * as setDate from "../../../support/datePickerHelpers";

describe("Launch Application", () => {
  const childrenReportsHeader = "//h1[normalize-space()='Children Report']";
  const ReportTypeDropdown = '[nzplaceholder="Select a report type"]';
  const startDate = 'input[placeholder="Start date"]';
  const endDate = 'input[placeholder="End date"]';
  const ageCalculationDate = 'input[placeholder="Age Calculation date"]';
  const ViewButton ='[class="anticon anticon-eye"]';
  const btnDownload = '[class$="ant-btn ant-dropdown-trigger"]';
  const btnfile = "li.ant-dropdown-menu-item";
  const statusdropdown = '[formcontrolname="status"]'

  beforeEach(() => {
    // Login to the application
    cy.loadWithEnvironmentConfig();
    cy.login();
    // Wait for dashboard to load
    cy.wait(3000);
    // Close popup if visible
    cy.closeNotificationPopup();
    // Navigate to Children Report
    cy.selectMainMenu("Children Report");
    cy.xpath(childrenReportsHeader).should("be.visible");
  });

  // Generate Child Ages at Date Report
  it("Generate Child Ages at Date Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Child Ages at Date Report");
    cy.clickFieldAction("Room", "Select All");
    cy.clickFieldAction("Child", "Select All");
    setDate.setDate(ageCalculationDate, "2026-02-15");
     cy.get("body").click(0, 0);
    setDate.setDate(startDate, "2026-01-01");
     cy.get("body").click(0, 0);
    setDate.setDate(endDate, "2026-02-28");
     cy.get("body").click(0, 0);
    cy.setRadioOption('nz-radio-group[formcontrolname="sortby_toggle"]', 'Ascending order');
    cy.enableToggles("status_toggle");
    cy.wait(2000);
    cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();  
  });

  // Generate Child Birthdays from Date Report
  it("Generate Child Birthdays from Date Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Child Birthdays from Date Report");
    setDate.setDate(startDate, "2026-01-01");
     cy.get("body").click(0, 0);
    setDate.setDate(endDate, "2026-02-28");
     cy.get("body").click(0, 0);
     cy.clickFieldAction("Room", "Select All");
    cy.clickFieldAction("Child", "Select All");
    setDate.setDate(ageCalculationDate, "2026-02-15");
     cy.get("body").click(0, 0);
     cy.setRadioOption('nz-radio-group[formcontrolname="sortby_toggle"]', 'Ascending order');
    cy.enableToggles("status_toggle");
    cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  // Generate Child Consent Report
  it("Generate Child Consent Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown,"Child Consent Report");
    cy.clickFieldAction("Room", "Select All");
    cy.clickFieldAction("Child", "Select All");
    cy.enableToggles("status_toggle");
    cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("XLSX").click();
  });

  // Generate Child Exit Report
  it("Generate Child Exit Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Child Exit Report");
    setDate.setDate(startDate, "2026-01-01");
     cy.get("body").click(0, 0);
    setDate.setDate(endDate, "2026-02-28");
     cy.get("body").click(0, 0);
     cy.clickFieldAction("Room", "Select All");
     cy.selectFromNzSelectOverlayNormalized(statusdropdown, "All");
     cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click(); 
  });

  // Generate Child Media Permissions Report
  it("Generate Child Media Permissions Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Child Media Permissions Report");
    cy.clickFieldAction("Room", "Select All");
    cy.clickFieldAction("Child", "Select All");
    cy.enableToggles("status_toggle");
    cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("XLSX").click();
  });

  afterEach(() => {
    cy.logout();
  });
});
