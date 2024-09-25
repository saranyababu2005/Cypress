const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
module.exports = defineConfig({
  // reporter:'cypress-mochawesome-reporter',
  defaultCommandTimeout: 6000,
  retries:{
    runMode:1
  },
  e2e: {
    setupNodeEvents,
   // setupNodeEvents(on, config) {
   //    // implement node event listeners here
   //    preprocessor.addCucumberPreprocessorPlugin(on, config);
   //    require('cypress-mochawesome-reporter/plugin')(on);
   //    on("file:preprocessor", browserify.default(config));
   //  },
    specPattern:'E2E/*.js'
    // specPattern:'E2E/BDD/*.feature'
  },
});

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));
  return config
}
