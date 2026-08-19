const { enableDevMode } = require('../../../devMode.js');
enableDevMode();
module.exports = require('../../../execution/legacyIncremental/BranchingIncrementalExecutor.js');