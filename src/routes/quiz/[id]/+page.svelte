<script lang="ts">
    import type { PageServerData } from "./$types";
    import { quizLab } from "../../../lib/data/QuizLab";
    import Quiz from "../../../lib/Components/Quiz.svelte";
    import { goto } from "$app/navigation";
    export let data: PageServerData;
    export let labName: string; // For future coding

    const { id } = data;
    
    
    const currentLabQuiz = quizLab.filter((data) => data.id == Number(id))[0];
    let warning: boolean = false;
    let missingNumber = []
    const questions = currentLabQuiz.questions;
    const quizAnswer = currentLabQuiz.correctAnswers;
    let score: number = 0;

    let scorePercentage = (60/100);
    

    // Answers from each question
    let answers: {answer: string, questionNumber: number}[] = [];
    
    const handleAnswer = (event: CustomEvent<{answer: string, questionNumber: number}>) => {
        const answer = event.detail;
        
        if (answers.findIndex((data) => data.questionNumber == answer.questionNumber) == -1) {
            answers.push(answer)
        } else {
            answers[answers.findIndex((data) => data.questionNumber == answer.questionNumber)] = answer
        }

        console.log(answers)
    }

    const handleSubmit = () => {
        // Get all question number
        let questNum = []
        let sortedAnswer = []
        for (let answer of answers) {
            questNum.push(answer.questionNumber);
        }
        questNum.sort((a, b) => a-b);

        

        // Validate the answers 
        if (questions.length == answers.length) {
            console.log("The user answer all the questions")

            // Get the answers and sort by question number
            for (let num of questNum) {
                for (let answer of answers) {
                    if (answer.questionNumber == num) {
                        sortedAnswer.push(answer.answer)
                    }
                }
            }

            // Check for the score
            for (let i=0; i<quizAnswer.length; i++) {
                if (quizAnswer[i] == sortedAnswer[i]) {
                    score++
                }
            }

            // Check for the score
            let resultPercentage = (score / questions.length);

            if (resultPercentage < scorePercentage) {
                goto("/quiz/"+id+"/fail")
            } else {
                goto("/quiz/"+id+"/pass")
            }
            

            
        } else {
            // Check what questions the user didn't answer
            for (let i=1; i<questions.length+1; i++) {
                if (!questNum.includes(i)) {
                    missingNumber.push(i)
                }
            }

            // Check if there is missing number
            if (missingNumber.length != 0) {
                warning = true;
                
            } 
            

        }
        

    }
    
</script>


<section class="main-section">
    
    <div class="wrapper">
        <button class="back-button">
            <img src="/back-arrow.svg" alt="" class="back-icon">
            
        </button>

        <div class="quiz-container">
            {#each questions as question}
                <Quiz on:answer={handleAnswer} questionNumber={question.number} question={question.name} options={question.options} correctAnswer={question.correctAnswer}></Quiz>
            {/each}

            <p class="warning-text sarabun" class:warning={warning}>Quiz unsubmitted. Some questions were left unanswered.</p>

            <button class="submit-button kanit" on:click={handleSubmit}>
                ส่งข้อสอบ
            </button>
        </div>

        

        
    </div>
</section>

<style lang="scss">
    .main-section {
        width: 100%;
        
        background-color: #F4F9F9;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem;

       
        
        .wrapper {
            width: 100%;
            
            background-color: #FFFFFF;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4rem;


            .warning-text {
                font-size: 2rem;
                font-weight: 600;
                color: red;
                display: none;
                margin-top: 1rem;

            }

            .warning {
                display: block;
            }
            .back-button {
                position: absolute;
                top: 0;
                left: 0;
                width: 100px;
                height: 100px;
                background-color: white;
                border: 2px solid white;
                transition: 0.15s ease-out;
                border-radius: 35px;
                cursor: pointer;
                margin: 1rem;

                &:hover {
                    border-color: #FFCB66;
                }
            }

            
            .quiz-container {
                width: 80%;
                height: 100%;
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                row-gap: 1rem;

                .warning-text {
                    font-size: 1rem;
                    font-weight: 500;
                    color: red;

                    .hide {
                        display: none;
                    }
                    .output {
                        display: block;
                    }
                }
                .submit-button {
                    width: 100%;
                    height: 50px;
                    background-color: #4FD1C5;
                    border: 2px solid #4FD1C5;
                    color: white;
                    border-radius: 7px;
                    margin-top: 2rem;
                    font-size: 24px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: 0.15s ease-out;

                    &:hover {
                        background-color: white;
                        color: black;
                    }

                
                }
            }

            

        }
    }
</style>