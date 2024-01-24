sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1116.controller.Main", {
            onInit: function () {
                // this.byId("idImage").setSrc(_rootPath + "/image/pubao.jpg");

            },
            setImage : function (sValue) {
                return `${_rootPath}/image/${sValue}.jpg`;
            }
        });
    });
