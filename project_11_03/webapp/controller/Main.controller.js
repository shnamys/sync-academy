sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1103.controller.Main", {
            onInit: function () {

            },
            onClickPrint : function() {
                var getInput = this.getView().byId("idInput");
                var getValue = getInput.getValue();
                
                var getText = this.getView().byId("idText");
                getText.setText(getValue)

                
            },
            onClickreset : function() {

                var getText = this.getView().byId("idText");
                getText.setText("")
                
            }
        });
    });
