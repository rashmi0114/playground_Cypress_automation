import "cypress-xpath";

const childListScroll = "#virtualScroll";
const calendarDaySelector = ".calendar-day-inner";
const dayMap = {
  Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6,
};

function scrollUntilChildVisible(childName, attempt = 0) {
  const maxAttempts = 8;
  cy.get(childListScroll).then(($list) => {
    if ($list.text().includes(childName)) {
      return;
    }
    if (attempt >= maxAttempts) {
      throw new Error(`Child "${childName}" not found after scrolling.`);
    }
    const direction = attempt % 2 === 0 ? "bottom" : "top";
    cy.get(childListScroll)
      .scrollTo(direction, { duration: 350 })
      .wait(250)
      .then(() => scrollUntilChildVisible(childName, attempt + 1));
  });
}

function clickSlot(childName, dayLabel, slotSelector) {
  const key = dayLabel.slice(0, 3);
  const dayIndex = dayMap[key];
  scrollUntilChildVisible(childName);
  cy.contains(childName, { timeout: 15000 })
    .scrollIntoView({ offset: { top: -100, left: 0 } })
    .should("exist")        
    .closest(".calender-item")
    .within(() => {
      cy.get(calendarDaySelector)
        .eq(dayIndex)
        .find(slotSelector)
        .first()
        .click({ force: true });
    });
}

// ADD SLOT
export function clickAddSlotForChild(childName, dayLabel) {
  clickSlot(childName, dayLabel, ".slot.add");
}
// EDIT SLOT
export function clickEditSlotForChild(childName, dayLabel) {
  clickSlot(childName, dayLabel, ".slot.existing, .slot:not(.add)");
}
// DELETE SLOT
export function clickDeleteSlotForChild(childName, dayLabel) {
  clickSlot(childName, dayLabel, ".slot.existing, .slot:not(.add)");
}
function ensureChildIsVisible(childName, attempt = 0) {
  const maxAttempts = 8;
  cy.get("#virtualScroll").then(($list) => {
    const listText = $list.text();
    if (listText.includes(childName)) {
      return; 
    }
    if (attempt >= maxAttempts) {
      throw new Error(`Child "${childName}" not found in virtual scroll`);
    }
    const direction = attempt % 2 === 0 ? "bottom" : "top";
    cy.get("#virtualScroll")
      .scrollTo(direction, { duration: 500 })
      .wait(250)
      .then(() => ensureChildIsVisible(childName, attempt + 1));
  });
}

//function to check on the check boxes according to child name
Cypress.Commands.add("selectChildren", (childNames = []) => {
  if (!Array.isArray(childNames)) {
    childNames = [childNames];
  }
  childNames.forEach((childName) => {
    ensureChildIsVisible(childName);
    cy.contains(".child-view", childName, { timeout: 10000 })
      .should("exist")
      .scrollIntoView({ offset: { top: -80, left: 0 } })
      .should("be.visible")
      .closest(".calender-item")
      .find('label[nz-checkbox] .ant-checkbox-input')
      .should("exist")
      .check({ force: true });
  });
});

//function to enable toggle button
Cypress.Commands.add("toggleSwitchByIndex", (selector, index) => {
  cy.get(selector)
    .eq(index)
    .should("be.visible")
    .click({ force: true });
});

Cypress.Commands.add("setDaysSelection", (daysToSelect = []) => {
  cy.get('[formcontrolname="days"] input.ant-select-selection-search-input')
    .click({ force: true });
  cy.get(".cdk-overlay-container .ant-select-dropdown", { timeout: 6000 })
    .should("be.visible");
  const allDays = [
    "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday", "Sunday"
  ];
  const option = (day) =>
    `//div[contains(@class,'ant-select-item-option-content') 
       and normalize-space()='${day}']
       /ancestor::nz-option-item`;
  const selectedClass = "ant-select-item-option-selected";
  allDays.forEach((day) => {
    cy.xpath(option(day), { timeout: 500 })
      .then($el => {
        if ($el.length && $el.hasClass(selectedClass)) {
          cy.wrap($el).click({ force: true });
        }
      });
  });
  daysToSelect.forEach((day) => {
    cy.xpath(option(day))
      .click({ force: true });
  });
  // CLOSE DROPDOWN
  cy.get("body").click(0, 0);
});
