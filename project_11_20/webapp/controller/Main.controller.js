sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/controls/Popover'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator, ChartFormatter, Popover) {
        "use strict";

        return Controller.extend("project1120.controller.Main", {
            onInit: function () {

                var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZBA_GW_FI_02_SRV/", true);
                this.getView().setModel(oDataModel); 
                
                var oVizFrame = this.getView().byId("idChart");
                var oPopOver = this.getView().byId("idPopOver");
                oPopOver.setFormatString("#,##0 KRW");
                oPopOver.connect(oVizFrame.getVizUid());

                oDataModel.read("/DocEntitySet", {
                    success: function(oData) {
                        // 중복 제거하는 함수 정의
                        function removeDuplicates(array, key) {
                            return array.filter((item, index, self) =>
                                index === self.findIndex((t) => (
                                    t[key] === item[key]
                                ))
                            );
                        }
                         // 중복 제거
                         var oDistinctData = removeDuplicates(oData.results, "Racct");
    
                         // racct로 오름차순으로 정렬
                         oDistinctData.sort(function(a, b) {
                            return a.Racct.localeCompare(b.Racct);
                        });
    
                        // 특정 조건을 만족하는 racct 필터링 
                        var desiredRaccts = ["111004", "221001", "441001", "441002", "551001", "991002"];
                        var filteredData = oDistinctData.filter(function(item) {
                            return desiredRaccts.includes(item.Racct);
                        });
    
    
                        // ComboBox에 중복 제거된 데이터 바인딩
                        var oComboBox = this.getView().byId("idRacct");
                        var oModel = new JSONModel(filteredData);
                        oComboBox.setModel(oModel);
                        oComboBox.bindItems("/", new sap.ui.core.ListItem({
                            key: "{Racct}",
                            text: "{Racct}",
                            additionalText: "{GlNm}"
                        }));
                           
                    }.bind(this),
                    error: function(oError) {
                        console.error("Error occurred while reading data from the service: ", oError);
    
                    }               
                });

            },

            onSearch: function() {
                var sRacctId = this.byId("idRacct").getSelectedKey();
                var oDateRangeSelection = this.byId("DRP1");
                var sStartDate = oDateRangeSelection.getDateValue();
                var sEndDate = oDateRangeSelection.getSecondDateValue();
    
                var aFilters = [];
    
                if (sRacctId) {
                    aFilters.push(new Filter("Racct", FilterOperator.EQ, sRacctId));
                }
    
                if (sStartDate && sEndDate) {
                    aFilters.push(new Filter("Docdate", FilterOperator.BT, sStartDate, sEndDate));
                }

                var oVizFrame = this.getView().byId("idChart");
                oVizFrame = this.getView().byId("idChart");
                var oBinding = oVizFrame.getDataset().getBinding("data");
    
                oBinding.filter(aFilters);
    
            },

            onChartSelectData : function(oEvent) { 

            }
        });
    });
