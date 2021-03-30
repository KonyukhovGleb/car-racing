export class View {
    
    rootDOMElement: any = null;
    widthGameField: number = 0;
    heigthGameField: number = 0;

    constructor(nameRootElement: string, widthGameField: number, heigthGameField: number ) {
        this.rootDOMElement = this.getDOMElement(nameRootElement);
        this.widthGameField = widthGameField;
        this.heigthGameField = heigthGameField;
    }

    getDOMElement(nameElement: string):  HTMLElement | null { 
        let DOMelement = document.getElementById(nameElement);
        return DOMelement;
    }

    render() {
        let stringHTML:any = this.generatePlayField(this.widthGameField, this.heigthGameField) 
                        + this.generateSideBar();
        this.rootDOMElement.innerHTML = stringHTML;
    }

    update(playField:Array<Array<number>>, currentScore: number, speed: number) {
        
        let currentScoreHTML:any = document.getElementById('current-score');
        let speedHTML:any = document.getElementById('speed');

        currentScoreHTML.innerHTML = `<span> score: ${currentScore}</span>` 
        speedHTML.innerHTML = `<span> speed: ${speed}</span>`

        for(let y: number = 0; y < this.heigthGameField; y++) {
            for (let x: number = 0; x < this.widthGameField; x++) {
                let elem:any = document.getElementById(`${y}-${x}`);
                if (playField[y][x] == 1 || playField[y][x] == 2) {
                    elem.classList.remove("no-active-field")
                    elem.classList.add("active-field")

                } else {
                    elem.classList.remove("active-field")
                    elem.classList.add("no-active-field")

                }
            }
        }   
    }

    generatePlayField(widthGameField: number, heigthGameField: number): string {
        let stringHTML: string = "<div class='conainer'><table>"; 
        for (let y: number = 0; y < heigthGameField; y++) {
            stringHTML += "<tr>";
            for (let x: number = 0; x < widthGameField; x++) {

                stringHTML += `<td id=${y}-${x}></td>` ;
            }
            stringHTML += "</tr>"
        }
        stringHTML += "</table></div>"
        return stringHTML;
    }
    generateSideBar(): string {
        let stringHTML: string = 
        `<div class="side-bar">
            <div class="table-scores">
                <span>Results</span>
                <div>
                    <div id="current-score"></div>
                    <div id="speed"></div>
                <div>
            </div>
            <div>
                </br>
                <span> Enter - pause</span>
                </br>
                <span> Arrows - left / right</span>
            </div>
        </div>`; 
        return stringHTML;
    }

} 