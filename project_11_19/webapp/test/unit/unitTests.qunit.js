/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"project_11_19/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
