require("cypress-xpath");
import * as selectDateRangePicker from "../../../support/datePickerHelpers";

describe("Launch Application", () => {
  const contactReportsHeader = "//h1[normalize-space()='Contact Reports']";
  const ReportTypeDropdown = '[formcontrolname="type"]';
  const filterByDropdown = '[formcontrolname="filterBy"]';
  const ViewButton =
    '[class$="ant-btn ant-btn-primary"]';
  const btnDownload = '[class$="ant-btn ant-btn-primary ant-dropdown-trigger"]';
  const btnfile = "li.ant-dropdown-menu-item";

  beforeEach(() => {
    // Login to the application
    cy.loadWithEnvironmentConfig();
    cy.login();
    // Wait for dashboard to load
    cy.wait(3000);
    // Close popup if visible
    cy.closeNotificationPopup();
    // Navigate to Contact Reports
    cy.selectMainMenu("Contact Reports");
    cy.xpath(contactReportsHeader).should("be.visible");
  });

  // Generate Educator Qualifications Report
  it("Generate Educator Qualifications Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Educator Qualifications Report");
    cy.clickFieldAction("Select Fields", "Select All");
    cy.selectFromNzSelectOverlayNormalized(filterByDropdown, "Child");
    cy.clickFieldAction("Child", "Select All");
    cy.enableToggles("status_toggle");
    selectDateRangePicker.setNzRangePicker('nz-range-picker[formcontrolname="dater"]',"2026-01-01","2026-02-28");
    cy.wait(2000);
    cy.get(ViewButton).eq(0).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("Xls").click();
  });

  // Generate Educator Details Report
  it("Generate Educator Details Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Educator Details Report");
    cy.clickFieldAction("Select Fields", "Select All");
    cy.selectFromNzSelectOverlayNormalized(filterByDropdown, "Room");
    cy.clickFieldAction("Room", "Select All");
    cy.enableToggles("status_toggle");
    selectDateRangePicker.setNzRangePicker('nz-range-picker[formcontrolname="dater"]',"2026-01-01","2026-02-28");
    cy.wait(2000);
    cy.get(ViewButton).eq(0).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("Xls").click();
    
  });

  // Generate Child Emergency Contacts Report
  it("Generate Child Emergency Contacts Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown,"Child Emergency Contacts Report");
    cy.clickFieldAction("Select Fields", "Select All");
    cy.selectFromNzSelectOverlayNormalized(filterByDropdown, "Child");
    cy.clickFieldAction("Child", "Select All");
    cy.enableToggles("status_toggle");
    selectDateRangePicker.setNzRangePicker('nz-range-picker[formcontrolname="dater"]',"2026-01-01","2026-02-28");
    cy.wait(2000);
    cy.get(ViewButton).eq(0).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("Xls").click();
    
  });

  // Generate Parent & Child Details Report
  it("Generate Parent & Child Details Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Parent & Child Details Report");
    cy.clickFieldAction("Select Fields", "Select All");
    cy.selectFromNzSelectOverlayNormalized(filterByDropdown, "Child");
    cy.clickFieldAction("Child", "Select All");
    cy.enableToggles("status_toggle");
    selectDateRangePicker.setNzRangePicker('nz-range-picker[formcontrolname="dater"]',"2026-01-01","2026-02-28");
    cy.wait(2000);
    cy.get(ViewButton).eq(0).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("Xls").click();
    
  });

  // Generate Medicare Report
  it("Generate Medicare Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Medicare Report");
    cy.clickFieldAction("Select Fields", "Select All");
    cy.selectFromNzSelectOverlayNormalized(filterByDropdown, "Child");
    cy.clickFieldAction("Child", "Select All");
    cy.enableToggles("status_toggle");
    selectDateRangePicker.setNzRangePicker('nz-range-picker[formcontrolname="dater"]',"2026-01-01","2026-02-28");
    cy.wait(2000);
    cy.get(ViewButton).eq(0).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("Xls").click();
  });

  // Generate Child Contact Report
  it("Generate Child Contact Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Child Contact Report");
    cy.clickFieldAction("Select Fields", "Select All");
    cy.selectFromNzSelectOverlayNormalized(filterByDropdown, "Child");
    cy.clickFieldAction("Child", "Select All");
    cy.enableToggles(["status_toggle","include_type"]);
    selectDateRangePicker.setNzRangePicker('nz-range-picker[formcontrolname="dater"]',"2026-01-01","2026-02-28");
    cy.wait(2000);
    cy.get(ViewButton).eq(0).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("Xls").click();
  });

  // Generate Primary Payer Report
  it("Generate Primary Payer Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Primary Payer Report");
    cy.selectFromNzSelectOverlayNormalized(filterByDropdown, "Child");
    cy.clickFieldAction("Child", "Select All");
    cy.enableToggles("status_toggle");
    selectDateRangePicker.setNzRangePicker('nz-range-picker[formcontrolname="dater"]',"2026-01-01","2026-02-28");
    cy.wait(5000);
    cy.get(ViewButton).eq(0).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("Xls").click();
  });

  afterEach(() => {
    cy.logout();
  });
});
