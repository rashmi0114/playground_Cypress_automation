require("cypress-xpath");

describe("Launch Application", () => {
  const DigitalHubChecklistReportsHeader = "//h1[normalize-space()='Digital Hub Checklist Reports']";
  const ReportTypeDropdown = '[formcontrolname="type"]';
  const filterByDropdown = '[formcontrolname="filterBy"]';
  const btnDownload = '[class$="ant-btn ant-btn-primary"]';
  const sortByButton = '[formcontrolname="sortby_toggle"]'

  beforeEach(() => {
    // Login to the application
    cy.loadWithEnvironmentConfig();
    cy.login();
    // Wait for dashboard to load
    cy.wait(3000);
    // Close popup if visible
    cy.closeNotificationPopup();
    // Navigate to Digital Hub Checklist Reports
    cy.selectMainMenu("Digital Hub Checklist");
    cy.xpath(DigitalHubChecklistReportsHeader).should("be.visible");
  });

  // Generate Digital Hub Checklist Report
  it("Generate Digital Hub Checklist Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Digital Hub Checklist Report");
    cy.selectFromNzSelectOverlayNormalized(filterByDropdown, "Child");
    cy.clickFieldAction("Child", "Select All");
    cy.get(sortByButton).within(() => {
      cy.contains("Child first name").click({ force: true });
      cy.wait(1000);
    });
    cy.enableToggles("parent_consents_only");
    cy.get(btnDownload).click({ force: true });
  });

  afterEach(() => {
    cy.logout();
  });
});
