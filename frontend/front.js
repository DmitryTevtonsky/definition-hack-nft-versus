
let isMainPageVisible = true;
let isGamePageVisible = false;

let isImportedNftsSelected = true;

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

let mainPage, gamePage;
let showMyNftsBtn, sendToFightBtn, trainOptionInput, fightOptionInput;
let loggerElement;

let isTrainSelected;

let importedOption, notImportedOption;
let importedSection, notImportedSection;

function onDOMContentLoaded() {
    mainPage = document.getElementById('main-page');
    gamePage = document.getElementById('game-page');

    const trainOption = document.getElementById('train-option');
    trainOption.click();

    importedOption = document.getElementById('imported-option');
    importedSection = document.getElementById('my-nft-list');
    notImportedOption = document.getElementById('not-imported-option')
    notImportedSection = document.getElementById('not-imported-nft-list');
    importedOption.click();

    importedOption.onchange = () => {
        isImportedNftsSelected = true;
        console.log(isImportedNftsSelected);
        importedSection.style = "";
        notImportedSection.style = "display: none"
    }

    notImportedOption.onchange = () => {
        isImportedNftsSelected = false;
        console.log(isImportedNftsSelected);
        importedSection.style = "display: none"
        notImportedSection.style = ""
    }

    addDataToMainPage();

    loggerElement = document.getElementById('logs-messages');

    logo = document.getElementById('logo');

    logo.addEventListener('click', () => {
        gamePage.style = "display: none"
        mainPage.style = ""
    });

    showMyNftsBtn = document.getElementById('show-my-nfts-btn');

    sendToFightBtn = document.getElementById('send-to-fight-btn');
    sendToTrainBtn = document.getElementById('send-to-train-btn');

    challengeSelection = document.getElementsByClassName('nft-controls__challenge-selection')[0];

    trainOptionInput = document.getElementById('train-option');
    fightOptionInput = document.getElementById('fight-option');

    let fightInProgress = false;
    let trainInProgress = false;

    trainOptionInput.addEventListener('change', (e) => {
        if (!fightInProgress) {
            isTrainSelected = true
            document.getElementsByClassName('nft-controls__attacks-selection')[0].classList.add('hidden');
            document.getElementsByClassName('nft-controls__train-selection')[0].classList.remove('hidden');
            loggerElement.innerHTML = '';
        }
    })
    fightOptionInput.addEventListener('change', (e) => {
        if (!trainInProgress) {
            isTrainSelected = false
            document.getElementsByClassName('nft-controls__train-selection')[0].classList.add('hidden');
            document.getElementsByClassName('nft-controls__attacks-selection')[0].classList.remove('hidden');
            loggerElement.innerHTML = '';
        }
    })

    sendToFightBtn.addEventListener('click', () => {
        sendToFightBtn.disabled = true;
        sendToFightBtn.classList.add('disabled');
        challengeSelection.classList.add('disabled');
        fightInProgress = true;

        loggerElement.innerHTML = '';

        const log = doBattle();
        console.log(log, loggerElement, typeof (log));

        let i = 0;
        log.forEach(message => {
            setTimeout(function () {
                const li = document.createElement('li');

                if (message.includes('(!) - ')) {
                    li.innerHTML = message.replace('(!) - ', '');
                    li.classList.add("message");
                    li.classList.add("system-message");
                    loggerElement.appendChild(li);
                    loggerElement.scrollTop = loggerElement.scrollHeight;
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
                loggerElement.scrollTop = loggerElement.scrollHeight;
            }, i * 1000, i);
            i++;
        })

        setTimeout(function () {
            addNftStats();
            sendToFightBtn.disabled = false;
            sendToFightBtn.classList.remove('disabled');
            challengeSelection.classList.remove('disabled');
            fightInProgress = false;
        }, log.length * 1000);
    });

    // 
    sendToTrainBtn.addEventListener('click', () => {
        sendToTrainBtn.disabled = true;
        sendToTrainBtn.classList.add('disabled');
        challengeSelection.classList.add('disabled');
        trainInProgress = true;

        loggerElement.innerHTML = '';

        const log = doTravel();
        console.log(log, loggerElement, typeof (log));

        let i = 0;
        log.forEach(message => {
            setTimeout(function () {
                const li = document.createElement('li');
                if (message.includes('(!) - ')) {
                    li.innerHTML = message.replace('(!) - ', '');
                    li.classList.add("message");
                    li.classList.add("system-message");
                    loggerElement.appendChild(li);
                    loggerElement.scrollTop = loggerElement.scrollHeight;
                    return;
                }

                const img = document.createElement('img');
                const divContent = document.createElement('div');

                li.classList.add("message");
                divContent.classList.add("message-content");

                img.src = 'nft-avatar.png';

                li.classList.add("my-message");
                divContent.innerHTML = message;

                li.appendChild(img);
                li.appendChild(divContent);

                loggerElement.appendChild(li);
                loggerElement.scrollTop = loggerElement.scrollHeight;


                addNftStats();
            }, i * 10000, i);
            i++;
        })

        setTimeout(function () {
            sendToTrainBtn.disabled = false;
            sendToTrainBtn.classList.remove('disabled');
            challengeSelection.classList.remove('disabled');
            trainInProgress = false;
        }, log.length * 10000);
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
    notImportedNftList = document.getElementById('not-imported-nft-list');

    nftList.forEach(item => {
        const myNftDiv = document.createElement('div');
        const myNftImg = document.createElement('img');
        const myNftH2 = document.createElement('h2');
        const myNfthStatsDiv = document.createElement('div');
        const myNftLevelH4 = document.createElement('h4');
        const myNftVictoriesH4 = document.createElement('h4');

        // new
        const myNftRaribleBlockH4 = document.createElement('h4');
        const myNftRaribleA = document.createElement('a');

        myNftRaribleBlockH4.classList.add('rating-nft-rarible-link');

        myNftRaribleA.href = '#'
        myNftRaribleA.innerHTML = 'Посмотреть на Rarible';
        myNftRaribleBlockH4.appendChild(myNftRaribleA);
        ///

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
        myNftDiv.appendChild(myNftRaribleBlockH4); //

        myNftList.appendChild(myNftDiv);

        myNftImg.addEventListener('click', () => selectNftForGame(item.id))
        myNftH2.addEventListener('click', () => selectNftForGame(item.id))
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

        nftRatingH1.innerHTML = `${index + 1} место`;
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

    notImportedNfts.forEach(item => {
        const nftDiv = document.createElement('div');

        const nftImg = document.createElement('img');
        const nftH2 = document.createElement('h2');
        const nftImportBlockH4 = document.createElement('h4');

        nftImg.src = item.image_src;
        nftH2.innerHTML = item.name
        nftImportBlockH4.innerHTML = 'Импортировать';

        nftDiv.classList.add('my-nft');
        nftH2.classList.add('my-nft-name');
        nftImportBlockH4.classList.add('rating-nft-rarible-link')
        nftDiv.appendChild(nftImg);
        nftDiv.appendChild(nftH2);
        nftDiv.appendChild(nftImportBlockH4);

        notImportedNftList.appendChild(nftDiv);
    })
}


function selectNftForGame(nftId = '0') {
    console.log('selectedNft', nftId);
    loggerElement.innerHTML = '';

    mainPage.style = "display: none"
    gamePage.style = ""

    const trainOption = document.getElementById('train-option');
    trainOption.click();
}
