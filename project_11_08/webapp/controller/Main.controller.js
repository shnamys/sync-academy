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
            },
            onDelete : function() {
               
            var oTable = this.byId("idTable"),
                aList = this.getView().getModel().getProperty("/list"),
                aIndices = oTable.getSelectedIndices(); //[2,5,7]  
               
            
            // [1,3,5]이면, 배열. length 했을 때 3이 리턴됨
            // 근데 반복문 돌릴 때는 index(0,1,2)를 사용할 것이기 때문에
            // 3이 아니라 2가 되어야 함. 따라서 -1을 해줘야 함
            var len = aIndices.length;
            for(var i=len-1; i>=0; i--){
                aList.splice(aIndices[i],1);
            } 
            this.getView().getModel().setProperty("/list", aList);

    }

        });
    });
