require("cypress-xpath");

describe("Launch Application", () => {
  const HeadCountReportsHeader = "//h1[normalize-space()='Head Count Report']";
  const searchbar = '[placeholder="Search ..."]'
  const actiobBtn = '[class$="ant-btn ant-btn-link ant-btn-lg ant-btn-icon-only"]' 
  const btnViewReport = '[class="eye icon primary-color"]'
  const btnDownload = '[class="download icon primary-color"]'
  const btnFilter = '[class="filter icon"]'
   const startDate = '[formcontrolname="start_date"]';
  const endDate = '[formcontrolname="end_date"]';
  const FilterButton = '[class="filter icon mr-8"]'

  beforeEach(() => {
    // Login to the application
    cy.loadWithEnvironmentConfig();
    cy.login();
    // Wait for dashboard to load
    cy.wait(3000);
    // Close popup if visible
    cy.closeNotificationPopup();
    // Navigate to Head Count Reports
    cy.selectMainMenu("Head Count Reports");
    cy.xpath(HeadCountReportsHeader).should("be.visible");
  });

  // View and Download Head Count Report
  it("View and Download Head Count Report", () => {
    cy.window().then((win) => {
      cy.stub(win, "open")
        .callsFake((url) => {
          return win.open.wrappedMethod.call(win, url, "_self");
        })
        .as("openStub");
    });
    cy.get(searchbar).type("Melly{enter}");
    cy.wait(1000);
    cy.get(actiobBtn).eq(0).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(actiobBtn).eq(0).click({ force: true });
    cy.get(btnViewReport).click({ force: true });
    // Assert window.open was triggered
    cy.get("@openStub").should("have.been.called");
    // Assert PDF viewer blob URL loaded in same tab
    cy.url().should((url) => {
      expect(url).to.satisfy((u) => u.includes("blob") || u.includes("pdf"));
    });
    cy.go("back");
  });

  // Filter Head Count Report with date range
  it("Filter Head Count Report with date range", () => {
    cy.get(btnFilter).click({ force: true });
    cy.get(startDate).click();
    cy.selectPastDate(10);
    cy.get(endDate).click();
    cy.selectFutureDate(10);
    cy.get(FilterButton).click({ force: true });
  });
  
  afterEach(() => {
    cy.logout();
  });
});
