// Imagine data
interface LabsData {
    id: number;
    done: boolean;
    name: string;
    level: string;
    stars: number;
    learning_id: number;
    quiz_id: number;
    equipment_path: {
        [key: string]: string;
    }
}

const labsData: LabsData[] = [
    {
        id: 0,
        done: true,
        name: "การทดลองครั้งที่ 1",
        level: "4",
        stars: 2,
        learning_id: 0,
        quiz_id: 0,
        equipment_path: {
            "bottle": "/lab-asset/lab1/360_F_484104424_EbjkT7kcWlrrPuxbBhs9EiRb6l2NoCy5-removebg-preview (1) 1.png",
            "benedict solution": "/lab-asset/lab1/benedict solution.png",
            "Tongs": "/lab-asset/lab1/image 7.png",
            "phone": "/lab-asset/lab1/image 9.png",
            "Fire": "/lab-asset/lab1/image 10.png",
            "beaker": "/lab-asset/lab1/image 8.png",
            "syrup": "/lab-asset/lab1/syrup-bottle-menu-restaurant-cartoon-food-cute-vector-29434749-removebg-preview 1.png",
            "tubes": "/lab-asset/lab1/tubes.png"
        }
    },
    {
        id: 1,
        done: false,
        name: "การทดลองครั้งที่ 2",
        level: "5",
        stars: 2,
        learning_id: 1,
        quiz_id: 1,
        equipment_path: {

        }
    },
    {
        id: 2,
        done: false,
        name: "การทดลองครั้งที่ 3",
        level: "5",
        stars: 2,
        learning_id: 2,
        quiz_id: 2,
        equipment_path: {
            
        }

    },
    {
        id: 3,
        done: true,
        name: "การทดลองครั้งที่ 4",
        level: "4",
        stars: 2,
        learning_id: 3,
        quiz_id: 3,
        equipment_path: {
            
        }

    },
    {
        id: 4,
        done: false,
        name: "การทดลองครั้งที่ 5",
        level: "6",
        stars: 2,
        learning_id: 4,
        quiz_id: 4,
        equipment_path: {
            
        }
    },
    {
        id: 5, 
        done: false,
        name: "การทดลองครั้งที่ 6",
        level: "6",
        stars: 2,
        learning_id: 5,
        quiz_id: 5,
        equipment_path: {
            
        }
    },
    {
        id: 6,
        done: false,
        name: "การทดลองครั้งที่ 7",
        level: "4",
        stars: 2,
        learning_id: 6,
        quiz_id: 6,
        equipment_path: {
            
        }
    },
    {
        id: 7,
        done: true,
        name: "การทดลองครั้งที่ 8",
        level: "5",
        stars: 2,
        learning_id: 7,
        quiz_id: 7,
        equipment_path: {
            
        }
    },
    {
        id: 8,
        done: true,
        name: "การทดลองครั้งที่ 9",
        level: "6",
        stars: 2,
        learning_id: 8,
        quiz_id: 8,
        equipment_path: {
            
        }
    },

]

export { labsData };
