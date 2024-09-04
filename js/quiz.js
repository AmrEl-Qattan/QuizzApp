/// <reference types="../@types/jquery" />

export class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestions = 0;
    this.numberOfQuestions = this.questions.length;
    this.score = 0;
    this.showQuestions();

    document.getElementById("next").addEventListener("click", this.nextQuestion.bind(this));
    document.getElementById("tryBtn").addEventListener("click",()=>{
      $("#finish").fadeOut(500 , ()=>{
        $("#setting").fadeIn(500)
      })
      // reset input
      $("#numberOfQuestions").val("");
    })
  }

  shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  showQuestions() {
    document.getElementById("currentQuestion").innerHTML =
      this.currentQuestions + 1;
    document.getElementById("totalNumberOfQuestions").innerHTML =
      this.numberOfQuestions;
    let correctAnswer = this.questions[this.currentQuestions].correct_answer;
    let inCorrectAnswer =
      this.questions[this.currentQuestions].incorrect_answers;
    let answers = [correctAnswer, ...inCorrectAnswer];
    // console.log(answers);
    this.shuffle(answers);

    // console.log(answers);

    let answersBox = "";
    for (let i = 0; i < answers.length; i++) {
      answersBox += `<label class="form-check-label mt-3">
                          <input type="radio" class="form-check-input" name="answer"  value="${answers[i]}">
                          ${answers[i]}
                      </label> <br/>`;
    }

    document.getElementById("question").innerHTML =
      this.questions[this.currentQuestions].question;
    document.getElementById("rowAnswer").innerHTML = answersBox;
  }

  nextQuestion() {
   

    if(Array.from(document.getElementsByName("answer")).filter((el) => el.checked).length > 0){
      let correctAnswer = this.questions[this.currentQuestions].correct_answer;
      let userAnswer = Array.from(document.getElementsByName("answer")).filter((el) => el.checked)[0].value;

      this.checkAnswer(userAnswer, correctAnswer);

      this.currentQuestions++;
  
      if (this.currentQuestions < this.numberOfQuestions) {
        this.showQuestions();
      } else {
        $("#quiz").fadeOut(500 , ()=>{
          $("#finish").fadeIn(500)
        })
        document.getElementById("score").innerHTML =this.score
        // console.log(this.score);
      }
    }
    else{
      $("#alert").fadeIn(500).fadeOut(500)
    }

 
  }

  checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer == correctAnswer) {
      this.score++;

      $("#Correct").fadeIn(1000).fadeOut(1000);
    } else {
      $("#inCorrect").fadeIn(1000).fadeOut(1000);
    }
    

  }
}






