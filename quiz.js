const questions = [
    {
        question:"Who was the first American president?",
        answers:[
            {text:"George Washington", correct:'true'},
            {text:"Barack Obama", correct:'false'},
            {text:"John Adams", correct:'false'},
            {text:"John Tyler", correct:'false'}
        ]
    },
    {
        question:"How many countries are in Africa?",
        answers:[
            {text:"55", correct:'false'},
            {text:"52", correct:'false'},
            {text:"60", correct:'false'},
            {text:"54", correct:'true'}
        ]
    },
    {
        question:"In what year was Islam established?",
        answers:[
            {text:"611", correct:'false'},
            {text:"617", correct:'false'},
            {text:"610", correct:'true'},
            {text:"615", correct:'false'}
        ]
    },
    {
        question:"What is the difference between game and gamification?",
        answers:[
            {text:"a game is a normal game, and gamification is an app that represent the functionality of games", correct:'false'},
            {text:"a game is a normal game, and gamification is the process of making a game", correct:'false'},
            {text:"something else", correct:'true'},
            {text:"there is no difference", correct:'false'}
        ]
    }
];

        const questionElement = document.getElementById("question");
        const answerButtons = document.getElementById("answer-buttons");
        const nextButton = document.getElementById("next-btn");
        const timeCounter=document.getElementById("timer")
        var timer;
        var ele =document.getElementById("timer")

        let currentQuestionIndex = 0;
        let score = 0;

        function startQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            nextButton.innerHTML = "Next";
            showQuestion();
        }

        function showQuestion() {
            resetState();
            let currentQuestion = questions[currentQuestionIndex];
            let questionNo = currentQuestionIndex + 1;
            questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
            currentQuestion.answers.forEach(answer => {
                const button = document.createElement("button");
                button.innerHTML = answer.text;
                button.classList.add("btn");
                answerButtons.appendChild(button);
                if(answer.correct){
                    button.dataset.correct=answer.correct;
                }
                button.addEventListener("click",selectAnswer)
            })
        }
        function resetState() {
            nextButton.style.display="none";
            while (answerButtons.firstChild) {
                answerButtons.removeChild(answerButtons.firstChild)
            }
        }
        function selectAnswer(e) {
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true";
            if(isCorrect){
                selectedBtn.classList.add("correct");
                score++;
            }else{
                selectedBtn.classList.add("incorrect");
            }
            Array.from(answerButtons.children).forEach(button => {
                if(button.dataset.correct === "true"){
                    button.classList.add("correct");
                }
                button.disabled="true"
            });
            clearInterval(timer);
            nextButton.style.display="block";
        }
        function showScore() {
            resetState();
            timeCounter.innerHTML=""
            questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`
            nextButton.innerHTML = "play again"
            nextButton.style.display = "block"
        }
        function handleTimer() {
            var sec = 29;
            ele.innerHTML ='time left: '+ (sec+1)
            timer = setInterval( ()=> {
                if(sec>=0){
                ele.innerHTML ='time left: '+ sec; 
                }
                if (sec==0){
                    Array.from(answerButtons.children).forEach(button => {
                        if(button.dataset.correct === "true"){
                            button.classList.add("correct");
                        }
                        button.disabled="true"
                    });
                    nextButton.style.display="block";
                }
                sec--; 
            },1000)
        }
        function handleNextButton() {
            currentQuestionIndex++;
            if(currentQuestionIndex < questions.length){
                timeCounter.innerHTML="30"
                handleTimer();
                showQuestion();
            }else{
                showScore();
            }
            
        }
        nextButton.addEventListener("click",() =>{
            if(currentQuestionIndex < questions.length){
                handleNextButton();
            }else{
                startQuiz();
            }
        })
        startQuiz();
        handleTimer();