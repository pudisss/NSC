<script lang="ts">
	import { onMount } from "svelte";
    import type { PageServerData } from "./$types";
    

    export let data: PageServerData;
    const userCookie = data.user;
    const userId = userCookie.userId;
    let user = []
    const getStudent = async() => {

        
        const res = await fetch('/api/student/user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId })
		});

		const data = await res.json();

        console.log(data);
		
    }

    const getTeacher = async() => {
        const res = await fetch('/api/teacher/user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId })
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
        }
    })
</script>



<style lang="scss">

</style>