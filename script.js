


var playerNumber = 1;
var computerNumber = 1;
var totalPlayer = 0;
var activePlayerIndex = 0;
var totalMatchsticks;
var allPlayersLoop;

start();

function start() {

    let player = document.getElementById('player');
    let computer = document.getElementById('computer');
    let playButton = document.getElementById('playButton');
    playButton.addEventListener('click', checkCreateArena);
    player.addEventListener('click', addPlayer);
    computer.addEventListener('click', addComputer);
    playerNumber = 1;
    computerNumber = 1;
    totalPlayer = 0;
    activePlayerIndex = 0;
    totalMatchsticks;
    allPlayersLoop;


}

function addPlayer(e) {


    let string = `<div id="player-${playerNumber}"> Player-${playerNumber}
    <textarea id="player${playerNumber}" maxlength="10" placeholder="player name" rows="1" onfocus="disableEnter()" spellcheck="false" ></textarea>
    <span class="minus" id="minusplayer${playerNumber}"></span>
    </div>`;
    document.getElementById('container3').insertAdjacentHTML('beforeend', `${string}`);
    document.getElementById(`minusplayer${playerNumber}`).addEventListener('click', removePlayer);
    playerNumber = playerNumber + 1;
    totalPlayer = totalPlayer + 1;
}


function addComputer(e) {

    let string = `<div class="computer" id="Computer-${computerNumber}"> Computer-${computerNumber}
    <textarea id="computer${computerNumber}" maxlength="10" placeholder="computer name" rows="1" onfocus="disableEnter()" spellcheck="false"></textarea>
    <span class="minus" id="minuscomputer${computerNumber}"></span>
    </div>`;
    document.getElementById('container3').insertAdjacentHTML('beforeend', `${string}`);
    document.getElementById(`minuscomputer${computerNumber}`).addEventListener('click', removePlayer);
    computerNumber = computerNumber + 1;
    totalPlayer = totalPlayer + 1;
}


function checkCreateArena() {
    if (document.getElementById('container3').childElementCount >= 2) {
        createArena();
    }
    else {
        alert("Please add atleast two players 🙏🙏.");
    }
}


function createArena(e) {
    totalMatchsticks = totalPlayer * 10 + 1;
    let playersCollection = document.getElementById('container3').children;
    let players = document.getElementById('container3').innerHTML;

    let arena = `<div class="arena" id="arena"><div>`;
    document.getElementById('main').innerHTML = `${arena}`;

    let playerContainer = `<div class="playercontainer" id="playercontainer">
    </div>`;

    let controlContainer = `<div class="controlContainer" id="controlContainer">
    <button class="controlBtn" id="btn1">1</button>
    <button class="controlBtn" id="btn2">2</button>
    <button class="controlBtn" id="btn3">3</button>
    <button class="controlBtn" id="btn4">4</button>
    </div>`;

    let matchsticksContainer = `<div class="matchstickscontainer" id="matchsticksContainer">
    Matchsticks :<span id=totalmatchsticks>${totalMatchsticks}</span>
    </div>`;

    document.getElementById('arena').insertAdjacentHTML('beforeend', `${playerContainer}`);

    for (let i = 0; i < playersCollection.length; i++) {

        if (playersCollection[i].firstElementChild.value !== "") {
            let child = playersCollection[i].innerHTML = playersCollection[i].firstElementChild.value;
            let currentid = playersCollection[i].id;
            let currentclass = playersCollection[i].id;

            if (playersCollection[i].className == "computer") {
                child = `<div class="com playercss ${currentclass}" id="${currentid}">
                `+ `${child}`
                    + `</div>`;
                document.getElementById("playercontainer").insertAdjacentHTML('beforeend', `${child}`);
            }
            else {
                child = `<div class="playercss ${currentclass}" id="${currentid}">
                `+ `${child}`
                    + `</div>`;
                document.getElementById("playercontainer").insertAdjacentHTML('beforeend', `${child}`);
            }

        }
        else {
            let child = playersCollection[i].innerHTML = playersCollection[i].innerText;
            let currentid = playersCollection[i].id;
            let currentclass = playersCollection[i].id;

            if (playersCollection[i].className == "computer") {
                child = `<div class="com playercss ${currentclass}" id="${currentid}">
                `+ `${child}`
                    + `</div>`;
                document.getElementById("playercontainer").insertAdjacentHTML('beforeend', `${child}`);
            }
            else {
                child = `<div class="playercss ${currentclass}" id="${currentid}">
                `+ `${child}`
                    + `</div>`;
                document.getElementById("playercontainer").insertAdjacentHTML('beforeend', `${child}`);
            }
        }

    }

    document.getElementById('arena').insertAdjacentHTML('beforeend', `${controlContainer}`);
    document.getElementById('arena').insertAdjacentHTML('beforeend', `${matchsticksContainer}`);

    gameLogic();

}


function gameLogic() {



    let playersLoop = document.getElementsByClassName('playercss');
    setActivePlayer(playersLoop[activePlayerIndex]);
    allPlayersLoop = playersLoop;
    activeBtn();
    if (allPlayersLoop[activePlayerIndex].classList[0] == "com") {
        disableBtn();
        setTimeout(() => {
            activeBtn();
            comClick();
        }, 1000);
    }

}



function btnClick(e) {
    let temp = true;
    if (e.target.id == "btn1" && totalMatchsticks >= 1) {
        checkLost(e.target.id);
        document.getElementById('totalmatchsticks').innerHTML = `${totalMatchsticks - 1}`;
        totalMatchsticks = totalMatchsticks - 1;
    }

    else if (e.target.id == "btn2" && totalMatchsticks >= 2) {
        checkLost(e.target.id);
        document.getElementById('totalmatchsticks').innerHTML = `${totalMatchsticks - 2}`;
        totalMatchsticks = totalMatchsticks - 2;
    }

    else if (e.target.id == "btn3" && totalMatchsticks >= 3) {
        checkLost(e.target.id);
        document.getElementById('totalmatchsticks').innerHTML = `${totalMatchsticks - 3}`;
        totalMatchsticks = totalMatchsticks - 3;
    }

    else if (e.target.id == "btn4" && totalMatchsticks >= 4) {
        checkLost(e.target.id);
        document.getElementById('totalmatchsticks').innerHTML = `${totalMatchsticks - 4}`;
        totalMatchsticks = totalMatchsticks - 4
    }
    else {
        if (allPlayersLoop[activePlayerIndex].classList[0] == "com") {
            disableBtn();
            setTimeout(() => {
                activeBtn();
                comClick();
            }, 10);
        }
        else {
            alert("matchsticks are not enough");
        }
        temp = false;
    }

    if (temp == true) {

        disableActivePlayer(allPlayersLoop[activePlayerIndex]);
        nextPlayer();
        setActivePlayer(allPlayersLoop[activePlayerIndex]);
        if (allPlayersLoop[activePlayerIndex].classList[0] == "com") {
            disableBtn();
            setTimeout(() => {
                activeBtn();
                comClick();
            }, 1000);
        }

    }
}


comClick = () => {
    let randomBtn = Math.floor(Math.random() * 4);
    let randomBtnArray = new Array("btn1", "btn2", "btn3", "btn4");
    document.getElementById(`${randomBtnArray[randomBtn]}`).click();
}


checkLost = (btnid) => {
    if (btnid == "btn1" && totalMatchsticks == 1) {
        alert(allPlayersLoop[activePlayerIndex].innerText + " lost!!");
        if (totalPlayer > 2) {
            allPlayersLoop[activePlayerIndex].remove();
            // nextPlayer();   
            activePlayerIndex = 0;
            totalPlayer = totalPlayer - 1;
            totalMatchsticks = totalPlayer * 10 + 1;
        }
        else {
            nextPlayer();
            document.getElementById('main').innerHTML =
                `<div class="woncontainer" id="woncontainer">
            <div class="wondiv" id="wondiv">`+ allPlayersLoop[activePlayerIndex].innerText + " <br>WON"
                + `</div>
                <button class="controlBtn menuBtn" id="menuBtn">Menu</button>
            </div>`;
            document.getElementById('menuBtn').addEventListener('click', createMenu);

        }
    }
    else if (btnid == "btn2" && totalMatchsticks == 2) {
        alert(allPlayersLoop[activePlayerIndex].innerText + " lost!!");
        if (totalPlayer > 2) {
            allPlayersLoop[activePlayerIndex].remove();
            // nextPlayer();
            activePlayerIndex = 0;
            totalPlayer = totalPlayer - 1;
            totalMatchsticks = totalPlayer * 10 + 1;
        }
        else {
            nextPlayer();
            document.getElementById('main').innerHTML =
                `<div class="woncontainer" id="woncontainer">
            <div class="wondiv" id="wondiv">`+ allPlayersLoop[activePlayerIndex].innerText + " <br>WON"
                + `</div>
                <button class="controlBtn menuBtn" id="menuBtn">Menu</button>
            </div>`;
            document.getElementById('menuBtn').addEventListener('click', createMenu);

        }
    }
    else if (btnid == "btn3" && totalMatchsticks == 3) {
        alert(allPlayersLoop[activePlayerIndex].innerText + " lost!!");
        if (totalPlayer > 2) {
            allPlayersLoop[activePlayerIndex].remove();
            // nextPlayer();
            activePlayerIndex = 0;
            totalPlayer = totalPlayer - 1;
            totalMatchsticks = totalPlayer * 10 + 1;
        }
        else {
            nextPlayer();
            document.getElementById('main').innerHTML =
                `<div class="woncontainer" id="woncontainer">
            <div class="wondiv" id="wondiv">`+ allPlayersLoop[activePlayerIndex].innerText + " <br>WON"
                + `</div>
                <button class="controlBtn menuBtn" id="menuBtn">Menu</button>
            </div>`;
            document.getElementById('menuBtn').addEventListener('click', createMenu);

        }
    }
    else if (btnid == "btn4" && totalMatchsticks == 4) {
        alert(allPlayersLoop[activePlayerIndex].innerText + " lost!!");
        if (totalPlayer > 2) {
            allPlayersLoop[activePlayerIndex].remove();
            // nextPlayer();
            activePlayerIndex = 0;
            totalPlayer = totalPlayer - 1;
            totalMatchsticks = totalPlayer * 10 + 1;
        }
        else {
            nextPlayer();
            document.getElementById('main').innerHTML =
                `<div class="woncontainer" id="woncontainer">
            <div class="wondiv" id="wondiv">`+ allPlayersLoop[activePlayerIndex].innerText + " <br>WON"
                + `</div>
                <button class="controlBtn menuBtn" id="menuBtn">Menu</button>
            </div>`;
            document.getElementById('menuBtn').addEventListener('click', createMenu);

        }
    }
}







nextPlayer = () => {
    if (activePlayerIndex == totalPlayer - 1) {
        activePlayerIndex = 0;
    }
    else {
        activePlayerIndex = activePlayerIndex + 1;
    }
}


disableBtn = () => {
    document.getElementById('btn1').removeEventListener('click', btnClick);
    document.getElementById('btn2').removeEventListener('click', btnClick);
    document.getElementById('btn3').removeEventListener('click', btnClick);
    document.getElementById('btn4').removeEventListener('click', btnClick);
}

activeBtn = () => {
    let btn1 = document.getElementById('btn1');
    let btn2 = document.getElementById('btn2');
    let btn3 = document.getElementById('btn3');
    let btn4 = document.getElementById('btn4');
    btn1.addEventListener('click', btnClick);
    btn2.addEventListener('click', btnClick);
    btn3.addEventListener('click', btnClick);
    btn4.addEventListener('click', btnClick);
}


function disableActivePlayer(p) {
    p.classList.remove('activeplayer');
}


function setActivePlayer(p) {
    p.classList += " activeplayer";
}


function disableEnter() {
    document.activeElement.addEventListener('keypress', function (e) {
        if (e.keycode === 13 || e.which === 13) {
            e.preventDefault();
            return false;
        }
    });
}



function removePlayer(e) {
    document.getElementById(e.target.id).parentNode.parentNode.removeChild(document.getElementById(e.target.id).parentNode);
    playerNumber = playerNumber - 1;
    totalPlayer = totalPlayer - 1;
}




function createMenu() {

    document.getElementById('main').innerHTML = `<div class="container1" id="container1">
<button class="controlBtn" id="playButton">Play</button>
</div>
<div class="container2" id="container2">
<button class="player controlBtn" id="player">Player</button>
<button class="computer controlBtn" id="computer">Computer</button>
</div>
<div class="container3" id="container3"></div>`;
    start();

}