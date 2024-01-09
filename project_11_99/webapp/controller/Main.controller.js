sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("project1199.controller.Main", {
            onInit: function () {
                var oData = {
                    list: [
                        {key : "Plus", text : "+" },
                        {key : "Minus", text : "-" },
                        {key : "Multiple", text : "*" },
                        {key : "Divide", text : "/" }
                    ]
                }; 
                
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel, "op");

                var oData2 = {
                    list : []
                };
                var oModel2 = new JSONModel(oData2);
                this.getView().setModel(oModel2, "history");


            },
            onCalc : function() {
                // alert('test');

                var oInput1 = this.getView().byId("idInput1");
                var sInput1 = oInput1.getValue();
                var oInput2 = this.getView().byId("idInput2");
                var sInput2 = oInput2.getValue();

                // 기존에 스트링타입인 변수를 계산 가능한 정수로 변환
                var iInput1 = Number(sInput1);
                var iInput2 = Number(sInput2);

                // alert(iInput1 + iInput2);
                var oSelect = this.getView().byId("idSelect");
                var sSelectedKey = oSelect.getSelectedKey();
                // alert(sSelectedKey);
                var sSelectedText = oSelect.getSelectedItem().getText();
                var Result ;

                switch(sSelectedKey) {
                    case 'Plus' :
                        Result = iInput1 + iInput2;
                        break;
                    case 'Minus':
                        Result = iInput1 - iInput2;  
                        break;  
                    case 'Multiple':
                        Result = iInput1 * iInput2;
                        break;
                    case 'Divide' :
                        Result = iInput1 / iInput2;
                        break;
                    default : 
                    

                    
                }

                var aList = this.getView().getModel("history").getProperty("/list");
                aList.push({
                    num1 : iInput1,
                    operator : sSelectedText,
                    num2 : iInput2,
                    result : Result
                    
                });
                   
                this.getView().getModel("history").setProperty("/list", aList);
                
            }
        });
    });
