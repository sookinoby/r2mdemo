(function() {
  'use strict';

  angular
    .module('resultDisplay',['ui.grid'])
    .controller('ResultController',ResultController);

  /** @ngInject */
  function ResultController(authService,gameDetailService,$log,$state,$sce) {
    var vm = this;
    vm.a = "test"
    this.questionList = null;
    this.displayAll = false;
    this.operator_symbol = "+";
    var self = this;
    this.result_header = ["+","0","1","2","3","4","5","6","7","8","9"];
    this.wrongFacts = [];
    this.rightFacts  = [];
    this.avgFactTime = 0;
    this.accuracy = 0;
    this.numberOfCorrect = 0;



   // self.tableParams = new NgTableParams({}, { dataset: vm.result_data});
    this.getQuestionList = function()
    {
      var gameData = gameDetailService.getResult();
      console.log(gameData);
      if(!gameData)
      {
        $state.go('main');
      }
      this.questionList = gameData.questionList;
      this.operator_symbol = gameData.Operation;
      this.result_header[0] = this.operator_symbol;
    };



    this.findInQuestionList =function(mapRow,mapCol) {

      for(var i=0;i<this.questionList.length;i++)
      {
       // console.log(this.questionList[i]);
        if(this.questionList[i].Q[2] == mapCol && this.questionList[i].Q[0] == mapRow )
        return this.questionList[i];
      }

    };

    this.fullTable = [];
   // this.cons_result = [];


    this.constructResult = function() {
      var number = 0;
      var m =0;
      var row_max = 10;
      if(this.operator_symbol === "-")
      {
        row_max = 19; // since it is subtraction;
      }
      var col_max = 10;
      for(var row=0;row<row_max;row++)
      {
        var cons_result = [];
        for(var col=0;col<col_max;col++) {
          var data = this.findInQuestionList(row,col);
          console.log(data)
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
         // this.operator_symbol = data.Q[1];
          }
          else if(data != null && data.Right === true)
          {
            this.numberOfCorrect =  this.numberOfCorrect + 1;
            this.avgFactTime = (this.avgFactTime * number + data.Time) / (number+1);
            number = number + 1;
        //    this.operator_symbol = data.Q[1];
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

    this.displayAllFacts = function () {
      var number = 0;
      for(var i = 0; i <  this.questionList.length; i++)
      {
        var data = this.questionList[i];
        if( data.Right === false)
        {
          var wrong = {};
          wrong.Q1 = data.Q[0];
          wrong.Op = data.Q[1];
          wrong.Q2 = data.Q[2];
          wrong.StudentAnswer = data.StudentAnswer;
          wrong.eq = $sce.trustAsHtml('&ne;');
          this.wrongFacts.push(wrong);
        //  this.operator_symbol = data.Q[1];
        }
        else {
          var right = {};
          right.Q1 = data.Q[0];
          right.Op = data.Q[1];
          right.Q2 = data.Q[2];
          right.StudentAnswer = data.StudentAnswer;
          right.eq = $sce.trustAsHtml('=');
          this.rightFacts.push(right);
      //    this.operator_symbol = data.Q[1];
          this.numberOfCorrect =  this.numberOfCorrect + 1;
          this.avgFactTime = (this.avgFactTime * number + data.Time) / (number+1);
          number = number + 1;
        }
      }
      this.avgFactTime = Math.round( (this.avgFactTime / 1000) * 100) / 100;
      this.accuracy = Math.round((this.numberOfCorrect / this.questionList.length) * 100);

    }

    this.getQuestionList();
    if(gameDetailService.getCurrentGameDetails().name =="division")
    {
      console.log("display all");
      this.displayAll = true;
      this.displayAllFacts();

    }
    else {
      this.constructResult();
    }
    console.log(this.fullTable);
    console.log(this.wrongFacts);
  }

})();
