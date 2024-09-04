/// <reference types="../@types/jquery" />

import { Quiz } from "./quiz.js";
export class Setting{
    
    constructor(){
        this.categoryElement = document.getElementById("category");
        this.dificultyElement = document.getElementsByName("difficulty");
        this.numberOfQuestionsElement = document.getElementById("numberOfQuestions");
        
        document.getElementById("startBtn").addEventListener("click",this.startQuiz.bind(this));
    }

    async startQuiz(){
        let category = this.categoryElement.value;
        let difficulty = Array.from(this.dificultyElement).filter((element)=>{return element.checked})[0].value;
        let number = this.numberOfQuestionsElement.value;

  
        
        if(number == ""){

            $("#alert1").fadeIn(500)
        }
        else{
            let Api = `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}`

            let questions =await this.fetchApi(Api);
            
            if(questions.length >0){
                $("#setting").fadeOut(500 , ()=> {
                    $("#quiz").fadeIn(500)
                })
    
                let quiz = new Quiz(questions);
            }
        }
    }


    async fetchApi(Api){
        let response =await fetch(Api);
        let finalResult = await response.json();
        return finalResult.results;

       
    }

    
    
}
