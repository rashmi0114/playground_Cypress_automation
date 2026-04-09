require("cypress-xpath");
import * as setDate from "../../../support/datePickerHelpers";
import * as selectMonth from "../../../support/datePickerHelpers";

describe("Launch Application", () => {
  const FinanceReportsHeader = "//h1[normalize-space()='Finance Reports']";
  const ReportTypeDropdown = '[nzplaceholder="Select a report type"]';
  const btnDownload = '[class$="ant-btn ant-dropdown-trigger"]';
  const selectDate = 'input[placeholder="End date"]';
  const ViewButton = '[class$="ant-btn ant-btn-primary"]';
  const btnfile = "li.ant-dropdown-menu-item";
  const generatedByDropdown = '[formcontrolname="date_type"]'
  const startDate = 'input[placeholder="Start date"]';
  const endDate = 'input[placeholder="End date"]';
  const dropdownDateType = '[formcontrolname="date_type"]';
  const dateTypeDropdown = '[formcontrolname="dateType"]';
  const filterByDropdown = '[formcontrolname="filterBy"]';
  const autoCreditDebitStatusDropdown = '[formcontrolname="auto_charge"]'
  const dropdownTypeOfAdjustment = '[formcontrolname="typeOfAdjustment"]'
  const roomDropdown = '[formcontrolname="room"]';
  const financialDiscountDropdown = '[formcontrolname="finance_discount"]'
  const SelectMonth = '[formcontrolname="edate"]';
  const dropdownFrequncy = '[formcontrolname="frequency"]'
  const btnGetReport = '[class="anticon anticon-eye"]';
  const transactionType = '[formcontrolname="transaction_type"]';

  beforeEach(() => {
    // Login to the application
    cy.loadWithEnvironmentConfig();
    cy.login();
    // Wait for dashboard to load
    cy.wait(3000);
    // Close popup if visible
    cy.closeNotificationPopup();
    // Navigate to Financial Reports
    cy.selectMainMenu("Financial Reports");
    cy.xpath(FinanceReportsHeader).should("be.visible");
  });

  // Generate Account Balance Report
  it("Generate Account Balance Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Account Balance Report");
    cy.clickFieldAction("Parents", "Select All");
    setDate.setDate(selectDate, '2026-01-07');
    cy.get("body").click(0, 0);
    cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  // Generate Aged Debtors Report
  it("Generate Aged Debtors Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Aged Debtors Report");
    cy.clickFieldAction("Parents", "Select All");
    setDate.setDate(selectDate, '2026-01-07');
    cy.get("body").click(0, 0);
    cy.selectFromNzSelectOverlayNormalized(generatedByDropdown, "Payment Date");
    cy.setCheckbox('Include In-Credit', true); 
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  // Generate Banking Summary Report
  it("Generate Banking Summary Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Banking Summary Report");
    setDate.setDate(startDate, '2026-01-01');
    cy.get("body").click(0, 0);
    setDate.setDate(endDate, '2026-01-10');
    cy.get("body").click(0, 0);
    cy.clickFieldAction("Parents", "Select All");
    cy.selectFromNzSelectOverlayNormalized(dropdownDateType, "Payment Date");
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  // Generate Bond Report
  it("Generate Bond Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Bond Report");
    cy.selectFromNzSelectOverlayNormalized(filterByDropdown, "Parent");
    cy.clickFieldAction("Parents", "Select All");
    cy.selectFromNzSelectOverlayNormalized(dateTypeDropdown, "Single Date");
    cy.enableToggles(["status_toggle", "comment_toggle"]);
    setDate.setDate(endDate, '2026-01-10');
    cy.get("body").click(0, 0);
    cy.selectFromNzSelectOverlayNormalized(autoCreditDebitStatusDropdown, "All");
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  // Generate Discount Report
  it("Generate Discount Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Discount Report");
    setDate.setDate(startDate, '2026-01-01');
    cy.get("body").click(0, 0);
    setDate.setDate(endDate, '2026-01-10');
    cy.get("body").click(0, 0);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  // Generate Financial Adjustments
  it("Generate Financial Adjustments", () => {
    cy.window().then((win) => {
      cy.stub(win, "open")
        .callsFake((url) => {
          return win.open.wrappedMethod.call(win, url, "_self");
        })
        .as("openStub");
    });
    cy.selectFromNzSelect(ReportTypeDropdown, "Financial Adjustments");
    setDate.setDate(startDate, '2026-01-01');
    cy.get("body").click(0, 0);
    setDate.setDate(endDate, '2026-01-10');
    cy.get("body").click(0, 0);
    cy.selectFromNzSelectOverlayNormalized(dropdownTypeOfAdjustment, "All");
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
     cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
     // Assert window.open was triggered
    cy.get("@openStub").should("have.been.called");
    // Assert PDF viewer blob URL loaded in same tab
    cy.url().should((url) => {
      expect(url).to.satisfy((u) => u.includes("blob") || u.includes("PDF"));
    });
    cy.go("back");
    cy.wait(1000);
  });

 // Generate Gap Fee Detail Report
  it("Generate Gap Fee Detail Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Gap Fee Detail Report");
    setDate.setDate(startDate, '2026-01-01');
    cy.get("body").click(0, 0);
    setDate.setDate(endDate, '2026-01-10');
    cy.get("body").click(0, 0);
    cy.selectFromNzSelectOverlayNormalized(roomDropdown, "Toddlers");
    cy.clickFieldAction("Children", "Select All");
    cy.enableToggles("status_toggle");
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  // Generate Gap Fee Report
  it("Generate Gap Fee Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Gap Fee Report");
    setDate.setDate(startDate, '2026-01-05');
    cy.get("body").click(0, 0);
    setDate.setDate(endDate, '2026-01-25');
    cy.get("body").click(0, 0);
    cy.clickFieldAction("Parents", "Select All");
    cy.get(financialDiscountDropdown).type("Start");
    cy.selectFromScrollableDropdown("Start Strong Funding");
    cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

   // Generate Income Summary Report
  it("Generate Income Summary Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Income Summary Report");
    setDate.setDate(startDate, '2026-01-01');
    cy.get("body").click(0, 0);
    setDate.setDate(endDate, '2026-01-31');
    cy.get("body").click(0, 0);
    cy.clickFieldAction("Parents", "Select All");
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

// Generate Month End Report
  it("Generate Month End Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Month End Report");
    cy.get(SelectMonth).find('input').click({ force: true });
    selectMonth.selectAntMonth('Jan');
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  //generate Opening Balance Report
  it("Generate Opening Balance Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Opening Balance Report");
    setDate.setDate(startDate, '2026-01-01');
    cy.get("body").click(0, 0);
    setDate.setDate(endDate, '2026-01-31');
    cy.get("body").click(0, 0);
    cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  //generatePayment Report
  it("Generate Payment Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Payment Report");
    setDate.setDate(startDate, '2026-01-01');  
    cy.get("body").click(0, 0);
    setDate.setDate(endDate, '2026-01-31');
    cy.get("body").click(0, 0);
    cy.enableToggles("status_toggle");
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  //Payment Schedule Report
  it("Generate Payment Schedule Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Payment Schedule Report");
    cy.selectFromNzSelectOverlayNormalized(dropdownFrequncy, "All");
    setDate.setDate(startDate, '2026-01-01');  
    cy.get("body").click(0, 0);
    setDate.setDate(endDate, '2026-01-31');
    cy.get("body").click(0, 0);
    cy.setCheckbox('fixed_amount', true, { by: 'formcontrolname' });
    cy.setCheckbox('amount_limit', true, { by: 'formcontrolname' });
    cy.enableToggles("status_toggle");
    cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  //Projected Weekly Revenue Summary Report
  it("Generate Projected Weekly Revenue Summary Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Projected Weekly Revenue Summary Report");
    setDate.setDate(startDate, '2026-01-05');
    cy.get("body").click(0, 0);
    setDate.setDate(endDate, '2026-01-25');
    cy.get("body").click(0, 0);
    cy.get(btnGetReport).click({ force: true });
  });

  //Transaction Details Report
  it("Generate Transaction Details Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Transaction Details Report");
    cy.clickFieldAction("Parents", "Select All");
    setDate.setDate(startDate, '2026-01-01');
    cy.get("body").click(0, 0); 
    setDate.setDate(endDate, '2026-01-31');
    cy.get("body").click(0, 0);
    cy.selectFromNzSelectOverlayNormalized(transactionType, "All");
    cy.setRadioOption('nz-radio-group[formcontrolname="date_toggle"]', 'Transaction Date');
    cy.enableToggles("reversal_toggle");
    cy.get("body").click(0, 0); 
    cy.get(ViewButton).click({ force: true });
  });

  // /Transaction Summary Report
  it("Generate Transaction Summary Report", () => {
    cy.selectFromNzSelect(ReportTypeDropdown, "Transaction Summary Report"); 
    setDate.setDate(startDate, '2026-01-01');
    cy.get("body").click(0, 0);
    setDate.setDate(endDate, '2026-01-31');
    cy.get("body").click(0, 0);
    cy.clickFieldAction("Parents", "Select All");
    cy.get(ViewButton).click({ force: true });
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("PDF").click();
    cy.wait(1000);
    cy.get(btnDownload).click({ force: true });
    cy.get(btnfile).contains("CSV").click();
  });

  //Weekly Revenue Summary Report
  it("Generate Weekly Revenue Summary Report", () => {
    cy.selectFromNzSelectExact(ReportTypeDropdown, "Weekly Revenue Summary Report");
    setDate.setDate(startDate, '2026-01-05');
    cy.get("body").click(0, 0);
    setDate.setDate(endDate, '2026-01-25');
    cy.get("body").click(0, 0);
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
