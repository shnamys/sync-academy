sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("project1101.controller.Main", {
            onInit: function () {
                this.byId("idInput1").setValue("10");
                this.byId("idInput2").setValue("20");

                var oJsonData = new JSONModel({
                    list : [
                        { key:"plus", text:"+", additionalText:"더하기" },
                        { key:"minus", text:"-", additionalText:"뺄셈" },
                        { key:"multiple", text:"*", additionalText:"곱셈" },
                        { key:"divide", text:"/", additionalText:"나누기" },
                    ]
                })
                this.getView().setModel(oJsonData);

                var oJsonData2 = new JSONModel({
                   history : [
                    { num1 : 1,
                      oper : "+",
                      num2 : 1,
                      result : 2}
                   ]
                })
                this.getView().setModel(oJsonData2, "local");
            },

            onCalc : function () {
                var sInput1 = this.getView().byId("idInput1").getValue();
                var sInput2 = this.getView().byId("idInput2").getValue();
                var oSelect = this.getView().byId("idSelect");
                var sOperator = oSelect.getSelectedItem().getText();
                var nResult = 0 ;

                switch(sOperator) {
                    case "+" : 
                        nResult = Number(sInput1) + Number(sInput2);
                        break;
                    case "-" : 
                        nResult = Number(sInput1) - Number(sInput2);
                        break;    
                    case "*" : 
                        nResult = Number(sInput1) * Number(sInput2);
                        break;
                    case "/" :
                        nResult = Number(sInput1) / Number(sInput2);
                        break;
                    default:          
                }

                // this.getView().byId("idText").setText(nResult);
            }
        });
    });
