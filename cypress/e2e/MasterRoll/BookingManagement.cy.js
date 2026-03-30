require("cypress-xpath");
import * as datepicker from "../../support/datePickerHelpers";
import * as selectPastDate from "../../support/datePickerHelpers";
import * as selectFutureDate from "../../support/datePickerHelpers";
import {
  clickAddSlotForChild,
  clickEditSlotForChild,
  clickDeleteSlotForChild,
} from "../../support/supportMasterRoll";

describe("Launch Application for Booking Management", () => {
  const titleManageMasterRoll = "//h1[normalize-space()='Manage Master Roll']";
  const bookingfee = '[formcontrolname="fees"]';
  const selectfee = (fees) =>
    `//nz-option-item//p[contains(@class,'title') and contains(normalize-space(), '${fees}')]`;
  const bookingType = '[formcontrolname="type"]';
  const selectType = (type) => `//span[normalize-space()='${type}']`;
  const btnAddBooking =
    'button[class$="ng-star-inserted ant-btn ant-btn-primary"]';
  const startTime = '[formcontrolname="start"]';
  const endTime = '[formcontrolname="end"]';
  const btnupdate = '[class$="ng-star-inserted ant-btn ant-btn-primary"]';
  const yesButton = "//span[normalize-space()='Yes']";
  const frequency = '[formcontrolname="frequency"]';
  const actionsbtn = "i.chevron.down.icon";
  const selectAction = (action) => `//span[normalize-space()='${action}']`;
  const btnPriview = '[class$="ng-star-inserted ant-btn ant-btn-primary"]';
  const allcheckbox = "thead nz-table-selection input.ant-checkbox-input";
  const btnSave = "//span[normalize-space()='Save']";
  const startDate = '[formcontrolname="start_date"]';
  const endDate = '[formcontrolname="end_date"]';
  const selectDate = '[formcontrolname="week"]';
  const actionbar = '[class^="mat-dialog-actions"]';
  const btnDelete = '[class$= "ng-star-inserted ant-btn ant-btn-primary"]';
  const btnApplyAll = "//a[normalize-space()='Apply all']";
  const sessionStartTime = '[formcontrolname="session_start_time"]';
  const attendenceUpdateType = (text) =>
    `.ant-select-item-option-content:contains('${text}')`;
  const timeslider = ".ant-slider-handle[style*='left']";
  const actionbtn = '[class="ng-star-inserted"]';
  const btnDownload = "//span[normalize-space()='Download']";
  const btnListView = '[class="list icon"]';
  const btncalendarView = '[class="calendar alternate outline icon"]';
  const ttpntSigninsheet = '[class^="print icon"]';
  const ttOccupancyDashborad = '[class = "users icon"]';
  const downloadBtn = '[class="ant-btn ant-btn-primary ng-star-inserted"]';
  const btnClose = '[class="ant-btn ant-btn-danger ng-star-inserted"]';
  const circularView =
    '[class="ant-progress-show-info ant-progress-circle ant-progress ant-progress-status-active"]';
  const CheckboxOnlyBookings = '[nztooltiptitle="Show Bookings Only"]';
  const btnFilter =
    '[class$="text-uppercase blank ant-btn ant-btn-link ant-btn-icon-only"]';
  const btnPrint = "//span[normalize-space()='Print']";
  const filterChild = '[formcontrolname="child"]';
  const AtendenceType = '[formcontrolname="attend_type"]';
  const selectStatus = (status) =>
    `//div[contains(@class,'ant-select-item-option-content') and normalize-space()='${status}']`;
  const closeFilterBtn =
    '[class$="ng-trigger ng-trigger-fadeMotion ant-btn ant-btn-link ant-btn-icon-only ng-star-inserted"]';
  const filterfee = '[formcontrolname="fee"]';
  const minimizeBtn = "i.window.minimize.icon";
  const selectRoom = '[class$="ant-select ant-select-show-arrow ant-select-single ng-valid ng-touched ng-dirty"]'

  beforeEach(() => {
    // Login to the application
    cy.loadWithEnvironmentConfig();
    cy.login();
    // Wait for dashboard to load
    cy.wait(5000);
    // Close popup if visible
    cy.closeNotificationPopup();
    // Navigate to Master Roll
    cy.selectMainMenu("Master Roll");
    cy.xpath(titleManageMasterRoll).should("be.visible");
    cy.wait(2000);
    cy.get('nz-select .ant-select-selector').eq(0)
  .click({ force: true })
cy.get('.ant-select-item-option-content')
  .contains(/^All$/)
  .click({ force: true });
    cy.wait(2000);
  });

  it("Add Booking for a Child  @ms" , () => {
    //Add Slot for a Child on Tuesday
    clickAddSlotForChild("Yosh Kid", "Tue");
    cy.selectFromDropdownOption("room", "Kiddie Club");
    cy.get(bookingfee).click();
    cy.xpath(selectfee("Casualpreschool (C)")).click();
    cy.selectFromDropdownOption("kg_program", "Kindy Program A");
    cy.get(bookingType).eq(1).click();
    cy.xpath(selectType("Booked")).eq(1).click({ force: true });
    cy.get(btnAddBooking).click({ force: true });
  });

  it("Edit Booking for a Child @ms", () => {
    clickEditSlotForChild("Yosh Kid", "Tue");
    cy.selectFromDropdownOption("kg_program", "Kindy Program B");
    cy.get(bookingType).eq(1).click();
    cy.xpath(selectType("Attendance"))
      .eq(1)
      .should("be.visible")
      .click({ force: true });
    cy.get(startTime).click({ force: true });
    cy.setSliderTime(".ant-slider-handle[style*='left']", 35);
    cy.get(endTime).click({ force: true });
    cy.setSliderTime(".ant-slider-handle[style*='left']", 10);
    cy.get(btnupdate).click({ force: true });
  });

  it("Delete Booking for a Child @ms", () => {
    clickDeleteSlotForChild("Yosh Kid", "Tue");
    cy.wait(2000);
    cy.contains("button span", "Delete").parent().click({ force: true });
    cy.xpath(yesButton).click({ force: true });
    cy.wait(1000);
  });

  it("Select Children for Add Booking Action @ms", () => {
    cy.selectChildren(["Yosh Kid", "Zidan Dias"]);
    cy.get(actionsbtn).click({ force: true });
    cy.xpath(selectAction("Add")).click();
    cy.wait(1000);
    cy.selectFromDropdownOption("room", "Kiddie Club");
    cy.get(bookingfee).click();
    cy.xpath(selectfee("ASC 2 (R)")).click();
    cy.get(frequency).wait(3000).click();
    cy.contains("Weekly").click();
    cy.get(startDate).click();
    selectPastDate.selectPastDate(4);
    cy.get(endDate).click();
    selectFutureDate.selectFutureDate(4);
    cy.selectFromDropdownOption("kg_program", "Kindy Program A");
    for (let i = 0; i < 5; i++) {
      if (i === 3) cy.scrollHiddenModal();
      cy.toggleSwitchByIndexWithScroll("button.ant-switch", i);
    }
    cy.get(actionbar).within(() => {
      cy.get(btnPriview).click({ force: true });
      cy.wait(3000);
    });
    cy.get(allcheckbox).check({ force: true });
    cy.xpath(btnSave).click({ force: true });
  });

  it("Select Children for Update Booking Room @ms", () => {
    cy.selectChildren(["Yosh Kid", "Zidan Dias"]);
    cy.get(actionsbtn).click({ force: true });
    cy.xpath(selectAction("Manage")).click();
    cy.wait(1000);
    cy.get(startDate).click();
    selectPastDate.selectPastDate(4);
    cy.get(endDate).click();
    selectFutureDate.selectFutureDate(4);
    cy.selectFromDropdownOption("action", "Update");
    cy.selectFromDropdownOption("operation", "Change Room");
    cy.selectFromDropdownOption("room", "Fruities");
    cy.get(actionbar).within(() => {
      cy.get(btnPriview).click({ force: true });
      cy.wait(20000);
    });
    cy.get(allcheckbox).check({ force: true });
    cy.get(btnupdate).click({ force: true });
    cy.xpath(yesButton).click({ force: true });
  });

  it("Select Children for Update Booking Fee @ms", () => {
    cy.selectChildren(["Yosh Kid", "Zidan Dias"]);
    cy.get(actionsbtn).click({ force: true });
    cy.xpath(selectAction("Manage")).click();
    cy.wait(1000);
    cy.get(startDate).click();
    selectPastDate.selectPastDate(4);
    cy.get(endDate).click();
    selectFutureDate.selectFutureDate(4);
    cy.selectFromDropdownOption("action", "Update");
    cy.selectFromDropdownOption("operation", "Change Fee");
    cy.get(bookingfee).click();
    cy.xpath(selectfee("$130/ 7:00 - 5:00 (R)")).click();
    cy.get(actionbar).within(() => {
      cy.get(btnPriview).click({ force: true });
      cy.wait(20000);
    });
    cy.get(allcheckbox).check({ force: true });
    cy.get(btnupdate).click({ force: true });
    cy.xpath(yesButton).click({ force: true });
  });

  it("Select Children for Update Booking Days @ms", () => {
    cy.wait(1000);
    cy.selectChildren(["Yosh Kid", "Zidan Dias"]);
    cy.get(actionsbtn).click({ force: true });
    cy.xpath(selectAction("Manage")).click();
    cy.wait(1000);
    cy.get(startDate).click();
    selectPastDate.selectPastDate(4);
    cy.get(endDate).click();
    selectFutureDate.selectFutureDate(4);
    cy.wait(1000);
    cy.selectFromDropdownOption("action", "Update");
    cy.selectFromDropdownOption("operation", "Change Days");
    cy.wait(2000);
    cy.setDaysSelection(["Monday", "Tuesday", "Wednesday", "Thursday"]);
    cy.get(actionbar).within(() => {
      cy.get(btnPriview).click({ force: true });
      cy.wait(25000);
    });
    cy.get(allcheckbox).check({ force: true });
    cy.get(btnupdate).click({ force: true });
    cy.xpath(yesButton).click({ force: true });
  });

  it("Select Children for Bulk Attendance Update @ms", () => {
    cy.selectChildren(["AAA Pavithra"]);
    cy.get(actionsbtn).click({ force: true });
    cy.xpath(selectAction("Bulk Update")).click();
    cy.wait(1000);
    cy.get(bookingType).eq(1).click();
    cy.get(attendenceUpdateType("Week Selection")).click();
    cy.get(selectDate).click();
    datepicker.selectTomorrow();
    cy.get(actionbar).within(() => {
      cy.get(btnPriview).click({ force: true });
      cy.wait(5000);
    });
    cy.xpath(btnApplyAll).click();
    cy.get(sessionStartTime).click({ force: true });
    cy.setSliderTime(timeslider, 5);
    cy.get("button").contains("APPLY").click({ force: true });
    cy.wait(1000);
    cy.xpath(btnSave).click({ force: true });
    cy.wait(2000);
  });


  it("Select children for generate attendance Report and download @ms", () => {
    cy.window().then((win) => {
      cy.stub(win, "open")
        .callsFake((url) => {
          return win.open.wrappedMethod.call(win, url, "_self");
        })
        .as("openStub");
    });
    cy.selectChildren(["AAA Pavithra"]);
    cy.get(actionsbtn).click({ force: true });
    cy.xpath(selectAction("Report")).click();
    cy.wait(1000);
    cy.get(bookingType).eq(1).click();
    cy.get(attendenceUpdateType("Week Selection")).click();
    cy.get(selectDate).click();
    datepicker.selectTomorrow();
    cy.get(actionbar).within(() => {
      cy.get(btnPriview).click({ force: true });
      cy.wait(3000);
      cy.get(actionbtn).eq(1).click({ force: true });
      cy.xpath(btnDownload).click();
      cy.xpath(btnPrint).click({ force: true });
    });
    // Assert window.open was triggered
    cy.get("@openStub").should("have.been.called");
    // Assert PDF viewer blob URL loaded in same tab
    cy.url().should((url) => {
      expect(url).to.satisfy((u) => u.includes("blob") || u.includes("pdf"));
    });
    cy.go("back");
  });

  it("Select Children for Delete Bookings @ms", () => {
    cy.selectChildren(["Yosh Kid", "Zidan Dias"]);
    cy.get(actionsbtn).click({ force: true });
    cy.xpath(selectAction("Manage")).click();
    cy.wait(1000);
    cy.get(startDate).click();
    selectPastDate.selectPastDate(10);
    cy.get(endDate).click();
    selectFutureDate.selectFutureDate(10);
    cy.selectFromDropdownOption("action", "Delete");
    cy.get(actionbar).within(() => {
      cy.get(btnPriview).click({ force: true });
      cy.wait(3000);
    });
    cy.get(allcheckbox).check({ force: true });
    cy.wait(1000);
    cy.get(btnDelete).click();
    cy.xpath(yesButton).click({ force: true });
  });

  it("Naviagte to listview and back to calendar View @ms", () => {
    cy.wait(2000);
    cy.get(btnListView).click();
    cy.wait(2000);
    cy.get(btncalendarView).click();
    cy.wait(1000);
  });

  it("Download Print sign-in sheet @ms", () => {
    cy.wait(2000);
    cy.get(ttpntSigninsheet).click({ force: true });
    cy.wait(3000);
    cy.selectFromDropdownOption("rooms", "Kiddie Club");
    cy.get("body").click(0, 0);
    cy.wait(1000);
    cy.get(downloadBtn).click({ force: true });
    cy.get(btnClose).click({ force: true });
  });

  it("Navigate to occupancyView and handle master roll minimize and maximize @ms", () => {
    cy.wait(2000);
    cy.get(ttOccupancyDashborad).click({ force: true });
    cy.wait(3000);
    cy.get(circularView).eq(1);
    cy.get(ttOccupancyDashborad).click({ force: true });
    cy.wait(1000);
    cy.get(minimizeBtn).click({ force: true });
    cy.wait(1000);
    cy.get(minimizeBtn).click({ force: true });
  });

  //Filter function verifing with only bookings 
  it("Filter with Show Only Bookings @ms", () => {
    cy.get(CheckboxOnlyBookings).click({ force: true });
    cy.wait(1000);
    cy.get(btnFilter).click({ force: true });
    cy.get(bookingType).click();
    cy.xpath(selectType("Booked")).eq(1).click({ force: true });
    cy.wait(1000);
    cy.get("body").trigger("click", 150, 250);
    //cy.get(closeFilterBtn).click({ force: true });
    cy.wait(1000);
    cy.get(btnFilter).click();
    cy.get(bookingType).click();
    cy.wait(1000);
    cy.xpath(selectType("Attendance")).eq(1).click({ force: true });
    cy.get(AtendenceType).click();
    cy.xpath(selectStatus("Completed")).click();
    cy.wait(1000);
    cy.get(filterChild).type("AAA");
    cy.selectFromScrollableDropdown("AAA Pavithra");
    cy.get(filterfee).click();
    cy.selectFromScrollableDropdown("ASC", 7);
    cy.get("body").click(50, 200);
  });

  //Logout
  afterEach(() => {
    cy.logout();
  });
});
