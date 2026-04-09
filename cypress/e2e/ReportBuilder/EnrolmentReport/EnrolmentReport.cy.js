require("cypress-xpath");
import * as selectDateRangePicker from "../../../support/datePickerHelpers";
describe("Launch Application", () => {
  const EnrolmentReportHeader = "//h1[normalize-space()='Enrolments Reports']";
  const ReportTypeDropdown = '[nzplaceholder="Select a report type"]';
  const downloadBtn = '[class$="ant-btn ant-dropdown-trigger"]'
  const btnfile = "li.ant-dropdown-menu-item";
  const dateByDropdown = '[formcontrolname="dateType"]'
  const filterByDropdown = '[formcontrolname="type"]';
  const SortByDate = 'nz-radio-group[formcontrolname="sortby_toggle_sortby"]'
  const ViewButton ='[class="anticon anticon-eye"]';
  const dateRangePicker = 'nz-range-picker[formcontrolname="start_date"]'

  beforeEach(() => {
    // Login to the application
    cy.loadWithEnvironmentConfig();
    cy.login();
    // Wait for dashboard to load
    cy.wait(3000);
    // Close popup if visible
    cy.closeNotificationPopup();
    // Navigate to Enrolment Report
    cy.selectMainMenu("Enrolment Report");
    cy.xpath(EnrolmentReportHeader).should("be.visible");
  });

  // Generate New Enrolments Report
  it("Generate New Enrolments Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "New Enrolments Report");
    cy.selectFromNzSelectOverlayNormalized(dateByDropdown, "Enrolment Date");
    cy.selectFromNzSelectOverlayNormalized(filterByDropdown, "Date Range");
    cy.clickFieldAction("Room", "Select All");
    selectDateRangePicker.setNzRangePicker(dateRangePicker,"2026-01-01","2026-02-28");
    cy.enableToggles("status_toggle");
    cy.setRadioOption(SortByDate, 'Ascending order');
    cy.get(ViewButton).click({ force: true });
    cy.get(downloadBtn).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(downloadBtn).click({ force: true });
    cy.get(btnfile).contains("CSV").click();  
  });

  afterEach(() => {
    cy.logout();
  });
});
