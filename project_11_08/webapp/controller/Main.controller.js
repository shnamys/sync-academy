sap.ui.define([
    "sap/ui/core/mvc/Controller"
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1108.controller.Main", {
            onInit: function () {
                var oData = {
                    list : []
                };
                var oModel = new sap.ui.model.json.JSONModel(oData);
                this.getView().setModel(oModel);

            },
            onAdd: function() {
                var oModel = this.getView().getModel();
                // var aList = oModel.getData().list;
                var aList = oModel.getProperty("/list");

                aList.push({
                    name : 'hihi',
                    age : 20
                });
                oModel.setProperty("/list", aList);
            },
            
            // rowActionCount 관련 item 클릭 시 이벤트 발생
            onRowDelete : function(oEvent) {
                var index = oEvent.getParameters().row.getIndex();
                var aList = this.getView().getModel().getProperty("/list");

                // 해당 index의 모델 데이터 삭제

                aList.splice(index, 1);
                this.getView().getModel().setProperty("/list", aList);
            }

        });
    });
