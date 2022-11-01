let personToGuess;

console.log('Here are all the available people:', people); // i added two so it would make a nice 3x3 grid

$(document).ready(onReady);

function onReady() {
    loadRandom();
    $('#play-game-btn').on('click', startGame);
}


function randomNum(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min)
}

// function to create a randomized array of length 9 (could fairly easily be generalized to larger arrays)
function shuffleArr9() {
    const vanillaArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const randomArr = [];

    for (i = 0; i < 9; i++) {
        const iterationRand = randomNum(0, 8 - i); //array will decrease in length each time
        randomArr[i] = vanillaArr[iterationRand];
        vanillaArr.splice(iterationRand, 1);
    }
    return randomArr;
}

function loadRandom() {
    // create a randomized array 0-8

    const indexArr = shuffleArr9();
    console.log(indexArr);

    $('#list-of-people').empty();
    // for loop: take random array value and use it as index to choose which person
    for (let i = 0; i < 9; i++) {
        const personToAdd = people[indexArr[i]];
        $('#list-of-people').append(`
            <div>
                <img class="prof-pic" id="${personToAdd.name}" src="https://github.com/${personToAdd.githubUsername}.png?size=250" alt = "Profile image of ${personToAdd.name}">
                <p class="on-image-text"></p>
            </div>
        `)
    }


    // append people
}

function loadImages() {
    for (let person of people) {
        $('#list-of-people').append(`
            <div>
                <img class="prof-pic" id="${person.name}" src="https://github.com/${person.githubUsername}.png?size=250" alt = "Profile image of ${person.name}">
                <p class="on-image-text"></p>
            </div>
        `)
    }
}

function startGame() {
    console.log('in startGame');
    // reset stuff in case this is not the first time playing
    $('#play-game-btn').removeClass('play-again');
    $('#play-game-btn').addClass('btn-in-game');
    $('#play-game-btn').empty().text('MAKE YOUR GUESS');

    $('img').removeClass('blur');
    $('img').next().empty();

    // how to randomize array of images?...


    // choose random integer between 1 and the number of people
    const personInd = randomNum(0, 8)
    let personToGuess = people[personInd].name;

    $('img').addClass('img-game-on')

    // display the name to guess
    $('#guess-zone').empty();
    $('#guess-zone').append(`
            Click on: <span id="person-to-guess">${personToGuess}</span>
    `);
    // create listener on the corresponding box, sending user to congratulations

    $(`#${personToGuess}`).on('click', congratulate)

    // create listener on all other boxes, prompting try again

    $(`img:not(#${personToGuess}`).on('click', tryAgain);

}

function congratulate() {
    // clear all the stuff from previous wrong guesses
    $('.on-image-text').empty();

    //remove in-game functionality on images
    $(`img`).removeClass('img-game-on');
    $(`img`).off('click', tryAgain);
    $(this).off('click', congratulate);

    // blur all other faces. this feels kind of a hacky way to do this. how to select not 'this'?
    $('img').addClass('blur');
    $(this).removeClass('blur');

    //congratulations message
    $(this).next().empty().append(`
    You got it!
`)

    // Turn top button to play again option

    $('#play-game-btn').html('PLAY AGAIN?');
    $('#play-game-btn').removeClass('btn-in-game')
    $('#play-game-btn').addClass('play-again');


}

function tryAgain() {
    console.log($(this));

    $(this).addClass('blur')
    $(this).next().empty().append(`
        Nope! Try again!
    `)
}

function resetGame() {

}