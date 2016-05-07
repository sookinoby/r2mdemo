(function() {
  'use strict';

  angular
    .module('resultDisplay',['ui.grid'])
    .controller('ResultController',ResultController);

  /** @ngInject */
  function ResultController(authService,$log,$state,$sce) {
    var vm = this;
    vm.a = "test"
    this.questionList = null;
    this.operator_symbol = "+";
    var self = this;
    this.result_data = [{operator: "+", a: 0, b: 1 , c:2 , d:3, e:4 , f:5, g:6, h:7, i:8, j:9} /*,*/];



   // self.tableParams = new NgTableParams({}, { dataset: vm.result_data});
    this.getQuestionList = function()
    {
      var gameData = authService.getResult();
      console.log(gameData);
      this.questionList = gameData.questionList;
    };



    this.findInQuestionList =function(mapRow,mapCol) {

      for(var i=0;i<this.questionList.length;i++)
      {
       // console.log(this.questionList[i]);
        if(this.questionList[i].MapCol == mapCol && this.questionList[i].MapRow== mapRow )
        return this.questionList[i];
      }

    };

    this.fullTable = [];
   // this.cons_result = [];

    this.wrongFacts = [];
    this.avgFactTime = 0;
    this.accuracy = 0;
    this.numberOfCorrect = 0;
    this.constructResult = function() {
      var number = 0;
      var m =0;
      for(var row=0;row<10;row++)
      {
        var cons_result = [];
        for(var col=0;col<10;col++) {
          var data = this.findInQuestionList(row,col);
          console.log(m)
          m++;
          if(data != null && data.Right === false)
          {
          var wrong = {};
          wrong.Q1 = data.Q[0];
          wrong.Op = data.Q[1];
          wrong.Q2 = data.Q[2];
          wrong.StudentAnswer = data.StudentAnswer;
          wrong.eq = $sce.trustAsHtml('&ne;');
          this.wrongFacts.push(wrong);
          this.operator_symbol = data.Q[1];
          }
          else if(data != null && data.Right === true)
          {
            this.numberOfCorrect =  this.numberOfCorrect + 1;
            this.avgFactTime = (this.avgFactTime * number + data.Time) / (number+1);
            number = number + 1;
            this.operator_symbol = data.Q[1];
          }
          else {
           data =  {
              "ID": "0",
              "SID": "2",
              "MapRow": row,
              "MapCol": col,
              "Q": [
              row,
              "+",
              col ,
              "=",
              "-"
            ],
              "A": [
              "-"
            ],
              "O": [
              "1",
              "2",
              "3"
            ],
              "Time": null,
              "StudentAnswer": "-",
              "Right": false,
              "Opposite": true
            };
          }
          cons_result.push(data);
        }
        this.fullTable.push(cons_result);

      }
      this.avgFactTime = Math.round( (this.avgFactTime / 1000) * 100) / 100;
      this.accuracy = Math.round((this.numberOfCorrect / this.questionList.length) * 100);
    };

    this.getQuestionList();
    this.constructResult();
    console.log(this.fullTable);
    console.log(this.wrongFacts);
  }

})();
