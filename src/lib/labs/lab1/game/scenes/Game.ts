/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { EventBus } from '../EventBus';
/* END-USER-IMPORTS */


let labFinished: boolean = false;
export default class Game extends Phaser.Scene {
	

	// Components that used across methods

	private syrupBottle!: Phaser.GameObjects.Sprite;
	private progressBarSyrup!: Phaser.GameObjects.Graphics;
	private progressBarBenedict!: Phaser.GameObjects.Graphics;
	private progressBarDropper!: Phaser.GameObjects.Graphics;
	private progressBarWaterBottle!: Phaser.GameObjects.Graphics;
	private progressBarTube1!: Phaser.GameObjects.Graphics;
	private progressBarTube2!: Phaser.GameObjects.Graphics;
	private benedictSol!: Phaser.GameObjects.Sprite;
	private tube1: Phaser.GameObjects.Image;
	private tube2: Phaser.GameObjects.Image;
	private dropper: Phaser.GameObjects.Image;
	private waterBottle: Phaser.GameObjects.Image;
	private fire: Phaser.GameObjects.Image;
	private beaker: Phaser.GameObjects.Image;


	// Text 
	private instructionText!: Phaser.GameObjects.Text;
	
	
	private currentDraggedObject: Phaser.GameObjects.Image | null = null;
	// Syrup logic (Some can be used global)
	private remainingTime!: number = 0;
	private holdTimeNeeded: number = 1000; // in milliseconds
	private holdTimeSyrup: number = 0;
	private triggerActivatedSyrup: boolean = false;

	// Benedict logic
	private triggerActivatedBenedict: boolean = false;
	private holdTimeBenedict: number = 0;

	// Dropper logic
	private holdTimeDropper: number = 0;

	// Water bottle logic
	private triggerActivatedWaterBot: boolean = false;
	private holdTimeWaterBot: number = 0;
	private beakerFilled: boolean = false;

	// Tube 1,2 Logic
	private tube1InBeaker: boolean = false;
	private tube2InBeaker: boolean = false;
	private tube1InBeakerCount: number = 0;
	private tube2InBeakerCount: number = 0;
	private reactionTimerActive: boolean = false;
	private reactionCountdown: number = 8000;
	private shouldUpdateReactionTimer: boolean = false;

	

	
	// Drop zone
	private tubeDropZone1: Phaser.GameObjects.Zone;
	private tubeDropZone2: Phaser.GameObjects.Zone;
	private benedictDropZone: Phaser.GameObjects.Zone;
	private beakerDropZone: Phaser.GameObjects.Zone;

	// Drop zone rec
	private benedictDropZoneRec: Phaser.GameObjects.Graphic;
	private tubeDropZone1Rec: Phaser.GameObjects.Graphics;
	private tubeDropZone2Rec: Phaser.GameObjects.Graphics;
	private beakerDropZoneRec: Phaser.GameObjects.Graphics;

	// Independent Variable
	private tube1Filled: boolean = false;
	private tube2Filled: boolean = false;

	private tube1FilledBenedict: boolean = false;
	private tube2FilledBenedict: boolean = false;

	private dropperFilled: boolean = false;

	// Check once variable
	private hasAddedBenedictOnce: boolean = false;
	private hasChangedToBeakerScene: boolean = false;
	


	// Buttons & logics
	private fireButton: Phaser.GameObjects.sprite;
	private timerActive: boolean = false;
	private countdown: number = 5000;
	private boiled: boolean = false;
	private shouldUpdateTimer: boolean = false;


	preload() {
		this.load.pack('boot-pack', '/assets/boot-asset-pack.json');
  		
	}
	constructor() {
		super("Game");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	

	private tweenBackToStart(gameObject: Phaser.GameObjects.GameObject, x: number, y: number) {
		this.tweens.add({
			targets: gameObject,
			x: x,
			y: y,
			duration: 300,
			ease: 'Back.easeOut'
		});
	}

	editorCreate(): void {

		// lab_background
		this.add.image(546, 374, "lab-background").setScale(2, 2);

		// table
		this.add.image(547, 724, "table").setScale(3, 1)

		// Beaker 
		this.beaker = this.add.sprite(this.scale.width/2, this.scale.height/2, "beaker");
		this.beaker.setScale(0.6904380578093007, 0.6776077106750412);
		this.beaker.setInteractive();
		this.beaker.setData("type", "beaker");
		this.beaker.setVisible(false);
		// tubes
		this.tube1 = this.add.image(this.scale.width/2, this.scale.height/2, "tube");
		this.tube1.scaleX = 0.4939236387471173;
		this.tube1.scaleY = 0.8120981952449916;
		this.tube1.setInteractive();
		this.tube1.setData("type", "tube1");

		// tubes_1
		this.tube2 = this.add.image(this.scale.width/2+150, this.scale.height/2, "tube");
		this.tube2.scaleX = 0.4939236387471173;
		this.tube2.scaleY = 0.8120981952449916;
		this.tube2.setInteractive();
		this.tube2.setData("type", "tube2")

		// Initialize Sprites 

		// Syrup Bottle
		this.syrupBottle = this.add.sprite(109, 510, "Syrub");
		this.syrupBottle.setScale(0.6084856357294978, 0.6714020361570918);
		this.syrupBottle.setInteractive();
		this.syrupBottle.setData("type", "syrupBottle")
		this.input.setDraggable(this.syrupBottle);

		// Benedict Solution
		this.benedictSol = this.add.sprite(109, 510, "benadic");
		this.benedictSol.setScale(0.6173748357282295, 0.6738448232213771);
		this.benedictSol.setInteractive();
		this.benedictSol.setVisible(false);

		// Dropper
		this.dropper = this.add.sprite(119, 271, "dropper");
		this.dropper.setScale(0.8289899741104789, 0.8481988634404316);
		this.dropper.setInteractive();
		this.dropper.setData("type", "dropper")
		this.dropper.setVisible(false);
		this.input.setDraggable(this.dropper);

		// Water bottle
		this.waterBottle = this.add.sprite(109, 510, "Water");
		this.waterBottle.setScale(0.743437156350858, 0.6982627803102348);
		this.waterBottle.setInteractive();
		this.waterBottle.setData("type", "waterBottle");
		this.waterBottle.setVisible(false);
		this.input.setDraggable(this.waterBottle)
		
		// Fire 
		this.fire = this.add.sprite(this.scale.width/2, this.scale.height/2+100, "fire");
		this.fire.setScale(0.7480796982526532, 0.7417988910642426);
		this.fire.setInteractive();
		this.fire.setData("type", "fire");
		this.fire.setVisible(false);
		

		// Buttons
		this.fireButton = this.add.sprite(this.scale.width/1.3, this.scale.height/2, "fire-button");
		this.fireButton.setInteractive();
		this.fireButton.setData("type", "fire-button")
		this.fireButton.setVisible();
		this.fireButton.on('pointerover', () => {
			this.fireButton.setTint(0xaaaaaa); // gray tint
		});
		this.fireButton.on('pointerout', () => {
			this.fireButton.clearTint();
		});
		this.fireButton.on('pointerdown', () => {
			this.handleFireButton()
		});
		


		// Instruction text
		this.instructionText = this.add.text(this.scale.width / 2, 150, 'ใส่น้ำเชื่อม(C₁₂H₂₂O₁₁) ปริมาณ 5 มิลลิลิตร (mL) ลงในหลอดทดลองทั้ง 2 หลอด', {
            fontSize: '24px',
            color: '#000000',
			fontStyle: "bold",
            padding: { x: 20, y: 10 },
			align: "center"
        }).setOrigin(0.5);

		
		

		// Progress bar
		this.progressBarSyrup = this.add.graphics();
		this.progressBarSyrup.setVisible(false);

		this.progressBarBenedict = this.add.graphics();
		this.progressBarBenedict.setVisible(false);

		this.progressBarDropper = this.add.graphics();
		this.progressBarDropper.setVisible(false);

		this.progressBarWaterBottle = this.add.graphics();
		this.progressBarWaterBottle.setVisible(false);

		this.progressBarTube1 = this.add.graphics();
		this.progressBarTube1.setVisible(false);

		this.progressBarTube2 = this.add.graphics();
		this.progressBarTube2.setVisible(false);


		


		// Dragging behavior
		this.input.on('dragstart', (pointer, gameObject) => {
			this.currentDraggedObject = gameObject;
		});
		this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
			gameObject.x = dragX;
			gameObject.y = dragY;
		});
	
		this.input.on('dragend', (pointer, gameObject, dropped) => {

			this.currentDraggedObject = null
			if (!this.triggerActivatedBenedict) this.holdTimeBenedict = 0;
			if (!this.triggerActivatedSyrup) this.holdTimeSyrup = 0;
			if (!this.triggerActivatedBenedict) this.holdTimeDropper = 0;
			if (!this.triggerActivatedWaterBot) this.holdTimeWaterBot = 0;
			
			this.progressBarSyrup.setVisible(false);
			this.progressBarBenedict.setVisible(false);
			this.progressBarDropper.setVisible(false);
			this.progressBarWaterBottle.setVisible(false);
			
			// Control the tween back to the origin position
			const typeObject = gameObject.getData('type');
			if (typeObject === 'dropper') {
				this.tweenBackToStart(gameObject, 119, 271);
			}

			if (typeObject === 'syrupBottle') {
				this.tweenBackToStart(gameObject, 109, 510);
			}

			if (typeObject === "waterBottle") {
				this.tweenBackToStart(gameObject, 109, 510);
			}

			if (typeObject === "tube1" && !this.tube1InBeaker) {
				this.tweenBackToStart(gameObject, this.scale.width/1.3, this.scale.height/2)

			}
			if (typeObject === "tube2" && !this.tube2InBeaker) {
				this.tweenBackToStart(gameObject, this.scale.width/5, this.scale.height/2)
			}

		});
		

		// Create zone
		this.tubeDropZone1 = this.add.zone(this.tube1.x-50, this.tube1.y-150, 100, this.tube2.height/2.3)
		.setRectangleDropZone(100, 100) 
		.setName("Tube1-dropZone")

		this.tubeDropZone2 = this.add.zone(this.tube2.x-50, this.tube2.y-150, 100, this.tube2.height/2.3)
		.setRectangleDropZone(100, 100)
		.setName("Tube2-dropZone")

		this.benedictDropZone = this.add.zone(this.benedictSol.x-60, this.benedictSol.y-150, 120, this.benedictSol.height/2.5)
		.setRectangleDropZone(100, 100)
		.setName("Benedict-dropZone")

		this.beakerDropZone = this.add.zone(this.beaker.x-100, this.beaker.y-150, this.beaker.width/2.1, this.beaker.height/1.4)
		.setRectangleDropZone(100, 100)
		.setName("beaker-dropzone").disableInteractive(); // Not accepting input in the first scene
		
	

		
		this.events.emit("scene-awake");
	}

	private changeToBeakerScene(): void {
		if ((this.tube1FilledBenedict && this.tube2FilledBenedict) && !this.hasChangedToBeakerScene) {
			this.benedictSol.setVisible(false);
			this.dropper.setVisible(false);
			this.tube1.setVisible(false);
			this.tube2.setVisible(false);

			

			this.tubeDropZone1.disableInteractive();
			this.tubeDropZone2.disableInteractive();
			this.benedictDropZone.disableInteractive();

			
			this.beakerDropZone.setInteractive();

			this.waterBottle.setVisible(true); // <== This line only runs once now
			this.beaker.setVisible(true);

			this.hasChangedToBeakerScene = true; // ✅ Prevent further triggers
		}
	}

	// Co function
	private onTimerEndReaction() {
		this.shouldUpdateReactionTimer = false;

		// Send the signal that the lab is finished.
		EventBus.emit("lab-completed", {
			success: true,
		})

	}
	private onTimerEnd() {
        
		console.log("Timer ended. Execute logic here.");
		// Your post-timer logic goes here

		// Update these independent factors
		this.boiled = true;
		if (this.boiled) this.beaker.setTexture("boilwater");
		this.shouldUpdateTimer = false;

		// Remove fire
		this.fire.setVisible(false);
		this.fireButton.setVisible(false);
		this.waterBottle.setVisible(false);


		// To reuse the function
		this.timerActive = false;

		this.tube1.setVisible(true);
		this.tube1.setPosition(this.scale.width/1.3, this.scale.height/2);
		this.tube1.setInteractive();
		this.input.setDraggable(this.tube1);
		this.tube2.setVisible(true);
		this.tube2.setPosition(this.scale.width/5, this.scale.height/2);
		this.tube2.setInteractive()
		this.input.setDraggable(this.tube2);
	

		
		


    }

	private startTimer() {
		this.shouldUpdateTimer = true;
		this.timerActive = true;
		this.remainingTime = this.countdown;
		this.instructionText.setText((this.remainingTime / 1000).toFixed(1) + 's');

		
    }

	private startTimerReaction() {
		this.shouldUpdateReactionTimer = true;
        this.reactionTimerActive = true;
        this.remainingTime = this.reactionCountdown;
        this.instructionText.setText((this.remainingTime / 1000).toFixed(1) + 's');

		
	}

	private handleFireButton(): void {
		this.fire.setPosition(this.scale.width/2, this.scale.height/2+150);
		this.fire.setVisible(true)

		if (!this.timerActive) {
			this.startTimer();
			
		}

	}
	private updateTimer(delta: number): void {
		console.log("Update Timer starts");
		if (this.timerActive) {
			this.remainingTime -= delta;

			

			this.setInstructionText(
				Math.max(this.remainingTime / 1000, 0).toFixed(1) + 's', 
				this.PRIORITY_LEVELS.TIMER_DISPLAY
			);

			if (this.remainingTime <= 0) {
				this.timerActive = false;
				this.resetInstructionPriority();
				this.onTimerEnd();
				
			}
		}
	}

	// Variables for this function only
	private reactionColors = ["benedic_0","benedic_1", "benedic_2", "benedic_3", "benedic_4"];
	private reactionStep = 0;
	private reactionCountdown = 30000; // total countdown (ms)
	private reactionStepInterval = 6000; // change every 2s

	private selectedTubeForReaction: Phaser.GameObjects.Sprite | null = null;
	private updateTimerReaction(delta: number, selectedTube: Phaser.GameObjects.Sprite): void {
		
		if (this.reactionTimerActive) {
            this.remainingTime -= delta;
			

            // Update timer display
            this.setInstructionText(
				Math.max(this.remainingTime / 1000, 0).toFixed(1) + 's', 
				this.PRIORITY_LEVELS.TIMER_DISPLAY
			);

			const timePassed = this.reactionCountdown - this.remainingTime;
			const newStep = Math.floor(timePassed / this.reactionStepInterval);

			if (newStep > this.reactionStep && newStep < this.reactionColors.length) {
				this.reactionStep = newStep;

				const newColor = this.reactionColors[this.reactionStep];
				console.log("Update color to:", newColor);

				this.selectedTubeForReaction.setTexture(newColor);
			}
			// End call the end function
            if (this.remainingTime <= 0) {
                this.reactionTimerActive = false;
				
                this.onTimerEndReaction();
				this.resetInstructionPriority();
				console.log("Condition update timer reaction")
            }
        }
	}


	private reaction(delta: number, selectedTube: Phaser.GameObjects.Sprite): void {
		if (!this.reactionTimerActive) {
			this.startTimerReaction();
			this.selectedTubeForReaction = selectedTube;

		}
	}

	private currentInstructionPriority: number = 0;
	private instructionUpdateTimer: number = 0;
	private instructionUpdateDelay: number = 100; // Update every 100ms instead of every frame

	// Priority levels (higher number = higher priority)
	private readonly PRIORITY_LEVELS = {
		DEFAULT: 0,
		SYRUP_ADDING: 1,
		BENEDICT_PREPARATION: 2,
		BENEDICT_ADDING: 3,
		WATER_FILLING: 4,
		BOILING: 5,
		TUBE_REACTION: 6,
		TIMER_DISPLAY: 10 // Highest priority for timers
	};

	// Method to set instruction text with priority
	private setInstructionText(text: string, priority: number = 0, force: boolean = false): void {
		if (force || priority >= this.currentInstructionPriority) {
			this.instructionText.setText(text);
			this.currentInstructionPriority = priority;
		}
	}

	// Method to clear instruction priority (call this when a step is completed)
	private clearInstructionPriority(): void {
		this.currentInstructionPriority = 0;
	}

	// Method to reset instruction priority to a lower level
	private resetInstructionPriority(newPriority: number): void {
		this.currentInstructionPriority = newPriority;
	}

	// Logical Game Flow functions

	private reactionFinished: boolean = false;
	private putTubeInBeaker(delta: number): void {
		
		if (!this.hasSummonTubes) {
			
			if (this.triggerActivatedWaterBot && this.hasShownBoilInstruction && this.updateWaterFinished && this.boiled && !this.reactionFinished) {
				this.clearInstructionPriority();
				this.setInstructionText(`นำหลอดทดลองที่ 1 นำไปวางในบีกเกอร์ที่มีน้ำอุณหภูมิอุ่น เเละนำหลอดทดลองที่ 2 ไว้ในอุณหภูมิห้อง 
					เพื่อเริ่มดูเเละศึกษาปฏิกิริยาหลังจากเวลาผ่านไปให้สังเกตสีของหลอดทดลองที่ 1 เเละ 2 

					หมายเหตุ: จะใช้หลอดทดลองใดเป็นหลอดทดลองที่ 1 ก็ได้และอีกอันที่ไม่ได้นำไปวางในบีกเกอร์ให้เป็นหลอดทดลองที่ 2`, this.PRIORITY_LEVELS.TUBE_REACTION);
			}

			const tube1InsideBeaker = Phaser.Geom.Rectangle.ContainsPoint(this.beakerDropZone, this.tube1);
			const tube2InsideBeaker = Phaser.Geom.Rectangle.ContainsPoint(this.beakerDropZone, this.tube2);

			if ((this.currentDraggedObject === this.tube1) && (tube1InsideBeaker && (this.tube1InBeakerCount == 0))) {
				
				if (this.tube1InBeakerCount == 0) this.tube1InBeakerCount++;
				console.log("Tube1 in beaker");
				this.holdTimeTube1 += delta;
				this.progressBarTube1.setVisible(true);
				this.tube1InBeaker = true;

				this.reaction(delta, this.tube1)
			} else if ((this.currentDraggedObject ===  this.tube2) && (tube2InsideBeaker && (this.tube2InBeakerCount == 0))) {
				if (this.tube2InBeakerCount == 0) this.tube2InBeakerCount++;
				console.log("Tube2 in beaker")
				this.holdTimeTube2 += delta;
				this.progressBarTube2.setVisible(true);
				this.tube2InBeaker = true;

				this.reaction(delta, this.tube2)

				
			} else if ((this.currentDraggedObject == this.tube1) && !tube1InsideBeaker) {
				this.tube1InBeaker = false;
			} else if ((this.currentDraggedObject == this.tube2) && !tube2InsideBeaker) {
				this.tube2InBeaker = false;
			}
			else {
				this.holdTimeTube1 = 0;
				this.progressBarTube1.setVisible(false);
			}
		}
	}
	private hasShownBoilInstruction: boolean = false;
	private updateWaterFinished: boolean = false;
	
	private updateWaterBottle(delta: number, time: number): void {
		const bottleInsideBeaker = Phaser.Geom.Rectangle.ContainsPoint(this.beakerDropZone, this.waterBottle);
		
		

		// Check if the tube is filled with benedict solution?
		if (!this.beakerFilled) {
			if (this.triggerActivatedDropper && !this.timerActive) {
				this.setInstructionText("เติมน้ำลงในบีกเกอร์เปล่าปริมาณ 200 มิลลิลิตร (mL)", this.PRIORITY_LEVELS.WATER_FILLING);
			}
			// Check for touching both ones
			if ((this.currentDraggedObject === this.waterBottle) && bottleInsideBeaker) {
				
				this.holdTimeWaterBot += delta;
				this.progressBarWaterBottle.setVisible(true);

				const progress = Phaser.Math.Clamp(this.holdTimeWaterBot / this.holdTimeNeeded, 0, 1);
				const barWidth = 100;
				const barHeight = 10;

				this.progressBarWaterBottle.clear();
				this.progressBarWaterBottle.fillStyle(0x00ff00, 1);
				this.progressBarWaterBottle.fillRect(
					this.waterBottle.x - barWidth / 2,
					this.waterBottle.y - 80,
					barWidth * progress,
					barHeight
				);

				if (this.holdTimeWaterBot >= this.holdTimeNeeded) {
					
					this.progressBarWaterBottle.setVisible(false);
					this.beakerFilled = true;

					this.fireButton.setVisible(true);

					
					
				}
			} else {
				this.holdTimeWaterBot = 0;
				this.progressBarWaterBottle.setVisible(false);
			}
		} else {
			if (!this.updateWaterFinished) {
				let countdownTimeSec = (this.countdown / 1000).toFixed(1);
				this.setInstructionText(
					`ต้มนํ้าโดยใช้เวลา ${countdownTimeSec} วินาที`, 
					this.PRIORITY_LEVELS.BOILING
				);
				this.beaker.setTexture("beaker_water")
				this.hasShownBoilInstruction = true;
				this.updateWaterFinished = true;
				this.triggerActivatedWaterBot = true;
			}
			
		}

	}
	private updateDropBenedictToTube(delta: number): void {
		const dropperInsideDropZone1 = Phaser.Geom.Rectangle.ContainsPoint(this.tubeDropZone1, this.dropper);
		const dropperInsideDropZone2 = Phaser.Geom.Rectangle.ContainsPoint(this.tubeDropZone2, this.dropper);


		
		
		if (this.tube1FilledBenedict && this.tube2FilledBenedict) {
			this.triggerActivatedDropper = true;
			this.clearInstructionPriority(); // Clear when both tubes are filled with benedict
		}
		// Check if the tube is filled with benedict solution?


		if ((!this.tube1FilledBenedict)) {
			// Check for touching both ones
			if ((this.currentDraggedObject === this.dropper) && dropperInsideDropZone1 && this.dropperFilled) {
				console.log("Dropper 1 in tube")
				this.holdTimeDropper += delta;
				this.progressBarDropper.setVisible(true);

				const progress = Phaser.Math.Clamp(this.holdTimeDropper / this.holdTimeNeeded, 0, 1);
				const barWidth = 100;
				const barHeight = 10;

				this.progressBarDropper.clear();
				this.progressBarDropper.fillStyle(0x00ff00, 1);
				this.progressBarDropper.fillRect(
					this.dropper.x - barWidth / 2,
					this.dropper.y - 80,
					barWidth * progress,
					barHeight
				);

				if (this.holdTimeDropper >= this.holdTimeNeeded) {
					
					this.progressBarDropper.setVisible(false);
					this.dropperFilled = false;
					
					// Add your logic here

					this.tube1.setTexture("benedic_0")
					this.tube1FilledBenedict = true;
					this.dropperFilled = false; // When you add the benedict solution into the tube you need to refill

					

					
				}
			} else {
				this.holdTimeDropper = 0;
				this.progressBarDropper.setVisible(false);
			}
		} else if (!this.tube2FilledBenedict) {
			// Check for touching both ones
			if ((this.currentDraggedObject === this.dropper) && dropperInsideDropZone2 && this.dropperFilled) {
				
				console.log("dropper 2 in tube")
				this.holdTimeDropper += delta;
				this.progressBarDropper.setVisible(true);

				const progress = Phaser.Math.Clamp(this.holdTimeDropper / this.holdTimeNeeded, 0, 1);
				const barWidth = 100;
				const barHeight = 10;

				this.progressBarDropper.clear();
				this.progressBarDropper.fillStyle(0x00ff00, 1);
				this.progressBarDropper.fillRect(
					this.dropper.x - barWidth / 2,
					this.dropper.y - 80,
					barWidth * progress,
					barHeight
				);

				if (this.holdTimeDropper >= this.holdTimeNeeded) {
					
					this.progressBarDropper.setVisible(false);
					
					// Add your logic here

					this.tube2.setTexture("benedic_0")
					this.tube2FilledBenedict = true;
					this.dropperFilled = false; // When you add the benedict solution into the tube you need to refill

					

					
				}
			} else {
				this.holdTimeDropper = 0;
				this.progressBarDropper.setVisible(false);
			}
		} 
		else {
			this.changedSceneToBeaker = true;
		}
		
		
	}

	private updateSyrupProgress(delta: number): void {
		const syrupInsideDropZone1 = Phaser.Geom.Rectangle.ContainsPoint(this.tubeDropZone1, this.syrupBottle);
		const syrupInsideDropZone2 = Phaser.Geom.Rectangle.ContainsPoint(this.tubeDropZone2, this.syrupBottle);

		if (this.tube1FilledBenedict && this.tube2FilledBenedict) {
			this.hasAddedBenedictOnce = true;
		}
		// Check for touching both ones
		
		if ((this.currentDraggedObject === this.syrupBottle) && (syrupInsideDropZone1 || syrupInsideDropZone2)) {
			this.holdTimeSyrup += delta;
			this.progressBarSyrup.setVisible(true);

			const progress = Phaser.Math.Clamp(this.holdTimeSyrup / this.holdTimeNeeded, 0, 1);
			const barWidth = 100;
			const barHeight = 10;

			this.progressBarSyrup.clear();
			this.progressBarSyrup.fillStyle(0x00ff00, 1);
			this.progressBarSyrup.fillRect(
				this.syrupBottle.x - barWidth / 2,
				this.syrupBottle.y - 80,
				barWidth * progress,
				barHeight
			);

			if (this.holdTimeSyrup >= this.holdTimeNeeded) {
				this.triggerActivatedSyrup = true;
				this.progressBarSyrup.setVisible(false);
				
				// Add your logic here

				if (syrupInsideDropZone1) {
					this.tube1.setTexture("tube_Syrub")
					this.tube1Filled = true;
				} else {
					this.tube2.setTexture("tube_Syrub")
					this.tube2Filled = true;
				}

				

				
			}
		} else {
			this.holdTimeSyrup = 0;
			this.progressBarSyrup.setVisible(false);
		}
	
		
	}
	private updateBenedictProgress(delta: number): void {

		
		if (this.tube1Filled && this.tube2Filled && !this.hasAddedBenedictOnce) {
			// Benedict Sol logic starts here
			
			this.holdTime = 0;
			this.syrupBottle.destroy();

			if (this.dropperFilled) {
				this.setInstructionText(
					`ใช้ดรอปเปอร์หยดสารละลายเบเนดิกซ์ (สูตรเคมีเหมือนเดิม) ลงในหลอดการทดลองทั้ง 2 หลอด 
					ด้วยปริมาณ 3 มิลลิลิตร (mL) เเละสังเกตสีที่เปลี่ยนไปในหลอดทดลอง

					หมายเหตุ: *** เมื่อหยดสารละลายเบเนดิกซ์ลงในหลอดทดลองที่ 1 เเล้วจำเป็นต้องใช้ดรอปเปอร์ดูดสารละลายเบเนดิกซ์อีกครั้ง 
					เพื่อหยดลงในหลอดการทดลองที่ 2 ***`, 
					this.PRIORITY_LEVELS.BENEDICT_ADDING
				);
			} else {
				this.setInstructionText(
					`ใช้ดรอปเปอร์ดูดสารละลายเบเนดิกซ์ (CuSO₄·5H₂O) จากกรวยรูปชมพู่ปริมาณ 3 มิลลิลิตร (mL)

					หมายเหตุ: *** เมื่อหยดสารละลายเบเนดิกซ์ลงในหลอดทดลองที่ 1 เเล้วจำเป็นต้องใช้ดรอปเปอร์ดูดสารละลายเบเนดิกซ์อีกครั้ง 
					เพื่อหยดลงในหลอดการทดลองที่ 2 ***`, 
					this.PRIORITY_LEVELS.BENEDICT_PREPARATION
				);
			}
			

			this.benedictSol.setVisible(true);
			this.dropper.setVisible(true);
			
			

			const dropperInsideDropZone = Phaser.Geom.Rectangle.ContainsPoint(this.benedictDropZone, this.dropper)

			if (((this.currentDraggedObject === this.dropper) && dropperInsideDropZone) && !this.dropperFilled) {
				this.holdTimeBenedict += delta;
				this.progressBarBenedict.setVisible(true);

				const progress = Phaser.Math.Clamp(this.holdTimeBenedict / this.holdTimeNeeded, 0, 1);
				const barWidth = 100;
				const barHeight = 10;

				this.progressBarBenedict.clear();
				this.progressBarBenedict.fillStyle(0x00ff00, 1);
				this.progressBarBenedict.fillRect(
					this.benedictSol.x - barWidth / 2,
					this.benedictSol.y - 80,
					barWidth * progress,
					barHeight
				);

				if (this.holdTimeBenedict >= this.holdTimeNeeded) {
					this.triggerActivatedBenedict = true;
					this.dropperFilled = true;
					this.progressBarBenedict.setVisible(false);

					

					// Pop up text when the dropper is filled


				}
			}
			else {
				this.holdTimeBenedict = 0;
				this.progressBarBenedict.setVisible(false);
			}
		}
	}
	

	/* START-USER-CODE */

	update(time: number, delta: number): void {
		this.updateSyrupProgress(delta); // Syrup into tubes
		this.updateBenedictProgress(delta); // Dropper to benedict 
		this.updateDropBenedictToTube(delta); // Dropper to tubes
		this.updateWaterBottle(delta, time); // Bottle fill beaker
		if (!this.hasChangedToBeakerScene) this.changeToBeakerScene();
		if (this.shouldUpdateTimer) this.updateTimer(delta);
		this.putTubeInBeaker(delta);
		if (this.shouldUpdateReactionTimer) this.updateTimerReaction(delta);
		
		
		
		
		
		

		
	}
	

	// Write your code here

	create() {

        this.editorCreate();

        this.cameras.main.setBackgroundColor(0x00ff00);

        EventBus.emit('current-scene-ready', this);

	}

    changeScene ()
    {
        this.scene.start('GameOver');
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
