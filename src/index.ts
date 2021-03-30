import {GameModal} from "./models/gameModal"
import {View} from './view/view'
import {Controller} from './controller/controller'

const gameModal: GameModal = new GameModal();

const view: View = new View("root", 10, 20);

const controller: Controller = new Controller (view, gameModal);

controller.startGame() 



  

