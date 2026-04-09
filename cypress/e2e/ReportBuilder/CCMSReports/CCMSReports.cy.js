require("cypress-xpath");

import * as selectPastDate from "../../support/datePickerHelpers";
import * as setDate from "../../../support/datePickerHelpers";
import * as selectpastweek from "../../../support/datePickerHelpers";
import * as selectFutureWeek from "../../../support/datePickerSelectors";

describe("Launch Application", () => {
  const CCMSReportsHeader = "//h1[normalize-space()='CCMS Reports']"; 
  const enrolmentTypeDropdown = '[formcontrolname="enrolment_type"]';
  const enrolmentstatusDropdown = '[formcontrolname="enrolment_status"]';
  const createdDate = '[formcontrolname="created_date_start"]'
  const createdDateEnd = '[formcontrolname="created_date_end"]'
  const enrolmentstartDate = '[formcontrolname="enrolment_date_start"]'
  const enrolmentendDate = '[formcontrolname="enrolment_date_end"]'
  const ReportTypeDropdown = '[formcontrolname="type"]';
  const btnDownload =
    '[class$="ant-btn ant-dropdown-trigger"]';
  const ViewButton = '[class$="ant-btn ant-btn-primary"]';
  const btnfile = "li.ant-dropdown-menu-item";

  beforeEach(() => {
    // Login to the application
    cy.loadWithEnvironmentConfig();
    cy.login();
    // Wait for dashboard to load
    cy.wait(3000);
    // Close popup if visible
    cy.closeNotificationPopup();
    // Navigate to CCMS Reports
    cy.selectMainMenu("CCS/CCMS Reports");
    cy.xpath(CCMSReportsHeader).should("be.visible");
  });

  // Generate CCS enrolment Report 
  it.only("Generate CCS Enrolment Report ", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "CCS Enrolment Report");
    cy.clickFieldAction("Room", "Select All");
    cy.selectFromNzSelectOverlayNormalized(enrolmentTypeDropdown, "Complying Written Arrangements (CCS)");
    cy.selectFromNzSelectOverlayNormalized(enrolmentstatusDropdown, "Approved");
    cy.get(createdDate).eq(0).click();
    selectPastDate.selectPastDate(10);
    cy.get(createdDateEnd).eq(0).click();
    selectPastDate.selectPastDate(0);
    setDate.setDate(enrolmentstartDate, '2026-01-01');
    cy.get("body").click(0, 0);
    setDate.setDate(enrolmentendDate, '2026-01-31');
    cy.get("body").click(0, 0);
    cy.enableToggles("status_toggle");
     cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  // Generate Child Absent Report
  it("Generate Child Absent Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Child Absent Report");
    cy.clickFieldAction("Room", "Select All");
    setDate.setDate(enrolmentstartDate, '2026-01-01');
    cy.get("body").click(0, 0);
    setDate.setDate(enrolmentendDate, '2026-01-31');
    cy.get("body").click(0, 0);
    cy.enableToggles("only_absent");
    cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  // Generate Fortnight CCS Utilisation
  it("Generate Fortnight CCS Utilisation", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Fortnight CCS Utilisation");
    cy.clickFieldAction("Room", "Select All");
    selectpastweek.selectPastWeek(0);
    selectFutureWeek.selectFutureWeek(14);
    setDate.setDate(enrolmentstartDate, '2026-01-01');
    cy.get("body").click(0, 0);
    setDate.setDate(enrolmentendDate, '2026-01-31');
    cy.get("body").click(0, 0);
    cy.enableToggles("status_toggle");
    cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  // Logout after each test
  afterEach(() => {
    cy.logout();
  });
});
