require("cypress-xpath");

describe("Launch Application", () => {
  const MedicalReportsHeader = "//h1[normalize-space()='Immunisation Reports']";
  const ReportTypeDropdown = '[formcontrolname="type"]';
  const btnDownload = '[class$="ant-btn ant-btn-primary ng-star-inserted"]'
  const scheuleDropdown = '[formcontrolname="schedule"]'; 
  const viewButton = '[class="anticon anticon-file-pdf"]'

  beforeEach(() => {
    // Login to the application
    cy.loadWithEnvironmentConfig();
    cy.login();
    // Wait for dashboard to load
    cy.wait(3000);
    // Close popup if visible
    cy.closeNotificationPopup();
    // Navigate to Medical Reports
    cy.selectMainMenu("Medical Reports");
    cy.xpath(MedicalReportsHeader).should("be.visible");
  });

  // Generate Child Immunisation Record
  it("Generate Child Immunisation Record", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Child Immunisation Record");
    cy.clickFieldAction("Immunisation", "Select All");
    cy.clickFieldAction("Room", "Select All");
    cy.clickFieldAction("child", "Select All");
    cy.enableToggles("inactive_children");
    cy.get(btnDownload).click({ force: true });
  });

  // Generate Child Immunisation Matrix
  it("Generate Child Immunisation Matrix", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Child Immunisation Matrix");
    cy.clickFieldAction("Immunisation", "Select All");
    cy.clickFieldAction("Room", "Select All");
    cy.selectFromNzSelectOverlayNormalized(scheuleDropdown, "10 Month(s)");
    cy.enableToggles("inactive_children");
    cy.wait(1000);
    cy.clickFieldAction("child", "Select All");
    cy.get(viewButton).eq(0).click({ force: true });
    cy.get(btnDownload).eq(1).click({ force: true });

  });

  
  afterEach(() => {
    cy.logout();
  });
});
