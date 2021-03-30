import {CarModel} from './carModel';
import {BarrageModel} from './barrageModel';

export class GameModal {
    
    private currentScore: number = 0;
    private speed: number = 1;
    private isGameOver: boolean = false;

    private widthGameField: number = 10;
    private heigthGameField: number = 20;
    private playField: Array<Array<number>> = [];
    private arrayBarrages: Array<BarrageModel> = [];
    private tick: number = 0;

    constructor() {
        this.tick = 0;
        this.speed = 1;
        this.isGameOver = false;
        this.arrayBarrages = []; 
        this.playField = [
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]

    }

    arrayCarModel: Array<Array<number>> = [
        [0, 2, 0],
        [2, 2, 2],
        [0, 2, 0],
        [2, 0, 2]
    ]
    arrayBarrageModel: Array<Array<number>> = [
        [1, 0, 1],
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]
    ]

    carModel: CarModel = new CarModel(2, 16, this.arrayCarModel);
    ///////////////////////////////////////////////////////////////////////

    getStatePlayField(): Array<Array<number>> {
        const playFieldState = this.playField.slice()
        return playFieldState;
    }
    getStateIsGameOver(): boolean {
        return this.isGameOver;
    }
    getStateCurrentScore(): number {
        return this.currentScore;
    }
    
    getStateSpeed(): number {
        return this.speed;
    }

    moveLeft(): void {
        this.carModel.setX(2);
        this.update()
    }   

    moveRight(): void {
        this.carModel.setX(5);
        this.update();
    }
    restart() {
       this.constructor();
       this.start();
    }

    checkCollision(): void {
        
        const widthCar = this.carModel.getWidthModel();
        const coordX = this.carModel.getX();
        for(let y = 16; y < 20; y++){
            for (let x = coordX; x < coordX + widthCar; x++) {
                if(this.carModel.getModel()[this.heigthGameField - 1 - y][x - coordX] == 2 && 
                this.playField[y][x] == 1) {
                    this.isGameOver = true;
                }
            }
        }
    }

    carInit() {
        let randomValue = this.randomSide(0, 1) 
        this.carModel = new CarModel(randomValue, 16, this.arrayCarModel) 
    }

    lockCarPosition(): void {
        const widthCar = this.carModel.getWidthModel();
        let coordY = this.carModel.getY()
        let coordX = this.carModel.getX();
        this.checkCollision();
        for(let y = coordY; y < this.heigthGameField; y++){
            for (let x = coordX; x < coordX + widthCar; x++) {
                if(this.carModel.getModel()[y - coordY][x - coordX] == 2)
                    this.playField[y][x] = 2;  
            }
        }
        

    }
    start() {
        this.carInit();
        this.arrayBarrages = [];
        this.pushBarrage();
        this.update()
    }

    wallsMove(): void {
        let lastItem: number = this.playField[0][0]
        
        for(let y = 0; y < this.heigthGameField - 1; y++) {
            this.playField[y][0] = this.playField[y+1][0] 
            this.playField[y][9] = this.playField[y+1][9]
        }    

        this.playField[this.heigthGameField-1][0] = lastItem;                    
        this.playField[this.heigthGameField-1][9] = lastItem;                        
    }
    
    addBarrage() {
        this.tick++
        if(this.tick == 9) {
            this.tick = 0;
            this.currentScore += 100;
            this.speed += 1;
            this.pushBarrage();
        }
    }
    barragesMoveDown(): void {

        for (let i = 0; i < this.arrayBarrages.length; i++) {
            const element = this.arrayBarrages[i];
            let coordY = element.getY()
            coordY++;
            element.setY(coordY)
        
            this.lockBarrage(element);
            this.update();
            
        }
    }
    
    gameOver():void {   
        this.currentScore = 0;
        this.speed = 0;
        this.restart();
    }

    lockBarrage(barrage: BarrageModel) {
        const widthBarrage = this.carModel.getWidthModel();
        const heigthBarrage = this.carModel.getHeigthModel();
        const blocks = barrage.getModel();

        let coordX = barrage.getX();
        let coordY = barrage.getY();

        this.checkCollision();

        if(this.isGameOver) {
            this.gameOver();
            return            
        }
        for (let y = coordY; y < coordY + heigthBarrage; y++) {
            for (let x = coordX; x < coordX + widthBarrage; x++) {
                if(this.playField[y] === undefined) {
                    break
                } else {
                if(blocks[coordY + heigthBarrage - 1 - y][x - coordX] == 1)
                    this.playField[y][x] = 1;  
                }
            }            
        }
    }



    pushBarrage(): BarrageModel {
        let barrage: BarrageModel = this.generateBarrage(); 
        this.arrayBarrages.push(barrage);
        
        return barrage;
    }

    generateBarrage(): BarrageModel {
        let randomValue = this.randomSide(0, 1) 
        let barrage = new BarrageModel(randomValue, -5, this.arrayBarrageModel); 

        return barrage;
    }
    
    randomSide = (min: number, max: number) => {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        if(Math.round(rand) == 0){
            return 2;
        }
        return 5;

    }
        
    clearRoad(): void {
        for (let y = 0; y < this.heigthGameField; y++) {
            for (let x = 1; x < this.playField[0].length -1; x++) {
                if(this.playField[y][x] == 1 || 2){
                    this.playField[y][x] = 0;              
                }        
            }   
        }
    }
    
    update(): void {
        if(this.isGameOver) {
            this.gameOver();
            this.start();
            return
        }
        this.clearRoad();
        this.lockCarPosition();

        for (let i = 0; i < this.arrayBarrages.length; i++) {
            this.lockBarrage(this.arrayBarrages[i]);        
        }
    }
    

}