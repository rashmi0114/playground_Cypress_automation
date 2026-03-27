require("cypress-xpath");

import {
  selectRoom,
} from "../../support/supportFeeManagement";

describe("Manage Fees", () => {
  const addFeeButton =
    'button[class$=" ant-btn ant-btn-primary ng-star-inserted"]';
  const addFeeFormTitle = "//span[normalize-space()='New Fee']";
  const feeName = '[formcontrolname="feeName"]';
  const sessionTime = '[formcontrolname="session_time"]';
  const btnset = "//span[normalize-space()='Set']";
  const netAmount = '[formcontrolname="nAmount"]';
  const effectiveDate = '[formcontrolname="eDate"]';
  const publicvisiblity = "//span[contains(text(),'Public')]";
  const addButton = '[class$="ng-star-inserted ant-btn ant-btn-primary"]';
  const actionsbtn =
    '[class$="ant-btn ant-btn-link ant-btn-lg ant-btn-icon-only"]';
  const editFeeButton = "i.edit.outline.icon.primary-color";
  const deletebtn = "i.trash.alternate.outline.icon.danger-color";
  const yesDeleteButton = "//span[normalize-space()='Yes']";
  const adjustFeeBtn = "i.exchange.alternate.icon.primary-color";
  const historyBtn = "i.history.icon.primary-color";
  const btnArchive = "i.archive.icon.primary-color";
  const btnRemove = "a.remove-btn";
  const btnFilter = "i.filter.icon";
  const filterBtnArchive = "//span[normalize-space()='Archive']";
  const btnRestore = "i.icon.primary-color.redo";
  const filterBtnAll = "//span[normalize-space()='All']";
  const btnupdate = '[class$="ng-star-inserted ant-btn ant-btn-primary"]';

  //Login and Navigate to Fees Menu
  beforeEach(() => {
    cy.loadWithEnvironmentConfig();
    cy.login();
    cy.closeNotificationPopup();
    cy.selectMainMenu("Fees");
  });

  //Add Booking Fee
  it("Add Fee", () => {
    cy.wait(3000);
    cy.contains("Casual");
    cy.get(addFeeButton).click();
    cy.xpath(addFeeFormTitle).should("be.visible");
    cy.get(feeName).type("Monthly Tuition Fee");
    cy.selectFromDropdownOption("feeType", "Casual");
    cy.selectFromDropdownOption("frequency", "Daily");
    cy.selectFromDropdownOption("vendor", "Australian CCS");
    cy.get(sessionTime).type("10:00 AM - 6:00 PM");
    cy.xpath(btnset).click({ force: true });
    cy.get(netAmount).type(50);
    selectRoom("Toddlers");
    cy.get("body").click(0, 0);
    cy.xpath(publicvisiblity).click({ force: true });
    cy.get(addButton).click();
    cy.wait(2000);
    cy.contains("Successfully created").should("be.visible");
  });

  //Edit Booking Fee
  it("Edit Fee", () => {
    cy.wait(2000);
    cy.get(actionsbtn).eq(0).click();
    cy.get(editFeeButton).eq(0).click();
    cy.wait(1000);
    cy.get(feeName).clear().type("Monthly Tuition Fee Edit");
    cy.contains("Update");
    cy.get(btnupdate).invoke("click");
    cy.wait(2000);
    cy.contains("Successfully updated").should("be.visible");
  });

  //Adjust Booking Fee
  it("Adjust Fee", () => {
    cy.get(actionsbtn).eq(0).click();
    cy.get(adjustFeeBtn).eq(0).click();
    cy.wait(1000);
    cy.get(netAmount).clear().type(60);
    cy.get(effectiveDate).click();
    cy.selectFutureDate(5); // uses your custom helper
    cy.contains("Update");
    cy.get(btnupdate).invoke("click");
    cy.wait(2000);
    cy.contains("Successfully created").should("be.visible");
  });

  //Archive & Unarchive Booking Fee
  it("Archive & Unarchive Fee", () => {
    cy.get(actionsbtn).eq(0).click();
    cy.get(btnArchive).click();
    cy.xpath(yesDeleteButton).click({ force: true });
    cy.wait(1000);
    cy.contains("Successfully updated").should("be.visible");
    cy.get(btnFilter).click({ force: true });
    cy.xpath(filterBtnArchive).eq(0).click({ force: true });
    cy.get("body").click("bottomRight");
    cy.wait(1000);
    cy.get(actionsbtn).eq(0).click();
    cy.get(btnRestore).click();
    cy.xpath(yesDeleteButton).click({ force: true });
    cy.wait(1000);
    cy.contains("Successfully updated").should("be.visible");
    cy.get(btnFilter).click({ force: true });
    cy.xpath(filterBtnAll).eq(0).click({ force: true });
    cy.get("body").click("bottomRight");
    cy.reload();
    cy.wait(1000);
  });

  //View Booking Fee History
  it("View Fee History", () => {
    cy.get(actionsbtn).eq(0).click();
    cy.get(historyBtn).eq(0).click();
    cy.wait(3000);
    cy.contains("Adjusted History").should("be.visible");
    cy.get(btnRemove).click();
    cy.xpath(yesDeleteButton).click({ force: true });
    cy.reload();
    cy.wait(1000);
  });

  //Delete Booking Fee
  it("Delete Fee", () => {
    cy.get(actionsbtn).eq(0).click();
    cy.get(deletebtn).eq(0).click();
    cy.wait(1000);
    cy.xpath(yesDeleteButton).click({ force: true });
    cy.wait(1000);
  });

  //Logout
  after(() => {
    cy.logout();
  });
});
