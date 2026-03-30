// Common selectors for date picking functions
const dateSelectors = {
  yearPanel: '[title="Choose a year"]',
  monthPanel: '[title="Choose a month"]',
  dayPanel: ".ant-picker-date-panel",
  yearPicker: ".ant-picker-year-panel .ant-picker-cell-inner",
  monthPicker: ".ant-picker-month-panel .ant-picker-cell-inner",
  dayPicker:
    "td.ant-picker-cell:not(.ant-picker-cell-disabled) .ant-picker-cell-inner",
  dayCell: ".ant-picker-cell-inner",
  pickerOverlay: ".cdk-overlay-pane .ant-picker-panel",
  yearPanelContainer: ".ant-picker-year-panel",
  monthPanelContainer: ".ant-picker-month-panel",
  datePanelContainer: ".ant-picker-date-panel",
  monthNames: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

//select a future date from calendar
export function selectFutureDate(daysFromToday) {
  const target = new Date();
  target.setDate(target.getDate() + daysFromToday);
  const year = target.getFullYear();
  const monthName = dateSelectors.monthNames[target.getMonth()];
  const day = target.getDate();
  // Year
  cy.get(dateSelectors.yearPanel).last().click();
  cy.contains(dateSelectors.yearPicker, year).click({ force: true });
  // Month
  cy.get(dateSelectors.monthPanel).last().click();
  cy.contains(dateSelectors.monthPicker, monthName).click({ force: true });
  // Day
  cy.get(dateSelectors.dayPanel)
    .filter(":visible")
    .last()
    .within(() => {
      cy.get(dateSelectors.dayPicker).contains(day).click({ force: true });
    });
};

//select a past date from calendar
export function selectPastDate(daysBeforeToday) {
  const target = new Date();
  target.setDate(target.getDate() - daysBeforeToday);
  const year = target.getFullYear();
  const monthName = dateSelectors.monthNames[target.getMonth()];
  const day = target.getDate();
  cy.get(dateSelectors.pickerOverlay, { timeout: 10000 }).should("be.visible");
  // Click year button
  cy.get("body").then(($body) => {
    if ($body.find(dateSelectors.yearPanel).length) {
      cy.get(dateSelectors.yearPanel).click({ force: true });
    }
  });
  // Select year
  cy.get(dateSelectors.yearPanelContainer)
    .should("be.visible")
    .within(() => {
      cy.contains(dateSelectors.dayCell, year).click({ force: true });
    });
  cy.get("body").then(($body) => {
    if ($body.find(dateSelectors.monthPanelContainer).length) {
      cy.get(dateSelectors.monthPanelContainer)
        .should("be.visible")
        .within(() => {
          cy.contains(dateSelectors.dayCell, monthName).click({ force: true });
        });
    }
  });
  // Select day
  cy.get(dateSelectors.datePanelContainer)
    .should("be.visible")
    .within(() => {
      cy.contains(dateSelectors.dayPicker, day).click({ force: true });
    });
};

//select tomorrow date
export function selectTomorrow() {
  const target = new Date();
  target.setDate(target.getDate() + 1);
  const targetYear = target.getFullYear();
  const targetMonthIndex = target.getMonth();
  const targetDay = target.getDate();
  const targetMonthName = dateSelectors.monthNames[targetMonthIndex];
  cy.get(dateSelectors.yearPanel).click();
  cy.contains(dateSelectors.yearPicker, targetYear).click({ force: true });
  cy.get(dateSelectors.monthPanel).click();
  cy.contains(dateSelectors.monthPicker, targetMonthName).click({
    force: true,
  });
  cy.get(dateSelectors.dayPicker).contains(targetDay).click({ force: true });
};

//select today date
export function selectToday() {
  const target = new Date();
  const targetYear = target.getFullYear();
  const targetMonthIndex = target.getMonth();
  const targetDay = target.getDate();
  const targetMonthName = dateSelectors.monthNames[targetMonthIndex];
  cy.get(dateSelectors.yearPanel).click();
  cy.contains(dateSelectors.yearPicker, targetYear).click({ force: true });
  cy.get(dateSelectors.monthPanel).click();
  cy.contains(dateSelectors.monthPicker, targetMonthName).click({
    force: true,
  });
  cy.get(dateSelectors.dayPanel).should("be.visible");
  cy.get(dateSelectors.dayPicker)
    .contains(dateSelectors.dayCell, targetDay)
    .click({ force: true });
};

//function to select past week from date picker
export function selectPastWeek(daysBeforeToday = 7) {
  const target = new Date();
  target.setDate(target.getDate() - daysBeforeToday);
  const targetDay = target.getDate();
  cy.get(".cdk-overlay-pane .ant-picker-panel", { timeout: 10000 })
    .should("be.visible")
    .last()
    .within(() => {
      cy.contains(
        "td.ant-picker-cell-in-view .ant-picker-cell-inner",
        String(targetDay)
      )
        .should("be.visible")
        .click({ force: true });
    });
};

//select range date from date picker
export function setNzRangePicker(pickerSelector, start, end) {
  function toYMD(value) {
  if (typeof value === "string") return value; 
  const d = new Date(value);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
function clearAndType(selector, text) {
  cy.get(selector)
    .should("be.visible")
    .click({ force: true })
    .type("{selectall}{backspace}", { force: true })
    .type(text, { force: true })
    .type("{enter}", { force: true });
}
function closeAntPickerDropdown() {
  cy.get("body").type("{esc}", { force: true });
  cy.get("body").then(($body) => {
    const stillOpen = $body.find(".ant-picker-dropdown:visible").length > 0;
    if (stillOpen) {
      cy.get("body").click(5, 5, { force: true });
    }
  });}
  const startYMD = toYMD(start);
  const endYMD = toYMD(end);
  const startInput = `${pickerSelector} input[placeholder="Start date"], ${pickerSelector} input[placeholder="Start Date"]`;
  const endInput = `${pickerSelector} input[placeholder="End date"], ${pickerSelector} input[placeholder="End Date"]`;
  clearAndType(startInput, startYMD);
  clearAndType(endInput, endYMD);
  closeAntPickerDropdown();
  cy.get(pickerSelector).within(() => {
    cy.get("input").eq(0).should("have.value", startYMD);
    cy.get("input").eq(1).should("have.value", endYMD);
  });
};

//select specific date from calendar
export function setDate(selector, dateString) {
  cy.get(selector).then(($input) => {
    cy.wrap($input).click({ force: true });
    cy.wrap($input)
      .clear({ force: true })
      .type(dateString, { force: true })
      .blur(); 
  });
};

//select specific month from calendar
export function selectAntMonth(monthText) {
  const picker = '.cdk-overlay-pane .ant-picker-dropdown';
  cy.get(picker).should('be.visible');
  cy.get(picker)
    .contains('.ant-picker-cell-inner', monthText)
    .should('not.have.attr', 'aria-disabled', 'true')
    .click();
};