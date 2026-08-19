const { enableDevMode } = require('../../devMode.js');
enableDevMode();
module.exports = require('../../error/ensureGraphQLError.js');