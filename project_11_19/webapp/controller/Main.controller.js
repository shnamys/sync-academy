sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, formatter) {
        "use strict";
        
        var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZBA_GW_FI_02_SRV/", true);
        
        return Controller.extend("project1119.controller.Main", {
            
            onInit: function () {
                // var oDataModel = this.getView().getModel();
                this.getView().setModel(oDataModel);
                var oFilter = new Filter("Arvst", "EQ", "W");
                debugger;

                 oDataModel.read("/HeaderSet", {
                    filters : [oFilter],
                    success: function(oReturn) {
                        console.log("필터조회: ", oReturn); 
                    
                    },
                    error : function(oError) {
                        console.log("전체조회 중 오류 발생", oError);
                    }
                }); 

                // oDataModel.read("/HeaderSet/$count", {
                //     success: function(oReturn) {
                //         // console.log("전체조회: ", oReturn); 
                //         var iCount = oReturn;
                //         this.byId("idIconTabFilterAll").setCount(iCount);
                //     }.bind(this),
                //     error : function(oError) {
                //         console.log("전체조회 중 오류 발생", oError);
                //     }
                // });               
            },

            onFilterSelect : function(oEvent) {
                var oBinding = this.byId("DocTable").getBinding("items"),
				sKey = oEvent.getParameter("key"),
				aFilters = [];
				debugger;
                if (sKey === "W") {
                    aFilters.push(
                        new Filter([
                            new Filter([new Filter("Arvst", "EQ", "W")], true),
                        ], false)
                    );
                } else if (sKey === "Y") {
                    aFilters.push(
                        new Filter([
                            new Filter([new Filter("Arvst", "EQ", "Y")], true),
                        ], false)
                    );
                } else if (sKey === "N") {
                    aFilters.push(
                        new Filter([
                            new Filter([new Filter("Arvst", "EQ", "N")], true),
                        ], false)
                    );
                }
    
                oBinding.filter(aFilters);
            },
            onAccept : function() {
                // var oBody = this.getView().getModel(oDataModel).getData();
                // var sPath = oDataModel.createKey("/HeaderSet", {
                //     Arvst : oBody.Arvst
                // }); 
                
                // oDataModel.update(sPath, oBody, {
                //     success : function() {
                //         sap.m.MessageToast.show("데이터 변경 완료");
                //     }
                // });
            var oTable = this.byId("DocTable");
            var aSelectedContexts = oTable.getSelectedContexts();

            if (aSelectedContexts.length === 0) {
                MessageToast.show("승인할 항목을 선택하십시오.");
                return;
            }

            var oDataModel = this.getView().getModel();

            aSelectedContexts.forEach(function(oContext) {
                var sPath = oContext.getPath();
                var oData = oContext.getObject();

                // 승인 상태로 변경
                oData.Arvst = "Y";

                oDataModel.update(sPath, oData, {
                    success: function() {
                        MessageToast.show("데이터 변경 완료");
                    },
                    error: function(oError) {
                        MessageToast.show("데이터 변경 실패");
                        console.error("Update failed", oError);
                    }
                });
            });
            
            }

        });
    });
