//Smart-contract: Hayer Game


// global context:
// context.BlockNum - Block num
// context.TrNum - Tx num
// context.Account - current account {Num,Currency,Smart,Value:{SumCOIN,SumCENT}}
// context.Smart - current smart {Num,Name,Account,Owner}
// context.FromNum - sender account num
// context.ToNum - payee account num
// context.Description - text
// context.Value - {SumCOIN,SumCENT}
// context.Currency - token currency
// context.ID - token ID
// context.SmartMode - 1 if run from smartcontract
// context.Tx - tx (not present in events)



"public"
function RunBattle(Params)
{
    //Params={ID,...}

    var ID=Params.ID.trim();
    var Account=context.FromNum;
    if(!Account)
        throw "Error Account number";

    //ищем NFT по ID

    var Item=ReadItem(Account);
    var NFT=FindRow(Item.Arr,ID);
    if(!NFT.SumCOIN)
        throw "Error NFT ID";



    //todo
    //смотрим список ожидающих NFT
    //если находим подходящий, то битва
    //иначе добавляем в список ожиданий
    // var Arena=ReadItemArena();
    // var FindNFT;
    // for(var i=0;i<Arena.Arr.length;i++)
    // {
    //     var CurNFT=Arena.Arr[i];
    //     if(CurNFT.ID===ID)
    //         throw "NFT was on Battle";

    //     var Item=ReadItem(Account);
    //     var NFT=FindRow(Item.Arr,ID);
    //     if(!NFT.SumCOIN)
    //     {
    //         FindNFT=CurNFT;
    //         break;
    //     }
    // }


    var OpponentNFT=FindOpponent(NFT);

    doBattle(NFT,OpponentNFT);


    //запись содержимого NFT
    WriteItem(Item);



    //WriteItemArena(Arena);
}

//todo
function FindOpponent(NFT)
{
    var NFT={};
    NFT.name="Противник";
    NFT.ID="1";
    NFT.url="https://terawallet.org/files/dapp/versus0/nft-avatar.png";
    SetInitValue(NFT);
    return NFT;
}
// get player1 attack tactic
function getPlayerOneTactic() {
    var attacks=GetAttacks();
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
    var attacks=GetAttacks();
    return [
        attacks.INSULT,
        attacks.CRITIC,
        attacks.CRITIC,
        attacks.TAUNT,
        attacks.MOCKERY
    ]
}



"public"
function LazyBridgeMint(Params)
{
    //Params={ID,...}

    var ID=Params.ID.trim();
    var Account=context.FromNum;
    if(!Account || !ID)
        throw "Error Params";

    var Item=ReadItem(Account);
    var NFT=FindRow(Item.Arr,ID);
    if(NFT.SumCOIN)
        throw "Was minting";

    NFT.name=Params.name;
    NFT.url=Params.url;
    NFT.SumCOIN=1;

    SetInitValue(NFT);



    WriteItem(Item);

    RegInWallet(Account);

    REvent("Import",NFT);
}



"public"
function GetNFTList(Params)
{
    return OnGetBalance(Params.Account);
}

function SetInitValue(NFT)
{
    NFT.level=1;
    NFT.exp=0;
    NFT.confidence=1;
    NFT.critic=1;
    NFT.insult=1;
    NFT.mockery=1;
    NFT.taunt=1;
    NFT.stressRessistance=1;
    NFT.selfIrony=1;
    NFT.wit=1;
    NFT.unallocatedPoins=20;

    NFT.rating=0;
    NFT.wins=0;
    NFT.defeats=0;

    // NFT.ToFreezeTime=0;
    // NFT.TeraOwner=0;
}

//-------------------------------------------------------------------------------------------------------------Store

function FormatArena()
{
    return {
        Arr:[{
            ID:"str",
            Reserve:"str50"
        }],
        Reserve:"str100"};

}
function ReadItemArena()
{
    var Key="ARENA";
    var Item=ReadValue(Key,FormatArena());
    if(!Item)
        Item={Arr:[]};
    Item.Key=Key;
    return Item;
}

function WriteItemArena(Item)
{
    WriteValue(Item.Key,Item,FormatArena());
}


function Format()
{
    //ID=ETHEREUM:0x60f80121c31a0d46b5279700f9df786054aa5ee5:123213

    return {Arr:[{
            ID:"str",
            SumCOIN:"uint",SumCENT:"uint32",
            url:"str",
            name: "str",

            level: "uint32",
            exp: "uint32",
            confidence: "uint32",
            critic: "uint32",
            insult: "uint32",
            mockery: "uint32",
            taunt: "uint32",
            stressRessistance: "uint32",
            selfIrony: "uint32",
            wit: "uint32",
            unallocatedPoins: "uint32",

            rating:"uint32",
            wins: "uint32",
            defeats:"uint32",

            ToFreezeTime:"double",
            TeraOwner:"byte",



            Reserve:"str37"
        }]};
}

//-------------------------------------------------------------------------------------------------------------Token Lib




"public"
function InPlaceShow()
{
    return 1;
}



"public"
function OnTransfer(Params)
{
    //only NFT 721

    //Params: From,To,Amount,ID
    if(!FLOAT_FROM_COIN(Params.Amount))
        return;

    if(Params.ID && (Params.Amount.SumCENT || typeof Params.Amount.SumCENT!=="number"))
        throw "Error Amount for NFT. Fractional values are prohibited.";

    if(Params.To<8)//burn
    {
        Burn(Params.From,Params.ID,Params.Amount);
        //Burn(0,Params.ID,Params.Amount);
        return;
    }



    var Item1=ReadItem(Params.From);
    var Row1=FindRow(Item1.Arr,Params.ID);

    var Item2=ReadItem(Params.To);
    var Row2=FindRow(Item2.Arr,Params.ID);

    if(Params.ID)
    {
        for(var key in Row1)
            Row2[key]=Row1[key];

        Row1.SumCOIN=0;
        Row2.SumCOIN=1;
    }
    else
    {
        if(!SUB(Row1,Params.Amount))
            throw "There are not enough funds on the account: "+Params.From;
        ADD(Row2,Params.Amount);
    }





    if(ISZERO(Row1))
        DeleteRow(Item1.Arr,Params.ID);

    WriteItem(Item1);
    WriteItem(Item2);

    RegInWallet(Params.To);

}

"public"
function OnGetBalance(Account,ID)
{
    var Item=ReadItem(Account);
    if(!Item)
        Item={Arr:[]};
    if(ID!==undefined)
        return FindRow(Item.Arr,ID);

    var Arr=Item.Arr;
    for(var i=0;i<Arr.length;i++)
        if(Arr[i].url)
            Arr[i].IMG=Arr[i].url;

    return Arr;
}


function ReadItem(Account)
{
    var Key="ACC:"+Account;
    var Item=ReadValue(Key,Format());
    if(!Item)
        Item={Arr:[]};
    Item.Key=Key;
    return Item;
}

function WriteItem(Item)
{
    WriteValue(Item.Key,Item,Format());
}

function FindRow(Arr,ID)
{
    if(!ID)
        ID="";
    for(var i=0;i<Arr.length;i++)
        if(Arr[i].ID==ID)
        {
            return Arr[i];
        }

    var Row={ID:ID,SumCOIN:0,SumCENT:0};
    Arr.push(Row);
    return Row;
}

function DeleteRow(Arr,ID)
{
    if(!ID)
        ID="";
    for(var i=0;i<Arr.length;i++)
        if(Arr[i].ID==ID)
        {
            Arr.splice(i,1);
            break;
        }
}


function Mint(Account,ID,Amount, Fields)
{
    if(typeof Amount==="number")
        Amount=COIN_FROM_FLOAT(Amount);

    var Item=ReadItem(Account);
    var Row=FindRow(Item.Arr,ID);


    //NFT Stores fields
    if(Fields)
    {
        for(var key in Fields)
            Row[key]=Fields[key];
    }

    ADD(Row,Amount);
    WriteItem(Item);

    if(Account)
        RegInWallet(Account);


}

function Burn(Account,ID,Amount)
{
    if(typeof Amount==="number")
        Amount=COIN_FROM_FLOAT(Amount);

    var Item=ReadItem(Account);
    var Row=FindRow(Item.Arr,ID);
    if(!SUB(Row,Amount))
    {
        if(!Account)
            return;

        throw "Error burn Amount in account: "+Account+" Lack of funds: "+(-FLOAT_FROM_COIN(Row));
    }

    if(ISZERO(Row))
        DeleteRow(Item.Arr,ID);
    WriteItem(Item);
}



//static mode


"public"
function DoGetBalance(Params)
{
    return GetBalance(Params.Account,Params.Currency,Params.ID);
}


"public"
function TotalAmount(Params)
{
    return OnGetBalance(0,Params.ID);
}



//-------------------------------------------------------------- Owner mode
function CheckOwnerPermission()
{
    if(context.FromNum!==context.Smart.Owner)
        throw "Access is only allowed from Owner account";
}

// function CheckSenderPermission()
// {
//     if(context.FromNum!==context.Account.Num)
//         throw "Access is only allowed from Sender account: "+context.FromNum+"/"+context.Account.Num;
// }

// "public"
// function DoMint(Params)
// {
//     CheckOwnerPermission();

//     Mint(Params.Account,Params.ID,Params.Amount,{});
//     Mint(0,Params.ID,Params.Amount,{});
// }

// "public"
// function DoBurn(Params)
// {
//     CheckOwnerPermission();
//     Burn(Params.Account,Params.ID,Params.Amount);
//     Burn(0,Params.ID,Params.Amount);
// }

// "public"
// function MintNFT(Params)
// {
//     CheckOwnerPermission();

//     Params.Amount=1;
//     Params.ID=""+(context.BlockNum*1000+context.TrNum);//self
//     DoMint(Params);
// }



//-------------------------------------------------------------- Lib 2

function REvent(Name,Params)
{
    Event({"cmd":Name,FromNum:context.FromNum,Params:Params});
}

// function CheckSum(Sum)
// {
//     if(Sum===0)
//         return Sum;
//     if(Sum && typeof Sum==="number")
//         return Sum;

//     throw "Error, need type number: "+Sum;
// }


// //-------------------------------------------------------------- GAME LOGIC


// Battle loop
function doBattle(player1,player2)
{
    var battleLog = [];
    var turn = 0;
    var levels=GetLevels();

    // milliseconds to offset message times
    var milliseconds = "";//Date.now();
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
            battleLog.push('(1) - ' + GetPhrases()[playerOneTactic[playerOneRound]][parseInt(getRandomArbitrary(0,2))]);
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
            battleLog.push('(2) - ' + GetPhrases()[playerTwoTactic[playerTwoRound]][parseInt(getRandomArbitrary(0,2))]);
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


    REvent("Battle",{ID:player1.ID,log:battleLog});
}

function playRound(attacker, defender, playerTactic) {
    var milliseconds="";
    var atk = attacker[GetAttackNames()[playerTactic]];
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
function attackOnWit(atk, def, attackType)
{
    var contattackUsed;//todo

    // modifiers
    var attacks=GetAttacks();

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
    var attacks=GetAttacks();

    if (attackType == attacks.INSULT || attackType == attacks.MOCKERY) atk /= 3;
    if (attackType == attacks.TAUNT) def = 0;

    var r = getRandomArbitrary(0, atk + def);
    if (r <= atk)
        return true;        // attack went through
    // battleLog.push("------------" + "Ирония Атака заблокирована"  + "----------------");
    return false;           // attack bloked
}

function attackOnStressRessistance(atk, def, attackType) {

    var attacks=GetAttacks();

    // modifiers
    if (attackType == attacks.INSULT) atk *= 3;
    if (attackType == attacks.MOCKERY) { return atk / 3; }
    if (attackType == attacks.TAUNT) atk /= 3;

    var damage = atk / (atk + def) * atk;

    return parseInt(damage);
}



function getRandomArbitrary(min, max)
{
    var Random=(context.BlockHash[16]+context.BlockHash[17]*256)/65536;
    return parseInt(Random* (max - min) + min);
}

function buildLogMessage(attacker, defender, playerTactic, damage)
{
    var attackNamesRus=GetAttackNamesRus();
    return attacker.name + " применяет " + attackNamesRus[playerTactic] + " и наносит " + damage + " урона Самоуверенности " + defender.name;
}

//todo
function buildDateString()
{
    return "";
}

function getRandomArbitrary()
{
    return "";
}





////-------------------------------------------------------------- common lib

function GetAttacks()
{
    var attacks = {
        "CRITIC": 0,
        "INSULT": 1,
        "MOCKERY": 2,
        "TAUNT": 3
    }
    return attacks;
}

function GetEvents1()
{
    // first event list, haven't implemented the second one
    var events1 = [
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
    ];
    return events1;
}


function GetAttackNames()
{
    var attackNames = {
        0: "critic",
        1: "insult",
        2: "mockery",
        3: "taunt"
    }
    return attackNames;
}

function GetAttackNamesRus()
{
    var attackNamesRus = {
        0: "Критику",
        1: "Оскорбление",
        2: "Насмешку",
        3: "Провокацию"
    }
    return attackNamesRus;
}
function GetPhrases()
{
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
    return phrases;
}



function GetLevels()
{
    var levels = {
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
    return levels;

}

  