
let isMainPageVisible = true;
let isGamePageVisible = false;

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

let mainPage, gamePage;
let showMyNftsBtn, sendToFightBtn, trainOptionInput, fightOptionInput;
let loggerElement;

let isTrainSelected;

function onDOMContentLoaded() {
    console.log('DOMContentLoaded');
    mainPage = document.getElementById('main-page');
    gamePage = document.getElementById('game-page');

    loggerElement = document.getElementById('logs-messages');

    showMyNftsBtn = document.getElementById('show-my-nfts-btn');
    sendToFightBtn = document.getElementById('send-to-fight-btn');

    trainOptionInput = document.getElementById('train-option');
    fightOptionInput = document.getElementById('fight-option');

    showMyNftsBtn.addEventListener('click', () => {
        gamePage.style = "display: none"
        mainPage.style = ""
    });

    trainOptionInput.addEventListener('change', (e) => {
        isTrainSelected = true
    })

    sendToFightBtn.addEventListener('click', () => {
        loggerElement.innerHTML = '';

        const log = doBattle();
        console.log(log, loggerElement);

        log.forEach(message => {
            const li = document.createElement('li');

            if (message.includes('(!) - ')) {
                li.innerHTML = message.replace('(!) - ', '');
                li.classList.add("message");
                li.classList.add("system-message");
                loggerElement.appendChild(li);
                return;
            }

            const img = document.createElement('img');
            const divContent = document.createElement('div');
            
            li.classList.add("message");
            divContent.classList.add("message-content");

            if (message.includes('(1) - ')) {
                const formattedMsg = message.replace('(1) - ', '');
                img.src = 'nft-avatar.png';

                li.classList.add("my-message");
                divContent.innerHTML = formattedMsg;
            } else {
                const formattedMsg = message.replace('(2) - ', '');
                img.src = 'enemy.png';

                divContent.innerHTML = formattedMsg;
            }

            li.appendChild(img);
            li.appendChild(divContent);

            loggerElement.appendChild(li);
        })

    });
}

function selectNftForGame(nftId = '0') {
    console.log('test', nftId, { mainPage, gamePage });

    mainPage.style = "display: none"
    gamePage.style = ""
}
