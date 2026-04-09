require("cypress-xpath");
import * as setDate from "../../../support/datePickerHelpers";

describe("Launch Application", () => {
  const ExcursionReportsHeader = "//h1[normalize-space()='Excursion Reports']";
  const ReportTypeDropdown = '[formcontrolname="type"]';
  const RoomDropdown = '[formcontrolname="room_sigle"]';
  const selectDate = 'input[placeholder="select a date"]'
  const bookingTypeDropdown = '[formcontrolname="book_type"]';
  const downloadBtn = '[class$="ant-btn ant-btn-primary ant-dropdown-trigger"]'
  const btnfile = "li.ant-dropdown-menu-item";

  beforeEach(() => {
    // Login to the application
    cy.loadWithEnvironmentConfig();
    cy.login();
    // Wait for dashboard to load
    cy.wait(3000);
    // Close popup if visible
    cy.closeNotificationPopup();
    // Navigate to Excursion Reports
    cy.selectMainMenu("Excursion Reports");
    cy.xpath(ExcursionReportsHeader).should("be.visible");
  });

  // Generate Excursion Report
  it("Generate Excursion Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Excursion Report");
    cy.selectFromNzSelectOverlayNormalized(RoomDropdown, "Toddlers");
    setDate.setDate(selectDate, '2026-01-13');
    cy.get("body").click(0, 0);
    cy.selectFromNzSelectOverlayNormalized(bookingTypeDropdown, "Booked");
    cy.get(downloadBtn).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
  });

  // Generate Excursion Authorization Form
  it("Generate Excursion Authorization Form", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Excursion Authorization Form");
    cy.selectFromNzSelectOverlayNormalized(RoomDropdown, "Toddlers");
    setDate.setDate(selectDate, '2026-01-13');
    cy.get("body").click(0, 0);
    cy.selectFromNzSelectOverlayNormalized(bookingTypeDropdown, "Booked");
    cy.get(downloadBtn).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
  });

  // Generate Excursion Report with Transport
  it("Generate Excursion Report with Transport", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Excursion Report with Transport");
    cy.selectFromNzSelectOverlayNormalized(RoomDropdown, "Toddlers");
    setDate.setDate(selectDate, '2026-01-13');
    cy.get("body").click(0, 0);
    cy.selectFromNzSelectOverlayNormalized(bookingTypeDropdown, "Booked");
    cy.get(downloadBtn).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
  });

  // Generate Excursion Report without Transport
  it("Generate Excursion Report without Transport", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Excursion Report without Transport");
    cy.selectFromNzSelectOverlayNormalized(RoomDropdown, "Toddlers");
    setDate.setDate(selectDate, '2026-01-13');
    cy.get("body").click(0, 0);
    cy.selectFromNzSelectOverlayNormalized(bookingTypeDropdown, "Booked");
    cy.get(downloadBtn).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
  });
  afterEach(() => {
    cy.logout();
  });
});
