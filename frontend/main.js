// TEST DATA

// player1 = {
//     name: "Игрок 1",
//     lv: 1,
//     exp: 20000,
//     confidence: 25,
//     critic: 6,
//     insult: 1,
//     mockery: 1,
//     taunt: 1,
//     stressRessistance: 11,
//     selfIrony: 1,
//     wit: 1
// }

// player2 = {
//     name: "Игрок 2",
//     lv: 1,
//     exp: 10000,
//     confidence: 19,
//     critic: 1,
//     insult: 1,
//     mockery: 8,
//     taunt: 1,
//     stressRessistance: 1,
//     selfIrony: 11,
//     wit: 1
// }

player1 = {
    name: "Игрок 1",
    lv: 1,
    exp: 99,
    confidence: 20,
    critic: 10,
    insult: 10,
    mockery: 10,
    taunt: 10,
    stressRessistance: 10,
    selfIrony: 10,
    wit: 10,
    unallocatedPoins: 20,
    blockedTill: ''  // time and date NFT blocked as we don't have time in blockchain frontend handles it
}

player2 = {
    name: "Игрок 2",
    lv: 1,
    exp: 99,
    confidence: 20,
    critic: 10,
    insult: 10,
    mockery: 10,
    taunt: 10,
    stressRessistance: 10,
    selfIrony: 10,
    wit: 10,
    unallocatedPoins: 20,
    blockedTill: '' // time and date NFT blocked as we don't have time in blockchain frontend handles it
}

var attacks = {
    "CRITIC": 0,
    "INSULT": 1,
    "MOCKERY": 2,
    "TAUNT": 3
}


var attackNames = {
    0: "critic",
    1: "insult",
    2: "mockery",
    3: "taunt"
}

var attackNamesRus = {
    0: "Критику",
    1: "Оскорбление",
    2: "Насмешку",
    3: "Провокацию"
}

var phrases = {
    0: [
        "Пиксели кривые!",
        "Курица лапой лучше сделает!",
        "Что за хня?!"
    ],
    1: [
        "С такими навыками не чего высовываться!",
        "Ну ты нуб!",
        "Да кому ты нужен!?"
    ],
    2: [
        "В Пикассо заделался?",
        "Пейнт открыл - уже художник?",
        "Ты это на клаву сел?"
    ],
    3: [
        "Иди на завод работай, какие NFT?",
        "Деду за тебя стыдно!",
        "Какой мудак это сделал?"
    ]
}

function getPhrases() {
    return phrases;
}

levels = {
    1: 0,
    2: 100,
    3: 250,
    4: 500,
    5: 1000,
    6: 1600,
    7: 2500,
    8: 5000,
    9: 10000,
    10: 16000,
    11: 25000,
    12: 50000
}

// SPECS

// player1 might need to be replaced with relevant object
function getAverageDef() {
    return parseInt((player1.addSelfIrony + player1.addStressRessistance + player1.addWit) / 3);
}

function getAverageAtk() {
    return parseInt((player1.critic + player1.insult + player1.mockery + player1.taunt) / 4);
}


// ATACK 

// Критика
function addCritic() { player1.critic++; }
// Оскорбление
function addInsult() { player1.insult++; }
// Насмешка
function addMockery() { player1.mockery++;  }
// Провокация
function addTaunt() { player1.taunt++; }


// DEFENCE

// Находчивость
function addWit() { player1.wit++; }
// Самоирония
function addSelfIrony() { player1.selfIrony++; }
// Стрессоустойчивость
function addStressRessistance() { player1.stressRessistance++; }

// POINTS

// STATUS



// TRAINING / travel
// for both Travel and Battle as they can't happen at the same time
var milliseconds = Date.now();

// block the NFT from DUEL, frontend should handle it as blockchain can't
function setBlock(time) {
    player1.blockedTill = time;
}

var destinations = {
    "SOCIAL": 0,
    "BLOGGING": 1,
    "YOUTUBE": 2,
    "NEWS": 3,
    "WEBSERFING": 4,
    "MARKETPLACE": 5,
    "POLITICS": 6,
    "GAMING": 7,
    // "ADULTWEBSITES": 8, // more complicated
    // "HACKATON": 9   // more complecated
}

var destinationsRus = {
    0: 'Социальных Сетей',
    1: 'Ведения Видеоблога',
    2: 'Просмотра Роликов',
    3: 'Чтения Новостей',
    4: 'Свободного Серфинка',
    5: 'Торговых площадок',
    6: 'Политики',
    7: 'Онлайн-Игр',
}

var destinationSkills = {
    0: 'critic',
    1: 'confidence',
    2: 'mockery',
    3: 'stressRessistance',
    4: 'wit',
    5: 'selfIrony',
    6: 'taunt',
    7: 'insult',
}

var destinationSkillsRus = {
    0: 'Критика',
    1: 'Самоувереность',
    2: 'Насмешка',
    3: 'Стрессоустойчивость',
    4: 'Остроумие',
    5: 'Самоирония',
    6: 'Провокация',
    7: 'Оскорбление',
}


// first event list, haven't implemented the second one
events1 = [
    {
        name: "Увы, ничего интересного не случилось.",
        skill: 0,
        exp: 0
    },
    {
        name: "Почему бы мне не отдохнуть? Ах, да, мне же не требуется отдых.",
        skill: 0,
        exp: 0
    },
    {
        name: "Нашлось что-то интересное",
        skill: 0,
        exp: 3
    },
    {
        name: "Ого! Кто-то поставил мне лайк!",
        skill: 0,
        exp: 10
    },
    {
        name: "Ой-ой-ой, как щекотно! Наверное, меня скачивают",
        skill: 0,
        exp: 5
    },
    {
        name: "Меня занесло куда-то не туда",
        skill: 0,
        exp: 1
    },
    {
        name: "Кто-то на меня смотрит… ",
        skill: 0,
        exp: 8
    },
    {
        name: "Шаг за шагом, бит за битом, я все выше",
        skill: 0,
        exp: 10
    },
    {
        name: "Хозяин поставил меня на аватарку",
        skill: 0,
        exp: 20
    },
    {
        name: "Чувствую, что становлюсь лучше",
        skill: 1,
        exp: 0
    },
    {
        name: "На меня снизошло озарение",
        skill: 1,
        exp: 0
    },
    {
        name: "Интересно, хоть кто-то читает все это?",
        skill: 1,
        exp: 5
    }
]
    

function getTravelPlan() {
    // temp 
    return [
        destinations.SOCIAL,
        destinations.MARKETPLACE,
        destinations.GAMING,
        destinations.NEWS,
        destinations.POLITICS
    ] 
}


var travelLog = [];

function doTravel() {
    travelLog = [];

    var travelPlan = getTravelPlan();
    travelLog.push("(!) - " + buildDateString(milliseconds) + " - " + player1.name + " Отправился на тренировку.");
    milliseconds += getRandomArbitrary(300000, 450000); // to move time forward a bit

    for (d of travelPlan) {
        travelLog.push("(!) - " + buildDateString(milliseconds) + " - " + player1.name + " Двинулся в направлении " + destinationsRus[d]);
        milliseconds += getRandomArbitrary(300000, 450000); // to move time forward a bit
        // for half an hour with 10min interval will have 3 events
        for (var i = 0; i < 3; i++) {
            // random event
            var ev = events1[getRandomArbitrary(0, 11)];

            // update log
            travelLog.push(ev.name);
            travelLog.push("(!) - " + buildDateString(milliseconds) + " - " + player1.name + " Получил " + ev.skill + " " + destinationSkillsRus[d] + " и " + ev.exp + " Просмотров")
            milliseconds += getRandomArbitrary(300000, 450000); // to move time forward a bit
            
            // update skills
            player1[destinationSkills[d]] += ev.skill;
            player1.exp += ev.exp;

        }
    }
    console.log(travelLog);
    // console.log(player1);
}


// BATTLE & LOG

// who's turn it is?
var turn = 0;

// get opponent's stats
function getEnemy() {}

// get player1 attack tactic
function getPlayerOneTactic() {
    // temp 
    return [
        attacks.CRITIC,
        attacks.INSULT,
        attacks.CRITIC,
        attacks.MOCKERY,
        attacks.TAUNT
    ] 
}
// temp player 2 tactics
function getPlayerTwoTactic() {
    // temp 
    return [
        attacks.INSULT,
        attacks.CRITIC,
        attacks.CRITIC,
        attacks.TAUNT,
        attacks.MOCKERY
    ] 
}



var battleLog = [];


// Battle loop
function doBattle() {
    battleLog = [];
    
    // milliseconds to offset message times 
    milliseconds = Date.now();
    // add message to the log
    battleLog.push("(!) - " + buildDateString(milliseconds) + " - " + player1.name + " отправлен на Арену.");
    milliseconds += getRandomArbitrary(100000, 1200000);

    // after enemy found
    battleLog.push("(!) - " + buildDateString(milliseconds) + " - " + "Найден соперник " + player2.name + ". Началась перепалка.");
    milliseconds += getRandomArbitrary(100000, 1200000);

    var gotWinner = false;
    var playerOneRound = 0;
    var playerTwoRound = 0;

    // list of player tactics
    var playerOneTactic = getPlayerOneTactic();
    var playerTwoTactic = getPlayerTwoTactic(); 
    
    // loop counter
    var i = 0;
    while(i < 11 && !gotWinner) {
        i++;
        // check who's turn
        if (turn == 0 && playerOneRound < 5) {
            // play round and calculate damage
            var damage = playRound(player1, player2, playerOneTactic[playerOneRound]);
            if (damage === false) damage = 0;   // return false only when contrattack and zero when blocked
            damage = parseInt(damage);
            player2.confidence -= damage;

            // log message
            battleLog.push('(1) - ' + phrases[playerOneTactic[playerOneRound]][parseInt(getRandomArbitrary(0,2))]);
            milliseconds += getRandomArbitrary(100000, 1200000);
            
            battleLog.push("(!) - " + buildDateString(milliseconds) + " - " + buildLogMessage(player1, player2, playerOneTactic[playerOneRound], damage));
            milliseconds += getRandomArbitrary(100000, 1200000);
            
            // check for winner
            if (player2.confidence <= 0) {
                gotWinner = true;
                //check and update levels
                player1.exp += Math.ceil(player2.exp/100);

                // check if there is time for level up
                if (levels[player1.lv + 1] <= player1.exp) {
                    player1.lv++;
                    player1.unallocatedPoins += 5;
                }

                battleLog.push("(!) - " + buildDateString(milliseconds) + " - " + player1.name + " побеждает " + player2.name + 
                    ". Вы победили! Вам начислено " + Math.ceil(player2.exp/100) + " Просмотров.");
                milliseconds += getRandomArbitrary(100000, 1200000);

            }

            // round up and change turn
            playerOneRound++;
            // if (playerOneRound == 5) playerOneRound = 0;
            turn = 1;
        } else if (turn == 1 && playerTwoRound < 5) {
            // play round and calculate damage
            var damage = playRound(player2, player1, playerTwoTactic[playerTwoRound]);
            if (damage === false) damage = 0;   // return false only when contrattack and zero when blocked
            damage = parseInt(damage);
            player1.confidence -= damage;

            // log message
            battleLog.push('(2) - ' + phrases[playerTwoTactic[playerTwoRound]][parseInt(getRandomArbitrary(0,2))]);
            milliseconds += getRandomArbitrary(100000, 1200000);

            battleLog.push("(!) - " + buildDateString(milliseconds) + " - " + buildLogMessage(player2, player1, playerTwoTactic[playerTwoRound], damage));
            milliseconds += getRandomArbitrary(100000, 1200000);

            // check for winner
            if (player1.confidence <= 0) {
                gotWinner = true;
                // check and update levels
                player2.exp += Math.ceil(player1.exp/100);

                // check if there is time for level up
                if (levels[player2.lv + 1] <= player2.exp) {
                    player2.lv++;
                    player2.unallocatedPoins += 5;
                }

                battleLog.push("(!) - " + buildDateString(milliseconds) + " - " + player2.name + " побеждает " + player1.name + 
                    " по количеству Самоуверености. Вы проиграли! " + player2.name + " получает " + Math.ceil(player1.exp/100) + " Просмотров.");
                milliseconds += getRandomArbitrary(100000, 1200000);
            }

            // round up and change turn
            playerTwoRound++;
            // if (playerTwoRound == 5) playerTwoRound = 0;
            turn = 0;
        } else {

            // after 5 rounds

            gotWinner = true;
            if (player1.confidence < player2.confidence) {
                 // check and update levels
                 player2.exp += Math.ceil(player1.exp/100);

                 // check if there is time for level up
                 if (levels[player2.lv + 1] <= player2.exp) {
                     player2.lv++;
                     player2.unallocatedPoins += 5;
                 }

                battleLog.push("(!) - " + buildDateString(milliseconds) + " - " + player2.name + " побеждает " + player1.name + 
                    " по количеству Самоуверености. Вы проиграли! " + player2.name + " получает " + Math.ceil(player1.exp/100) + " Просмотров.");
            } else {
                //check and update levels
                player1.exp += Math.ceil(player2.exp/100);

                // check if there is time for level up
                if (levels[player1.lv + 1] <= player1.exp) {
                    player1.lv++;
                    player1.unallocatedPoins += 5;
                }

                battleLog.push("(!) - " + buildDateString(milliseconds) + " - " + player1.name + " побеждает " + player2.name + 
                    ". Вы победили! Вам начислено " + Math.ceil(player2.exp/100) + " Просмотров.");
                milliseconds += getRandomArbitrary(100000, 1200000);
            }
        }


    }
    
    // DEBUG
    // console.log(battleLog);
    // console.log(i);
    // console.log(player1);

    return battleLog;
}

function buildLogMessage(attacker, defender, playerTactic, damage) {
    return attacker.name + " применяет " + attackNamesRus[playerTactic] + " и наносит " + damage + " урона Самоуверенности " + defender.name;
}

function buildDateString(milliseconds) {
    var d = new Date(milliseconds);
    return ('0' + d.getDate()).slice(-2) + "." + ('0' + d.getMonth()).slice(-2) + "." + ('0' + d.getFullYear()).slice(-2) +
             " (" + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ")" ;
}

function playRound(attacker, defender, playerTactic) {
    var atk = attacker[attackNames[playerTactic]];
    var damage = 0;

    if (!attackOnWit(atk, defender.wit, playerTactic)) {
        battleLog.push("(!) - " + buildDateString(milliseconds) + " - " + "Атака против остроумия провалилась. " + defender.name + " контратакует.");
        milliseconds += getRandomArbitrary(100000, 1200000);
        return false;
    }   // change turn if false
    if (attackOnSelfIrony(atk, defender.selfIrony, playerTactic)) {  // block or not
        damage = attackOnStressRessistance(atk, defender.stressRessistance, playerTactic);
    } else {
        battleLog.push("(!) - " + buildDateString(milliseconds) + " - " + "Атака не прошла. " + defender.name + " отразил атаку используя Самоирония.");
        milliseconds += getRandomArbitrary(100000, 1200000);
    }
    return damage;
}


// calculate attack
function attackOnWit(atk, def, attackType) {
    // modifiers
    if (attackType == attacks.CRITIC) def /= 3;

    var r = getRandomArbitrary(0, atk + def);
    if (r <= atk) {
        contattackUsed = true;
        return true;        // attack went through
    }
    // battleLog.push("------------" + "Остроумие Контераттака"  + "----------------");
    return false;           // chance for counterattack
}

function attackOnSelfIrony(atk, def, attackType) {
    // modifiers
    if (attackType == attacks.INSULT || attackType == attacks.MOCKERY) atk /= 3;
    if (attackType == attacks.TAUNT) def = 0;

    var r = getRandomArbitrary(0, atk + def);
    if (r <= atk)
        return true;        // attack went through
    // battleLog.push("------------" + "Ирония Атака заблокирована"  + "----------------");
    return false;           // attack bloked
}

function attackOnStressRessistance(atk, def, attackType) {
    // modifiers
    if (attackType == attacks.INSULT) atk *= 3;
    if (attackType == attacks.MOCKERY) { return atk / 3; }
    if (attackType == attacks.TAUNT) atk /= 3;

    var damage = atk / (atk + def) * atk;
    
    return parseInt(damage);
} 


//  will be replaces in smart contract
function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

// test
// doBattle();
// doTravel();
