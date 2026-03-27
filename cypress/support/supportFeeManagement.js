import "cypress-xpath";

 const feerooms = '[formcontrolname="rooms"]';
 const SelectionPanel = ".cdk-overlay-pane"
 const selectionDropdown = ".cdk-overlay-pane nz-option-item"
 
// function for Select Room from dropdown
export function selectRoom(optionText) {
  cy.get(feerooms).scrollIntoView().should("be.visible");
  cy.get(feerooms).click();
  cy.get(SelectionPanel, { timeout: 5000 }).should("exist");
  cy.wait(500);
  cy.get(selectionDropdown).contains(new RegExp(`^${optionText}$`, "i")).click({ force: true });
}

