'use strict'

var gQuests = [
    {
        id: 0,
        name: 'The Great Wall',
        opts: ['Scotland', 'Wales', 'China', 'Northern Ireland'],
        answerIdx: 2,
        img: 'img/0.jpg'
    },
    {
        id: 1,
        name: 'Great Pyramid of Giza',
        opts: ['Egypt', 'Sinai Peninsula', 'Beer Sheva', 'Nevada'],
        answerIdx: 0,
        img: 'img/1.jpg'
    },
    {
        id: 2,
        name: 'Taj Mahal',
        opts: ['Dubai', 'Greece', 'Turkey', 'India'],
        answerIdx: 3,
        img: 'img/2.jpg'
    },
    {
        id: 3,
        name: 'El Castillo',
        opts: ['Guatemala', 'Mexico', 'Honduras', 'Belize'],
        answerIdx: 1,
        img: 'img/3.jpg'
    },
    {
        id: 4,
        name: 'Machu Picchu',
        opts: ['Ecuador', 'Bolivia', 'Peru', 'Venezuela'],
        answerIdx: 2,
        img: 'img/4.jpg'
    },
    {
        id: 5,
        name: 'Petra',
        opts: ['Morocco', 'Jordan', 'El Salvador', 'Vietnam'],
        answerIdx: 1,
        img: 'img/5.jpg'
    },
    {
        id: 6,
        name: 'Christ the Redeemer',
        opts: ['Colombia', 'New York', 'Costa Rica', 'Brazil'],
        answerIdx: 3,
        img: 'img/6.jpg'
    },
    {
        id: 7,
        name: 'Colosseum',
        opts: ['Italy', 'Germany', 'Spain', 'Portugal'],
        answerIdx: 0,
        img: 'img/7.jpg'
    }
];

var isGameOn;
var gCurrQuest;
var gInterval;
var gTime;
var gScore = 0;
var gCorrectAnswers = 0;
var gameQuests;

function getHomeMenu() {
    isGameOn = false;
    document.querySelector(".container").style.display = "none";
    document.querySelector(".menu").style.display = "block";
    document.querySelector(".score").innerHTML = "SCORE: " + gScore;
}

function init() {
    gameQuests = gQuests.slice(0);
    gScore = 0;
    gCorrectAnswers = 0;
    isGameOn = true;
    gTime = 0;
    gInterval = setInterval(function () {
        gTime++;
    }, 1000);
    getRndQuest();
    renderQuest();
    document.querySelector(".menu").style.display = "none";
    document.querySelector(".container").style.display = "block";
}

function renderQuest() {
    document.querySelector("h2").innerHTML = gCurrQuest.name;
    document.querySelector('.image').innerHTML = '<img width="100%" height="100%" src=' + gCurrQuest.img + '>';
    for (var i = 0; i < gCurrQuest.opts.length; i++) {
        document.querySelector('.q' + i).innerHTML = gCurrQuest.opts[i];
    }
}

function getRndQuest() {
    var rndQuestIdx = getRandomInt(0, gameQuests.length);
    gCurrQuest = gameQuests[rndQuestIdx];
    gameQuests.splice(rndQuestIdx, 1);
    renderQuest();
    return gameQuests;
}

function checkAnswer(id) {
    var quests = document.querySelectorAll('.quest');
    if (!isGameOn) { return };
    isGameOn = false;
    if (gCurrQuest.answerIdx !== id) {
        for (var i = 0; i < quests.length; i++) {
            quests[i].style.borderColor = 'red';
            quests[i].style.color = 'red';
            quests[gCurrQuest.answerIdx].style.borderColor = 'green';
            quests[gCurrQuest.answerIdx].style.color = 'green';
        }
        gScore -= 4;
    } else {
        quests[gCurrQuest.answerIdx].style.borderColor = 'green';
        quests[gCurrQuest.answerIdx].style.color = 'green';
        gScore += 10;
        gCorrectAnswers++;
        if (gCorrectAnswers % 3 === 0) {
            gScore += 3;
        }
    }
    setTimeout(function () {
        for (var i = 0; i < quests.length; i++) {
            quests[i].style.borderColor = 'black';
            quests[i].style.color = 'black';
        }
        getRndQuest();
        isGameOn = true;
        if (gameQuests.length === 0) {
            clearInterval(gInterval);
            gScore -= gTime;
            getHomeMenu();
        }
    }, 1000);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}