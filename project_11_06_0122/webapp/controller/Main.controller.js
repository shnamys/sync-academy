sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("project11060122.controller.Main", {
            onInit: function () {

            },
            HelloButtonPress : function() {
                sap.m.MessageToast.show("Hello~~~~")
            },
            onOpenDialog : function() {
                this.byId("idDialog").open();
            },
            onClose : function(oEvent) {
                // this.byId("idDialog").close();
                // sap.ui.getCore().byId("idDialog").close();
                oEvent.getSource().getParent().close();
            },
            onOpenDialog_con : function() {
                var dialog = sap.ui.getCore().byId("idDialog");
                if(!dialog) {
                Fragment.load ({
                    name : "project11060122.view.fragment.Name",
                    type : "XML",
                    controller : this
                }). then(function(oDialog) {
                    oDialog.open();

                });
                }else{
                    dialog.open();
                }
            }
        });
    });
