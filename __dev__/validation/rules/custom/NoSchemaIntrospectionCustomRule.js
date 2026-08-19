const { enableDevMode } = require('../../../../devMode.js');
enableDevMode();
module.exports = require('../../../../validation/rules/custom/NoSchemaIntrospectionCustomRule.js');