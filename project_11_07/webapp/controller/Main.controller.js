sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.project1107.controller.Main", {
            onInit: function () {
                var oData = { 
                    name : 'Hong Gil Dong' ,
                    age : 20,
                    title : 'Gildong`s Page',  
                    inpValue : 'World'                           
                };
                var oModel = new JSONModel(oData);

                // var oModel = new JSONModel();
                // oModel.loadData('../model/data.json', {}, false);
                // // 상대 경로를 지정해서 데이터 불러올 수 있음

                // console.log(oModel.getData());
                
                //View에 JSON모델을 사용할 수 있도록 세팅
                //이름 없는 기본 모델 = Defalut Model
                this.getView().setModel(oModel);
                    
                // this.getView().setModel(모델객체, "car");
                // 모델 여러 개 사용할 때, 이름 부여 가능
                // car 라는 이름의 모델
                
                var oModel2 = new JSONModel({
                    name : {
                        firstName : 'Hong',
                        lastName : 'Gildong'
                    },
                    datas : [
                        { name : 'Kim', age : 30, tel : '010-2222-6811'},
                        { name : 'Park', age : 10, tel : '010-3333-1321'},
                        { name : 'Moon', age : 20, tel : '010-5555-8621'}                        
                    ],
                    textValue : "Hello"
            
                              
                });
                                                                  
                
                this.getView().setModel(oModel2, 'test');
            },
            
            onClick : function() {
                var oModel = this.getView().getModel('test');

                var data = oModel.getData();
                var data2 = oModel.getProperty("/name/firstName");                

                // oModel.setData({ name : 'Hong Gildong'});                

                oModel.setProperty("/name/firstName", "Park");

                console.log(oModel.getData());
             

                

            // // Model 가져오기 
            // var oModel = this.getView().getModel('local');
            // // oModel.getData(); // 전체 데이터 가져오기
            // // oModel.getProperty('/'); // 특정 경로에 있는 데이터 가져오기
            // oModel.getData().history // 전체 가져온 후 history 얻기
            // oModel.getProperty('/history'); // history 데이터만 가져오기
            
            // oModel.setData({name : 'okok'}, true);
            // //oModel.setData(세팅할 데이터, 합치기여부);
            // oModel.setProperty("/name","okok");
            // // oModel.setProperty(대상경로,바꿀값);
        },
        onSetData : function(oEvent) {
            var oModel = this.getView().getModel(); // 빈칸으로 세팅하면 기본모델 호출
            var oTestModel = this.getView().getModel('test');
            // var sInputData = oModel.getProperty("/inpValue");
            var sInputData = oModel.getData().inpValue;
            // oTestModel.setData({ textValue : sInputData },true);
            oTestModel.setProperty("/textValue", "Hello " + sInputData);
  
            // "Hello" + sInputData
            // 'Hello' + sInputData
            // 



            // var obj = {key : '이름'} ==> obj.key

            /* 
                oTestModel에 있는 textValue 데이터 변경
                변경된 데이터 : "Hello + <Input창에 입력한 데이터>"

                *setProperty 또는 setData 사용해서 적용할 수 있음!
            
            console.log(sInputData); //콘솔창에 로그찍기
            */
        }
                            



        });
    });
