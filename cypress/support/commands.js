require("cypress-grep")();
require("cypress-xpath");

Cypress.Commands.add("loadWithEnvironmentConfig", () => {
  const enviro = Cypress.env("NODE_ENV");
  const configPath = `cypress/config/${enviro}.json`; // FULL PATH REQUIRED

  return cy.readFile(configPath).then((config) => {
    Cypress.env("envConfig", config); // Store environment config in Cypress environment
  });
});

//Login to the application
Cypress.Commands.add("login", () => {
  const config = Cypress.env("envConfig");
  if (!config) {
    throw new Error("Environment config is not loaded");
  }
  const URL = config.URL;
  const username = "#mat-input-0";
  const password = ".mat-form-field-infix.ng-tns-c163-9";
  const btnsubmit =
    '[class$="ant-btn ant-btn-primary ant-btn-lg ant-btn-block"]';
  cy.visit(URL);
  cy.get(username).type(config.username);
  cy.get(password).type(config.password);
  cy.get(btnsubmit).click();
});

//logout from application
Cypress.Commands.add("logout", () => {
  cy.get("img[alt='User avatar']").click();
  cy.contains("Logout").click();
});

//select from main menu
Cypress.Commands.add("selectMainMenu", (menuText) => {
  cy.xpath("//mat-icon[normalize-space()='menu']").click();
  cy.xpath(`//span[normalize-space()='${menuText}']`).click({ force: true });
});

//close the primary payer notification in mainmenu
const ppnotificationpopup = ".ant-notification-notice-close";
Cypress.Commands.add(
  "closeNotificationPopup",
  (selector = ppnotificationpopup) => {
    cy.get(selector, { timeout: 10000 }).invoke("show").click({ force: true });
  }
);

//scroll the hidden scrolling bar
Cypress.Commands.add("scrollHiddenModal", () => {
  cy.get(".mat-dialog-content.ps--active-y", { timeout: 5000 })
    .trigger("mouseover") // reveal hidden scrollbar
    .scrollTo("bottom", {
      duration: 800,
      easing: "linear",
      ensureScrollable: false,
    });
});

//function to enable the toggle
Cypress.Commands.add("toggleSwitchByIndexWithScroll", (selector, index) => {
  cy.get(selector)
    .eq(index)
    .scrollIntoView({ block: "center" })
    .should("be.visible")
    .click({ force: true });
});

Cypress.Commands.add(
  "selectFromDropdownOption",
  (field, optionText, index = null) => {
    //Open the dropdown
    cy.get(`[formcontrolname="${field}"]`).scrollIntoView().click();
    //Grab the last visible nz-option-container (the active dropdown)
    cy.get("nz-option-container", { timeout: 10000 })
      .filter(":visible")
      .last()
      .should("exist")
      .within(() => {
        //Find matching options inside this dropdown
        cy.get(".ant-select-item-option-content")
          .filter(":visible")
          .then(($options) => {
            const wanted = optionText.trim().toLowerCase();
            const matched = [...$options].filter(
              (el) => el.textContent.trim().toLowerCase() === wanted
            );
            if (matched.length === 0) {
              throw new Error(
                `Option "${optionText}" not found for formcontrolname="${field}"`
              );
            }
            //Use index if provided and valid, otherwise first match
            let target;
            if (index !== null && matched[index]) {
              target = matched[index];
            } else {
              target = matched[0];
            }
            cy.wrap(target).click({ force: true });
          });
      });
  }
);

// Set the time from time slider
Cypress.Commands.add("setSliderTime", (selector, percent) => {
  cy.get(selector)
    .should("be.visible")
    .then(($el) => {
      const width = $el.width();
      // Convert percent to pixel position
      const targetX = (width * percent) / 100;
      // Move slider
      cy.wrap($el)
        .trigger("mousedown", { which: 1, force: true })
        .trigger("mousemove", { clientX: targetX, force: true })
        .trigger("mouseup", { force: true });
    });
  const timesliderpopup = '[class^="bg-inner-wrapper"]';
  cy.get(timesliderpopup).within(() => {
    cy.get("button").contains("Set").click({ force: true }).wait(200);
  });
});

//select values from scrollable dropdowns (master roll filter child and fees)
const selectAnyOption = (value) =>
  `//div[contains(@class,'ant-select-item-option-content') and contains(normalize-space(), '${value}')]`;
const dropdownselector =
  ".cdk-virtual-scroll-viewport, nz-option-container, .ant-select-dropdown";
Cypress.Commands.add("selectFromScrollableDropdown", (value) => {
  const optionXpath = selectAnyOption(value);
  function search(attempt = 1) {
    if (attempt > 12) throw new Error(`Option '${value}' not found`);
    cy.xpath(optionXpath).then(($el) => {
      if ($el.length) {
        cy.wrap($el)
          .scrollIntoView({ offset: { top: -50 } })
          .click({ force: true });
      } else {
        cy.get(dropdownselector)
          .scrollTo("bottom", { duration: 300 })
          .wait(200)
          .then(() => search(attempt + 1));
      }
    });
  }
  search();
});

// Handle new tab by opening in the same tab
Cypress.Commands.add("handleNewTabOnce", (action) => {
  cy.window().then((win) => {
    cy.stub(win, "open")
      .callsFake((url) => {
        return win.open.wrappedMethod.call(win, url, "_self");
      })
      .as("openStub");
  });
  action();
  cy.get("@openStub").should("have.been.called");
});

Cypress.Commands.add("selectRoles", (roles = []) => {
  roles.forEach((role) => {
    cy.xpath(
      `//label[contains(@class,'ant-checkbox-wrapper')]
       [.//span[normalize-space()='${role}']]`
    )
      .scrollIntoView()
      .click({ force: true });
  });
});

//select option from report types
Cypress.Commands.add("selectFromNzSelect", (selectLocator, optionText, index = 0) => {
  cy.get(selectLocator)
    .scrollIntoView()
    .find(".ant-select-selector")
    .click({ force: true });
  cy.contains(
    ".ant-select-item-option-content, .ant-select-item-option",
    optionText,
    { timeout: 10000 }
  )
    .then($els => {
      cy.wrap($els).eq(index).click({ force: true });
    });
  cy.get(selectLocator).should("contain.text", optionText);
});


// Select option from nz-select using EXACT text match (won't affect old tests)
Cypress.Commands.add("selectFromNzSelectExact", (selectLocator, optionText) => {
  // open dropdown
  cy.get(selectLocator)
    .scrollIntoView()
    .find(".ant-select-selector")
    .click({ force: true });

  // type into the select search input (filters virtualized list)
  cy.get(selectLocator)
    .find('input.ant-select-selection-search-input')
    .then($inp => {
      if ($inp.length) {
        cy.wrap($inp).clear({ force: true }).type(optionText, { force: true });
      }
    });

  // click EXACT option from visible dropdown
  cy.get(".cdk-overlay-container .ant-select-dropdown:visible", { timeout: 10000 })
    .find(".ant-select-item-option-content")
    .should("exist")
    .filter((_, el) => el.innerText.trim() === optionText)
    .first()
    .click({ force: true });

  // assert
  cy.get(selectLocator).should("contain.text", optionText);
});

Cypress.Commands.add(
  "selectFromNzSelectOverlayNormalized",
  (selectLocator, optionText) => {
    const normalize = (s) => s.replace(/\s+/g, " ").trim();
    const overlayRoot =
      ".cdk-overlay-pane .ant-select-dropdown, " +
      ".cdk-overlay-pane nz-option-container";
    const optionContent = ".ant-select-item-option-content";
    cy.get(selectLocator)
      .scrollIntoView()
      .find(".ant-select-selector")
      .click();
    cy.wait(100); 
    cy.get("body").then(($body) => {
      if ($body.find(optionContent).length === 0) {
        cy.get(selectLocator)
          .find(".ant-select-selector")
          .click({ force: true });
      }
    });
    cy.contains(optionContent, optionText, { timeout: 10000 })
      .scrollIntoView()
      .click({ force: true });
    cy.get(selectLocator)
      .find(".ant-select-selection-item, .ant-select-selector")
      .invoke("text")
      .then((txt) => {
        expect(normalize(txt)).to.include(normalize(optionText));
      });
  }
);

// function to handle toggles
Cypress.Commands.add("enableToggles", (toggles) => {
  const toggleList = Array.isArray(toggles) ? toggles : [toggles];
  toggleList.forEach((toggle) => {
    cy.get(`[formcontrolname="${toggle}"] button.ant-switch`).then(
      ($switch) => {
        if (!$switch.hasClass("ant-switch-checked")) {
          cy.wrap($switch).click({ force: true });
        }
      }
    );
  });
});

Cypress.Commands.add('clickFieldAction', (fieldLabel, actionText) => {
  cy.contains('.ant-form-item-label', fieldLabel)
    .closest('nz-form-item, .ant-form-item')   
    .within(() => {
      cy.contains(actionText).click()         
    })
})



Cypress.Commands.add('setCheckbox', (identifier, value = true, options = {}) => {
  const { by = 'label' } = options; 

  const getWrapper = () => {
    if (by === 'formcontrolname') {
      return cy.get(`label[formcontrolname="${identifier}"]`);
    }
    return cy.contains('label', identifier);
  };

  getWrapper()
    .scrollIntoView()
    .find('input[type="checkbox"]')
    .then(($cb) => {
      const isChecked = $cb.is(':checked');
      if (isChecked !== value) {
        getWrapper().click({ force: true });
      }
    });
});

Cypress.Commands.add('setRadioOption', (groupSelector, optionText) => {
  cy.get(groupSelector)
    .contains('label.ant-radio-button-wrapper', optionText)
    .scrollIntoView()
    .click({ force: true });
});
