require("cypress-xpath");
import * as selectpastweek from "../../../support/datePickerHelpers";
import * as pastDate from "../../../support/datePickerHelpers";
import * as selectToday from "../../../support/datePickerHelpers";

describe("Launch Application", () => {
  const attendanceReportsHeader =
    "//h1[normalize-space()='Attendance Reports']";
  const weekPickerInput =
    'nz-week-picker[formcontrolname="week"] input[placeholder="select week"]';
  const ReportTypeDropdown = '[formcontrolname="type"]';
  const ChildDropdown = 'nz-select[formcontrolname="child_sigle"]';
  const RoomDropdown = 'nz-select[formcontrolname="room_sigle"]';
  const filterByDropdown = '[formcontrolname="filterBy"]';
  const ViewButton =
    '[class$="ng-trigger ng-trigger-fadeMotion ant-btn ant-btn-primary ng-star-inserted"]';
  const btnDownload =
    '[class$="ant-btn ant-btn-primary ant-dropdown-trigger ng-star-inserted"]';
  const btnfile = "li.ant-dropdown-menu-item";
  const endDateInput = 'nz-date-picker[nzplaceholder="select a end date"] input'
  const startDateInput = 'nz-date-picker[nzplaceholder="select a start date"] input'

  beforeEach(() => {
    // Login to the application
    cy.loadWithEnvironmentConfig();
    cy.login();
    // Wait for dashboard to load
    cy.wait(3000);
    // Close popup if visible
    cy.closeNotificationPopup();
    // Navigate to Attendance Reports
    cy.selectMainMenu("Attendance Reports");
    cy.xpath(attendanceReportsHeader).should("be.visible");
  });

  // Generate Weekly Roll Report
  it("Generate Weekly Roll Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Weekly Roll Report");
    cy.get(weekPickerInput).click({ force: true });
    selectpastweek.selectPastWeek(0);
    cy.selectFromNzSelectOverlayNormalized(ChildDropdown, "Andrew Child");
    cy.selectFromNzSelectOverlayNormalized(RoomDropdown, "All");
    cy.enableToggles(["session_time", "absence_toggle"]);
    cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  // Generate Roll Book Report
  it("Generate Roll Book Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Roll Book Report");
    cy.clickFieldAction("Select Fields", "Select All");
    cy.selectFromNzSelectOverlayNormalized(filterByDropdown, "Child");
    cy.clickFieldAction("Child", "Select All");
    cy.get(startDateInput).click({force: true,});
    pastDate.selectPastDate(7);
    cy.get("body").click(0, 0);
    cy.get(endDateInput).click({force: true,});
    selectToday.selectToday();
     cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  // Generate Occupancy Utilisation Report
  it("Generate Occupancy Utilisation Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Occupancy Utilisation Report");
    cy.clickFieldAction("Select Fields", "Select All");
    cy.selectFromNzSelectOverlayNormalized(filterByDropdown, "Child");
    cy.clickFieldAction("Child", "Select All");
    cy.get(startDateInput).click({force: true,});
    pastDate.selectPastDate(7);
    cy.get("body").click(0, 0);
    cy.get(endDateInput).click({force: true,});
    selectToday.selectToday();
     cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  // Generate Attendance Summary Report
  it("Generate Attendance Summary Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Attendance Summary Report");
    cy.clickFieldAction("Select Fields", "Select All");
    cy.selectFromNzSelectOverlayNormalized(filterByDropdown, "Child");
    cy.clickFieldAction("Child", "Select All");
    cy.get(startDateInput).click({force: true,});
    pastDate.selectPastDate(7);
    cy.get("body").click(0, 0);
    cy.get(endDateInput).click({force: true,});
    selectToday.selectToday();
     cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  // Generate Weekly Utilisation Summary Report
  it("Generate Weekly Utilisation Summary Report", () => {
    cy.wait(2000);
    cy.selectFromNzSelect(ReportTypeDropdown, "Weekly Utilisation Summary");
     cy.get(startDateInput).click({force: true,});
    pastDate.selectPastDate(7);
    cy.get("body").click(0, 0);
    cy.get(endDateInput).click({force: true,});
    selectToday.selectToday();
    cy.enableToggles("absence_toggle");
    cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  // Generate Monthly Utilisation Summary Report
  it("Generate Monthly Utilisation Summary Report", () => {
    cy.wait(2000);
    cy.selectFromNzSelect(ReportTypeDropdown, "Monthly Utilisation Summary");
    cy.get(startDateInput).click({force: true,});
    pastDate.selectPastDate(7);
    cy.get("body").click(0, 0);
    cy.get(endDateInput).click({force: true,});
    selectToday.selectToday();
    cy.enableToggles(["absence_toggle","show_rooms_mus_toggle"]);
    cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  afterEach(() => {
    cy.logout();
  });
});
