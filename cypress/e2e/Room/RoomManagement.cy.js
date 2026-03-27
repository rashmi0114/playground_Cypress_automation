require("cypress-xpath");

describe("Launch Application", () => {
  const manageRoomsHeader = "//h1[normalize-space()='Manage Rooms']";
  const addRoomButton = '[class$="ant-btn ant-btn-primary"]';
  const addRoomFormTitle = "//span[contains(@class, 'title dialog-title')]";
  const roomTitleInput = "input[placeholder='Title']";
  const roomDescriptionInput = "textarea[placeholder='description']";
  const assignedStaffDropdown = '[formcontrolname="staff"]';
  const ageGroupDropdown = '[formcontrolname="age_band"]';
  const startTimeInput = "input[placeholder='Select start Time']";
  const endTimeInput = "input[placeholder='Select end Time']";
  const childrenpereducatorInput =
    ".ant-input-number-input.ng-untouched.ng-pristine.ng-valid";
  const roomCapacityInput = '[formcontrolname="capacity"]';
  const saveButton = '[class$="ng-star-inserted ant-btn ant-btn-primary"]';
  const successMessage = "Successfully created";
  const deleteRoomButton = ".ant-card-actions.ng-star-inserted";
  const deleteRoomIcon = "i.trash.alternate.outline.icon.danger-color";
  const yesDeleteButton = "//span[normalize-space()='Yes']";
  const editRoomButton = "i.edit.outline.icon.primary-color";
  const btnupdate = '[class$="ng-star-inserted ant-btn ant-btn-primary"]';

  //attach room picture function
  function attachRoomPicture(fileName) {
    cy.get('.ant-upload input[type="file"]').selectFile(
      `cypress/fixtures/${fileName}`,
      { force: true }
    );
    cy.get(".ant-upload-list-item").should("be.visible");
  }

  beforeEach(() => {
    // Login to the application
    cy.loadWithEnvironmentConfig();
    cy.login();
    // Wait for dashboard to load
    cy.wait(3000);
    // Close popup if visible
    cy.closeNotificationPopup();
    // Navigate to Rooms
    cy.selectMainMenu("Rooms");
    cy.xpath(manageRoomsHeader).should("be.visible");
  });

  // Add Room
  it("Create Room", () => {
    cy.get(addRoomButton).eq(0).click();
    cy.xpath(addRoomFormTitle).should("be.visible");
    cy.get(roomTitleInput).type("Baby Bees");
    cy.get(roomDescriptionInput).type("Create a Kids room for testing");
    cy.get(assignedStaffDropdown).eq(0).type("Ada");
    cy.contains("Adams").click().type("cas");
    cy.contains("Casper").click();
    cy.get("body").click(0, 0);
    cy.get(ageGroupDropdown).eq(0).type("0");
    cy.contains("0-1").click();
    cy.get("body").click(0, 0);
    cy.get(startTimeInput).type("8:00 AM");
    cy.get("body").click(0, 0);
    cy.get(endTimeInput).type("4:00 PM");
    cy.get("body").click(0, 0);
    cy.get(childrenpereducatorInput).eq(0).type("10");
    cy.get(roomCapacityInput).type("50");
    attachRoomPicture("BeeRoom.jpg");  // Attach picture
    cy.get(saveButton).click();
    cy.wait(5000);
    cy.contains(successMessage).should("be.visible");
  });

  // Edit Room
  it("Edit Room", () => {
    cy.get(editRoomButton).eq(0).click();
    cy.wait(1000);
    cy.get(roomTitleInput).clear().type("Baby Bees Edit");
    cy.get(roomDescriptionInput).clear().type("Edited description for testing");
    cy.get(btnupdate).click();
    cy.wait(5000);
    cy.contains("Successfully updated").should("be.visible");
  });

  // Delete created room
  it("Delete Room", () => {
    cy.get(deleteRoomButton).eq(0).find(deleteRoomIcon).click();
    cy.wait(1000);
    cy.xpath(yesDeleteButton).click({ force: true });
    cy.wait(1000);
  });

  afterEach(() => {
    cy.logout();
  });
});
