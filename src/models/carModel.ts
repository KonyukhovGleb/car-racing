export class CarModel {

    //coordinates of the upper left corner 
    private x: number = 0;
    private y: number = 0;

    private heigthModel: number = 0;
    private widthModel: number = 0;

    private model: Array<Array<number>> = []


    constructor(x: number, y: number, model: Array<Array<number>>) {
        this.x = x;
        this.y = y;
        this.model = model;
        this.heigthModel = model.length
        this.widthModel = model[0].length
        
    }

    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }
    setX(x: number): void {
        this.x = x;
    }
    setY(y: number): void {
        this.y = y;
    }
    
    getModel(): Array<Array<number>> {
        return this.model;
    }
    
    setModel(model:Array<Array<number>>): void {
        this.model = model;
    }

    getHeigthModel(): number {
        return this.heigthModel;
    }
    getWidthModel(): number {
        return this.widthModel;
    }
    

}