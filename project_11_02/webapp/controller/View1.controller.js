sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Button"
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Button) {
        "use strict";

        return Controller.extend("sync.project1102.controller.View1", {
            onInit: function () {
                new Button;
                //new sap.m.Button

                this.byId("idInput1").setValue("10"); // 화면 뜨자마자 초기 세팅
                this.byId("idInput2").setValue("20"); // 화면 뜨자마자 초기 세팅
                //this.getView().byId("idInput")
                //=> idInput 객체가 없다고 오류가 날 수 있음(빈도수는 낮음)
                //왜냐면, 화면이 아직 그려지기 전에 Init 함수가 실행해서
                // 타이밍이 맞지 않을 수 있기 때문

                //this.getOwnerComponent(),getModel()
                //=>왜냐면, 화면이 아직 그려지기 전에 Init 함수가 실행해서
                // 타이밍이 맞지 않을 수 있기 때문
                // onAfterRendering 등 화면 그려진 후에 로직을 실행할 수 있도록 설정
            },
            // onClick : function () {
            //     //View에 있는 Input 객체를 가져온다
            //     var getValue = getInput.getValue();
            //     // var + 변수명(내 마음대로 지정)
                
            //     alert(getValue);
            // },
            onCalc : function() {
                //input 2개 다 불러오고
                //select 도 불러와서, 숫자 2개 연산자를 얻을 수 있도록 함
                var sInput1 = this.byId("idInput1").getValue();
                var sInput2 = this.byId("idInput2").getValue();
                var oSelect = this.byId("idSelect");

                //getSelet.getSelectedItem() // item을 가져옴
                var sOperator = oSelect.getSelectedItem().getText();
                var nResult = 0;   
                // 결과값


                //조건문. switch-case : 보통 범위값이 아닐 때 사용
                switch(sOperator) {
                    case "+":
                        nResult = Number(sInput1) + Number(sInput2);
                        break;
                    case "-":
                        nResult = Number(sInput1) - Number(sInput2);
                        break;
                    case "*":
                        nResult =  Number(sInput1) * Number(sInput2);
                        break;
                    case "/":
                        nResult = Number(sInput1) / Number(sInput2);
                        break;
                    default:
                        break;
                }
                
                //화면 하단에 메세지가 잠깐 표시되고 사라짐
                //sap.m.MessageToast.show(nResult);
                alert(nResult);
            }
        });
    });
