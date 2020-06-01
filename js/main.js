'use strict';

var gCellCount = 16;
var gNumToClick;
var gIntervalId;
var gSecCount;
var gNums = [];
var gElTimer = document.querySelector('.timer');



function init() {
    gElTimer.innerText = 'Game Time:';
    if (gIntervalId) clearInterval(gIntervalId);
    initNums(gCellCount);
    gNumToClick = 1;
    gSecCount = 0; // start counting seconds from 0 --> 0.000
    renderBoard(gCellCount);
}



function renderBoard(cellCount) {
    var length = Math.sqrt(cellCount);
    var strHtml = '';
    for (var i = 0; i < length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < length; j++) {
            strHtml += `<td onclick="cellClicked(this)">${drawNum()}</td>`
        }
        strHtml += '</tr>';
    }
    var elTbody = document.querySelector('.table');
    elTbody.innerHTML = strHtml;
}



function cellClicked(elClickedNum) {
    var numVal = +elClickedNum.innerText;
    if (numVal !== gNumToClick) return
    elClickedNum.classList.toggle('clicked');
    gNumToClick++;
    if (gNumToClick === 2) {
        gIntervalId = setInterval(function () {
            gSecCount++
            gElTimer.innerText = `Game Time : ${gSecCount}`;
        }, 1000);
    }
    if (gNumToClick === gCellCount + 1) {
        clearInterval(gIntervalId);
        if (confirm(`You completed the game within ${gSecCount} seconds! Play again!`)) init();
    }
}



function setMode(elBtn) {
    var currMode = elBtn.className;
    var elEasyBtn = document.querySelector('.easy');
    var elMedBtn = document.querySelector('.medium');
    var elHardBtn = document.querySelector('.hard');
    switch (currMode) {
        case 'easy':
            gCellCount = 16;
            if (!elEasyBtn.classList.contains('mode')) {
                elEasyBtn.classList.add('mode');
                elMedBtn.classList.remove('mode');
                elHardBtn.classList.remove('mode');
            }
            init()
            break;
        case 'medium':
            gCellCount = 25;
            if (!elMedBtn.classList.contains('mode')) {
                elMedBtn.classList.add('mode');
                elEasyBtn.classList.remove('mode');
                elHardBtn.classList.remove('mode');
            }
            init()
            break;
        case 'hard':
            gCellCount = 36;
            if (!elHardBtn.classList.contains('mode')) {
                elHardBtn.classList.add('mode');
                elMedBtn.classList.remove('mode');
                elEasyBtn.classList.remove('mode');
            }
            init()
    }
}



function initNums(length) {
    for (var i = 0; i < length; i++) {
        gNums.push(i + 1);
    }
    shuffle(gNums);
}



function drawNum() {
    return gNums.pop()
}



function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}



function showInstructions() {
    document.querySelector('p').hidden = ''
    setTimeout(function () { document.querySelector('p').hidden = 'true' }, 5000);
}