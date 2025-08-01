<script lang="ts">
	import { onMount } from "svelte";
    import type { PageServerData } from "./$types";
	import { goto } from "$app/navigation";
    

    export let data: PageServerData;
    const userCookie = data.user;
    const userId = userCookie.userId;

    console.log(data.user);

    // Student type occasional

    interface ScoreQuiz {
        score: number;
        quizId: string;
        labName: string;
        report: string;
    }
    interface StudentInterface {
        id: string;
        email: string;
        password: string;
        firstname: string;
        surname: string;
        prefix: string;
        user_type: string;
        roomId: string;
        scores: ScoreQuiz[];

    }
    interface TeacherInterface {
        email: string;
        password: string;
        id: string;
        user_type: string;
        students: [];
        roomId: string;

    }
    // Teacher type occasional
    let user!: StudentInterface | TeacherInterface;

    let studentList: StudentInterface[] = [];
    
    
    const getStudent = async() => {

        
        const res = await fetch('/api/student/user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId })
		});

		const data = await res.json();

        // Add data to the user.
        user = data.user;
        console.log(user);
    }

    const getTeacher = async() => {
        const res = await fetch('/api/teacher/user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId })
		});

		const data = await res.json();

        // Add data to the user
        user = data.user;
        console.log(user);
    }

    const getStudentLists = async() => {
        const students = user.students;

        console.log(students);
        
        for (let i=0; i<students.length; i++) {
            
            const res = await fetch("/api/student/user", {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ userId: students[i] })
            });
            const data = await res.json();

            studentList = [...studentList, data.user]; // This triggers reactivity and updates the DOM
        
            
        }

        

        
    }
    const logOut = async() => {
        const res = await fetch("/api/logout", {
            method: "POST", 
            
        });

        const data = await res.json();

        goto("/")
        console.log(data);
    }

    let showReport = false;
    const handleReport = () => {
        showReport = !showReport;
    }

    const handlePass = async(userId: string, quizId: string) => {
        const res = await fetch("/api/student/quiz/verify", {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ userId: userId, quizId: quizId, pass: true})
        });

        const data = await res.json();
        console.log(data);

    }

    const handleFail = async(userId: string, quizId: string) => {
        const res = await fetch("/api/student/quiz/verify", {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ userId: userId, quizId: quizId, pass: false})

        });
        const data = await res.json();
        console.log(data);
    }


    onMount(async() => {
        // To load the user data before the page started from whether the user is a student or teacher.
        if (userCookie.user_type == "student") {
            await getStudent();
        } else {
            await getTeacher();
            await getStudentLists();

            console.log(studentList);
        }
    })
</script>

<div class="dashboard-section">

    
    <div class="wrapper">
        
            <button class="back-button" on:click={() => goto("/")}>
                <img src="./assets/back.svg" alt="" class="back-icon">
            </button>

            {#if user}
                {#if user.user_type == "teacher"}

                    

                    <div class="container">
                        <div class="profile-container">
                            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.95 9.95 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"/></svg>
                        </div>
                        <div class="info">
                            <h3 class="info1 kanit" style="font-size: 2rem; font-weight: 400; color: black;">{user.email}</h3>
                            <h3 class="info2 kanit" style="font-size: 1rem; font-weight: 300; color: black;">Room ID: <b>{user.roomId}</b></h3>
                            <button class="log-out-button" on:click={logOut}>
                                ออกระบบ
                            </button>
                        </div>
                        <div class="students-view-container">
                            
                            <h3 class="header kanit" style="font-size: 1.5rem; font-weight: 400; color: black;">นักเรียนของคุณ</h3>

                            
                            <div class="students">
                                
                                {#each studentList as stu} 
                                   
                                    <details class="student-container">
                                        <summary class="name kanit">{stu.prefix} {stu.firstname} {stu.surname}</summary>
                                        
                                        
                                        <!-- We still only have one lab-->
                                        <div class="score-container">
                                            <h3 class="labname kanit">{stu.scores[0].labName}</h3>
                                            <h3 class="score kanit">คะแนน: {stu.scores[0].score}</h3>
                                            <button class="view-report-button kanit" on:click={handleReport}>ดูรายงาน</button>

                                            <div class="row-button">
                                                <button class="pass kanit" on:click={() => handlePass(stu.id, stu.scores[0].quizId)}>ผ่าน</button>
                                                <button class="fail kanit" on:click={() => handleFail(stu.id, stu.scores[0].quizId)}>ไม่ผ่าน</button>
                                            </div>
                                        </div>
                                        <div class="view-report" class:show={showReport}>

                                            <div class="container">

                                                <button class="back" on:click={handleReport}>
                                                    <img src="./assets/back.svg" alt="back-icon" class="back-icon">
                                                </button>
                                                <h1 class="report-header kanit" style="font-size: 2rem; font-weight: 500; color: black;">รายงาน</h1>
                                                <p class="report kanit">
                                                    {stu.scores[0].report != "" ? stu.scores[0].report: "ยังไม่ได้เขียนรายงาน"}
                                                </p>
                                            </div>
                                        </div>
                                        
                                    </details> 
                                {/each}
                            </div>
                        </div>
                        
                    </div>
                    {:else if user.user_type == "student"}
                        <div class="container">
                            <div class="profile-container">
                                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.95 9.95 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"/></svg>
                            </div>
                            <div class="info">
                                <h3 class="info1 kanit" style="font-size: 2rem; font-weight: 400; color: black;">{user.email}</h3>
                                <h3 class="info2 kanit" style="font-size: 1rem; font-weight: 300; color: black;">Room ID: <b>{user.roomId}</b></h3>
                                <button class="log-out-button" on:click={logOut}>
                                    ออกระบบ
                                </button>
                            </div>

                            <div class="labs-view">
                                
                                <h2 class="header kanit" style="font-size: 1.5rem; font-weight: 400; color: black;">แลปทั้งหมด</h2>
                                <div class="labs">
                                    {#each user.scores as lab, id}
                                        <div class="lab-container">
                                            <h2 class="labname kanit">{id+1}. {lab.labName}</h2>
                                            <h2 class="verify kanit" class:pass={lab.pass}>{lab.pass ? "ผ่าน" : "ไม่ผ่าน"}</h2>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                            
                            
                        </div>
                {/if}
            {/if}
        </div>
   
</div>



<style lang="scss">
    .dashboard-section {
        width: 100%;
        height: 100vh;
        background-color: #F4F9F9;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        overflow: hidden;
        
        

        .wrapper {
            background-color: white;
            width: 100%;
            height: 100%;
            position: relative;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            padding: 2rem;
            z-index: 1;

            .back-button {
                position: absolute;
                top: 0;
                left: 0;
                margin: 1rem;
                width: 100px;
                height: 100px;
                border-radius: 35px;
                border: 2px solid white;
                background-color: white;
                cursor: pointer;
                transition: 0.15s ease-out;

                &:hover {
                    border-color: #FFCB66
                }
            }
            
            .container {
                width: 80%;
                
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                row-gap: 2rem;

                .profile-container {
                    width: 200px;
                    height: 200px;
                    object-fit: cover;

                    svg {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .info {
                    text-align: center;
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;

                    .log-out-button {
                        padding: 0.5rem 1rem;
                        display: flex;
                        align-items: center;
                        column-gap: 1rem;
                        background-color: white;
                        border: 2px solid #FFCB66;
                        border-radius: 7px;
                        cursor: pointer;
                        transition: 0.15s ease-out;
                        
                        font-size: 1rem;
                        font-weight: 500;
                        color: #FFCB66;

                        &:hover {
                            color: black;
                            border-color: white;
                        }
                        
                    }
                }

                .labs-view {
                    width: 100%;
                    display :flex;
                    flex-flow: column nowrap;
                    align-items: flex-start;

                    .labs {
                        width: 100%;
                        margin-top: 1rem;
                        display: flex;
                        align-items: flex-start;
                        row-gap: 1rem;

                        .lab-container {
                            width: 100%;
                            padding: 1rem;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            border: 2px solid #797979;
                            border-radius: 7px;
                            background-color: #F9FAFB;

                            h2 {
                                font-size: 1rem;
                                font-weight: 500;
                                color: black;
                            }
                            .verify {
                                color: #D32F2F;
                            }
                            .pass {
                                color: #2E7D32;
                            }
                            
                        }
                    }
                }

                .students-view-container {
                    width: 100%;
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: flex-start;

                    .students {
                        width: 100%;
                        margin-top: 1rem;
                        
                        display: flex;
                        align-items: flex-start;
                        flex-flow: column nowrap;
                        row-gap: 1rem;

                        
                        .student-container {
                            width: 100%;
                            padding: 1rem;
                            
                            border: 2px solid #797979;
                            border-radius: 7px;
                            background-color: #F9FAFB;
                            display: flex;
                            flex-flow: column nowrap;
                            align-items: center;

                            .name {
                                align-self: flex-start;
                            
                            }
                            .view-report {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background-color: rgba(0, 0, 0, 0.4);
                                position: absolute;
                                top: 0;
                                z-index: 2;
                                visibility: hidden;
                                display: flex;
                                align-items: center;
                                justify-content: center;

                                .container {
                                    position: relative;
                                    width: 60%;
                                    height: 60%;
                                    background-color: white;
                                    border: none;
                                    border-radius: 7px;
                                    padding: 2rem;
                                    display: flex;
                                    flex-flow: column nowrap;
                                    align-items: center;

                                    .back {
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        margin: 1rem;
                                        width: 100px;
                                        height: 100px;
                                        border: 2px solid white;
                                        border-radius: 35px;
                                        transition: 0.15s ease-out;
                                        cursor: pointer;
                                        background-color: white;
                                        align-self: flex-start;

                                        &:hover {
                                            border-color: #FFCB66;
                                        }

                                    }
                                }
                            }

                            .show {
                                visibility: visible;
                            }

                            .score-container {
                                width: 100%;
                                display: flex;
                                flex-flow: column nowrap;
                                align-items: center;

                                .view-report-button {
                                    margin-top: 1rem;
                                    width: 100%;
                                    font-size: 1rem;
                                    font-weight: 400;
                                    padding: 0.5rem 1rem;
                                    border-radius: 7px;
                                    border: 2px solid white;
                                    background-color: white;
                                    transition: 0.15s ease-out;
                                    cursor: pointer;

                                    &:hover {
                                        border-color: #FFCB66;
                                    }
                                    
                                
                                }

                                .row-button {
                                    margin-top: 1.5rem;
                                    width: 100%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                    .pass {
                                        padding: 0.5rem 1rem;
                                        cursor: pointer;
                                        background-color: #E8F5E9;
                                        border: 2px solid #2E7D32;
                                        border-radius: 7px;

                                    }

                                    .fail {
                                        padding: 0.5rem 1rem;
                                        cursor: pointer;
                                        background-color: #FDECEA;
                                        border: 2px solid #D32F2F;
                                        border-radius: 7px;

                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>