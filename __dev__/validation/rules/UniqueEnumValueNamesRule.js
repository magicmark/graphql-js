const { enableDevMode } = require('../../../devMode.js');
enableDevMode();
module.exports = require('../../../validation/rules/UniqueEnumValueNamesRule.js');