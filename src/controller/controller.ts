import {View} from '../view/view';
import {GameModal} from '../models/gameModal';

export class Controller {
    
    private gameModal: GameModal;
    private view: View;
    private isPlaying: boolean;
    private interval: any = null;
    constructor(view: View, gameModal: GameModal) {
        this.gameModal = gameModal;
        this.view = view;
        this.isPlaying = false;
        this.interval = null
    }
    
    startGame() {

        document.addEventListener('keydown', this.handleKeyDown.bind(this))    

        this.gameModal.start()
        this.view.render()
        this.update();
        
    }

    startTimer() {
        let speed = 400 - this.gameModal.getStateSpeed() * 10;

        if(!this.interval) {
            this.interval = setInterval(() =>{
                this.update();
            }, speed > 0 ? speed : 400)
        }
    }

    stopTimer() {
        if(this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    updateView() {
        if (this.gameModal.getStateIsGameOver()) {
            this.gameOver();    
        }
        this.view.update(this.gameModal.getStatePlayField(), 
                        this.gameModal.getStateCurrentScore(), 
                        this.gameModal.getStateSpeed());
    }
    
    pause() {
        this.isPlaying = false;
        this.stopTimer();


    }
    play() {
        this.isPlaying = true;
        this.startTimer();
        this.updateView();

    }

    handleKeyDown(event: any) {
        switch(event.key) {
            case 'Enter': 
                if (this.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }
                break
            case 'ArrowLeft':
                this.gameModal.moveLeft();
                this.updateView();

                break
            case 'ArrowRight': 
                this.gameModal.moveRight();
                this.updateView();
                
                break
        }
    }
    update() {
        this.gameModal.wallsMove();
        this.gameModal.addBarrage();
        this.gameModal.barragesMoveDown();
        this.updateView();

    }
    gameOver() {
        this.startGame();
    }
}