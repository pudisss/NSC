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
        done: false,
        name: "การทดลองอัตราการเกิดปฏิกิริยาเคมี โดยมีปัจจัยคืออุณหภูมิ",
        level: "4",
        stars: 2,
        learning_id: 0,
        quiz_id: 0,
        equipment_path: {
            "น้ำ": "/assets/lab-asset/lab1/Water.png",
            "สารละลายเบเนดิกซ์ ": "/assets/lab-asset/lab1/benadic.png",
            "ดรอปเปอร์": "/assets/lab-asset/lab1/dropper.png",
            "นาฬิกาจับเวลา(มือถือ)": "/assets/lab-asset/lab1/clock.svg",
            "แหล่งกำเนิดไฟ": "/assets/lab-asset/lab1/fire.png",
            "บีกเกอร์": "/assets/lab-asset/lab1/beaker.png",
            "น้ำเชื่อม": "/assets/lab-asset/lab1/Syrub.png",
            "หลอดทดลอง 2 หลอด": "/assets/lab-asset/lab1/tube.png"
        }
    },
    

]

export { labsData };
