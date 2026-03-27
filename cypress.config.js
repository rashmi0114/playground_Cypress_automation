const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      NODE_ENV: "local-e2e"
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity: false, // Disable web security for tests
    experimentalSessionAndOrigin: true
  }
});
