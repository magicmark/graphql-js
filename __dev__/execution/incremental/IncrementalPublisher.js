const { enableDevMode } = require('../../../devMode.js');
enableDevMode();
module.exports = require('../../../execution/incremental/IncrementalPublisher.js');