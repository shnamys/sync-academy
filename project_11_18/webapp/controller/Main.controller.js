sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/controls/Popover'
],
function (Controller, JSONModel, Filter, FilterOperator, ChartFormatter, Popover) {
    "use strict";

    return Controller.extend("project1118.controller.Main", {

        // oPopOver : null,
        // oVizFrame: null,

        onInit: function () {

            var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZBA_GW_FI_02_SRV/", true);
            this.getView().setModel(oDataModel);                        

            
            var oVizFrame = this.getView().byId("idChart");
            var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(oVizFrame.getVizUid());
            
            // formatString="#,##0 'KRW'"
            // oPopOver.setFormatString("#,##0 KRW");

            // this.getView().addDependent(oPopOver);

            // oPopOver.setFormatString("#,##0 'KRW'");

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

            oVizFrame = this.getView().byId("idChart");
            var oBinding = oVizFrame.getDataset().getBinding("data");

            oBinding.filter(aFilters);

        },

        onChartSelectData: function(oEvent) {

            var oSelectedData = oEvent.getParameter("data")[0].data;
            var sRacct = oSelectedData["G/L 계정번호"];

            // var oPopOver = this.getView().byId("idPopOver");
            var oDataModel = this.getView().getModel(); 
            // var oVizFrame = this.getView().byId("idChart");                         


            // var oDataSet = this.getView().byId("idDataset");    //비즈 전체
            // console.log('>>',oDataSet.getBinding("data"));  //비즈 전체


            var aFilter = [];

            if(sRacct) { //계정번호 담기
                aFilter.push(new Filter("Racct", FilterOperator.EQ, sRacct));
                console.log(aFilter);
            }
            // this.byId("idDataset").getBinding("data").filter(aFilter);

            // var oTable = this.byId("idDataset");
            // var oBinding = oTable.getBinding("data");
            // oBinding.filter(aFilter);
            // console.log(oBinding.filter(aFilter));

        
            oDataModel.read("/DocEntitySet", { 
                filters: aFilter,
                success: function(oData) {
                    var total = 0;
                    var racct = '';
                    var glnm = '';
                    var popoverData = [];

                    console.log('oData.results : ',oData.results);  //8건 

                    oData.results.forEach(function(item) {
                        // 각 항목의 Amount 값을 추출하여 숫자로 변환한 후 총 합에 더합니다.
                        
                        total += parseInt(item.Amount);
                        racct = item.Racct;
                        glnm = item.GlNm;
                       
                        
                    });


                    popoverData.push({
                        Racct: racct,
                        GlNm: glnm,
                        Amount: total,
                        // Total: total
                    });

                    
                    console.log('>>> 여기 : ', total, racct, glnm );
           
                    debugger;

                    this.oPopOver = new sap.viz.ui5.controls.Popover(popoverProps);
                    this.oPopOver.connect(oVizFrame.getVizUid());

                    // oPopOver.setModel(new sap.ui.model.json.JSONModel(popoverData[0]));
                    
                    // 각 계정별 총 금액 계산
                    // var totalAmountPerAccount = calculateTotalAmountPerAccount(oData.results);   
                    
        
                    // 팝오버에 표시할 데이터 생성
                    // var popoverData = [];
                    // oData.results.forEach(function(item) {
                    //     var formattedAmount = totalAmountPerAccount[item.Racct].toLocaleString() + " KRW";
                    //     total = formattedAmount
                        
                    //     popoverData.push({
                    //         Racct: item.Racct,
                    //         GlNm: item.GlNm,
                    //         Amount: formattedAmount
                    //     });
                        
                    //     console.log('>> popoverData : ',popoverData);
                    //     // console.log('>> 총금액 : ',formattedAmount);
                    // });

                    // console.log('total : ', total);
                    
        
                    // 팝오버에 데이터 바인딩
                    // oPopOver.setModel(new sap.ui.model.json.JSONModel(popoverData));
                    

                    // 팝오버를 엽니다.
                    // oPopOver.openBy(oVizFrame);
        
                }.bind(this),
        
                error: function(oError) {
                    console.error("Error occurred while reading data from the service: ", oError);
                }
            });
        
            // 각 계정별 총 금액을 계산하는 함수
            function calculateTotalAmountPerAccount(data) {
                var totalAmountPerAccount = {};
                data.forEach(function(item) {
                    var accountId = item.Racct; 
                    var amount = parseInt(item.Amount); //parseFloat 였음
                    if (accountId in totalAmountPerAccount) {
                        totalAmountPerAccount[accountId] += amount;
                    } else {
                        totalAmountPerAccount[accountId] = amount;
                    }
                });
                return totalAmountPerAccount;
            }
        }        

                     
    });
});