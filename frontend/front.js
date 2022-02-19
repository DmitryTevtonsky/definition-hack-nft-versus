
let isMainPageVisible = true;
let isGamePageVisible = false;

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

let mainPage, gamePage;
let showMyNftsBtn, sendToFightBtn, trainOptionInput, fightOptionInput;
let loggerElement;

let isTrainSelected;

function onDOMContentLoaded() {
    mainPage = document.getElementById('main-page');
    gamePage = document.getElementById('game-page');

    addDataToMainPage();

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

    addNftStats()
}

let nftName, lvl, rating, victories, defeats, confidence, exp;
let critic, insult, mockery, taunt;
let stressRessistance, selfIrony, wit;
let expProgress, confidenceProgress, availableSkillPoints;
function addNftStats() {
    nftName = document.getElementById('nftName');
    lvl = document.getElementById('lvl');
    rating = document.getElementById('rating');
    victories = document.getElementById('victories');
    defeats = document.getElementById('defeats');

    lvl.innerHTML = player1.lv;
    rating.innerHTML = player1.rating;
    victories.innerHTML = player1.victories;
    defeats.innerHTML = player1.defeats;

    exp = document.getElementById('exp');
    exp.innerHTML = `${player1.exp}/${levels[player1.lv + 1]}`;
    expProgress = document.getElementById('exp-progress');
    expProgress.value = player1.exp;
    expProgress.max = levels[player1.lv + 1];

    confidence = document.getElementById('confidence');
    confidence.innerHTML = `${player1.confidence}/${player1.confidence}`;
    confidenceProgress = document.getElementById('confidence-progress');
    confidenceProgress.value = player1.confidence;
    confidenceProgress.max = player1.confidence;

    critic = document.getElementById('critic');
    insult = document.getElementById('insult');
    mockery = document.getElementById('mockery');
    taunt = document.getElementById('taunt');
    critic.innerHTML = player1.critic;
    insult.innerHTML = player1.insult;
    mockery.innerHTML = player1.mockery;
    taunt.innerHTML = player1.taunt;

    stressRessistance = document.getElementById('stressResistance');
    selfIrony = document.getElementById('selfIrony');
    wit = document.getElementById('wit');
    stressRessistance.innerHTML = player1.stressRessistance;
    selfIrony.innerHTML = player1.selfIrony;
    wit.innerHTML = player1.wit;

    availableSkillPoints = document.getElementById('availableSkillPoints');

    if (player1.unallocatedPoins) {
        availableSkillPoints.innerHTML = `Нераспределенные 
        очки навыков: ${player1.unallocatedPoins}`;
    }
}


function addDataToMainPage() {
    myNftList = document.getElementById('my-nft-list');
    ratingList = document.getElementById('rating-list');

    nftList.forEach(item => {
        const myNftDiv = document.createElement('div');
        const myNftImg = document.createElement('img');
        const myNftH2 = document.createElement('h2');
        const myNfthStatsDiv = document.createElement('div');
        const myNftLevelH4 = document.createElement('h4');
        const myNftVictoriesH4 = document.createElement('h4');
        myNftLevelH4.innerHTML = `Уровень: ${item.level}`;
        myNftVictoriesH4.innerHTML = `Побед: ${item.wins}`;

        myNfthStatsDiv.appendChild(myNftLevelH4);
        myNfthStatsDiv.appendChild(myNftVictoriesH4);
        myNfthStatsDiv.classList.add('my-nft-stats');

        myNftDiv.classList.add('my-nft');

        myNftImg.src = item.image_src;
        myNftH2.innerHTML = item.name;
        myNftH2.classList.add('my-nft-name');
        

        myNftDiv.appendChild(myNftImg);
        myNftDiv.appendChild(myNftH2);
        myNftDiv.appendChild(myNfthStatsDiv);

        myNftList.appendChild(myNftDiv); 

        myNftDiv.addEventListener('click', () => selectNftForGame(item.id))
    });

    nftRankings.forEach((item, index) => {
        const nftDiv = document.createElement('div');

        const nftRatingH1 = document.createElement('h1');
        const nftImg = document.createElement('img');
        const nftH2 = document.createElement('h2');
        const nftStatsDiv = document.createElement('div');
        const nftLevelH4 = document.createElement('h4');
        const nftVictoriesH4 = document.createElement('h4');
        const nftRaribleBlockH4 = document.createElement('h4');
        const nftRaribleA = document.createElement('a');

        nftRatingH1.innerHTML = `${index+1} место`;
        nftRatingH1.classList.add('rating-nft-rate');

        nftLevelH4.innerHTML = `Уровень: ${item.level}`;
        nftVictoriesH4.innerHTML = `Побед: ${item.wins}`;

        nftStatsDiv.appendChild(nftLevelH4);
        nftStatsDiv.appendChild(nftVictoriesH4);
        nftStatsDiv.classList.add('rating-nft-stats');

        nftDiv.classList.add('rating-nft');

        nftImg.src = item.image_src;
        nftH2.innerHTML = item.name;
        nftH2.classList.add('rating-nft-name');
        
        nftRaribleBlockH4.classList.add('rating-nft-rarible-link');

        nftRaribleA.href = '#'
        nftRaribleA.innerHTML = 'Посмотреть на Rarible';
        nftRaribleBlockH4.appendChild(nftRaribleA);

        nftDiv.appendChild(nftRatingH1);
        nftDiv.appendChild(nftImg);
        nftDiv.appendChild(nftH2);
        nftDiv.appendChild(nftStatsDiv);
        nftDiv.appendChild(nftRaribleBlockH4);

        ratingList.appendChild(nftDiv); 
    });
}


function selectNftForGame(nftId = '0') {
    console.log('selectedNft', nftId);
    loggerElement.innerHTML = '';

    mainPage.style = "display: none"
    gamePage.style = ""
}
