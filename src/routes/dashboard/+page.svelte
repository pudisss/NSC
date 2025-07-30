<script lang="ts">
	import { onMount } from "svelte";
    import type { PageServerData } from "./$types";
	import { goto } from "$app/navigation";
    

    export let data: PageServerData;
    const userCookie = data.user;
    const userId = userCookie.userId;

    // Student type occasional

    interface ScoreQuiz {
        score: number;
        quizId: string;
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

    let students = [];
    
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
        for (let i=0; i<students.length; i++) {
            const res = await fetch("/api/student/user", {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ id: students[i] })
            });
            const data = await res.json();

            console.log(data);

        
            
        }
    }

    onMount(async() => {
        // To load the user data before the page started from whether the user is a student or teacher.
        if (userCookie.user_type == "student") {
            await getStudent();
        } else {
            await getTeacher();
            await getStudentLists();
        }
    })
</script>

<div class="dashboard-section">
    <div class="wrapper">
        
            <button class="back-button" on:click={() => goto("/")}>
                <img src="./assets/back.svg" alt="" class="back-icon">
            </button>

            {#if user}
                <div class="container">
                    <div class="profile-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.95 9.95 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"/></svg>
                    </div>
                    <div class="info">
                        <h3 class="info1 kanit" style="font-size: 2rem; font-weight: 400; color: black;">{user.email}</h3>
                        <h3 class="info2 kanit" style="font-size: 1rem; font-weight: 300; color: black;">Room ID: <b>{user.roomId}</b></h3>
                    </div>
                    <div class="students-view-container">
                        
                        <h3 class="header kanit" style="font-size: 1.5rem; font-weight: 400; color: black;">นักเรียนของคุณ</h3>

                        
                        <div class="students">

                        </div>
                    </div>
                    
                </div>
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

        .wrapper {
            background-color: white;
            width: 100%;
            height: 100%;
            position: relative;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            padding: 2rem;

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

                }

                .students-view-container {
                    width: 100%;
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: flex-start;

                }
            }
        }
    }
</style>