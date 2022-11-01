let personToGuess;

console.log('Here are all the available people:', people); // i added two so it would make a nice 3x3 grid

$(document).ready(onReady);

function onReady() {
    loadImages();
    $('#play-game-btn').on('click', loadImages);
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
            <div class="prof-pic" id="${personToAdd.name}" style="background-image: url(https://github.com/${personToAdd.githubUsername}.png?size=250)" aria-label="Profile image of ${personToAdd.name}">
                <div class='empty'></div>
                <p class="on-image-text"></p>
            </div>
        `)
    }


    // append people
}

function loadImages() {
    $('#list-of-people').empty();
    for (let person of people) {
        $('#list-of-people').append(`
            <div class="prof-pic" id="${person.name}" style="background-image: url(https://github.com/${person.githubUsername}.png?size=250)" aria-label="Profile image of ${person.name}">
            <div class='empty'></div>
                <p class="on-image-text"></p>
            </div>
        `)
    }
}

function startGame() {
    console.log('in startGame');
    // reset stuff in case this is not the first time playing

    resetGame(); //resets all classes, empties text fields, arms/disarms buttons

    // $('#play-game-btn').removeClass('play-again');
    // $('#play-game-btn').addClass('btn-in-game');
    // $('#play-game-btn').empty().text('MAKE YOUR GUESS');

    // $('img').removeClass('blur');
    // $('img').next().empty();

    // how to randomize array of images?...


    // disarm button during game
    $('#play-game-btn').off('click', loadImages);
    $('#play-game-btn').off('click', startGame);
    // choose random integer between 1 and the number of people
    const personInd = randomNum(0, 8)
    let personToGuess = people[personInd].name;

    $('.prof-pic').addClass('game-on')

    // display the name to guess
    $('#guess-zone').empty();
    $('#guess-zone').append(`
        Click on: <span id="person-to-guess">${personToGuess}</span>
    `);
    // create listener on the corresponding box, sending user to congratulations

    $(`#${personToGuess}`).on('click', congratulate)

    // create listener on all other boxes, prompting try again

    $(`.prof-pic:not(#${personToGuess}`).on('click', tryAgain);

}

function congratulate() {


    //remove in-game functionality on images
    $(`.prof-pic`).removeClass('img-game-on');
    $(`.prof-pic`).off('click', tryAgain);
    $(this).off('click', congratulate);

    // blur all other faces. this feels kind of a hacky way to do this. how to select not 'this'?
    $('.prof-pic').addClass('blur');
    $(this).removeClass('blur');

    //congratulations message
    $(this).children('.on-image-text').addClass('correct');
    $(this).children('.on-image-text').empty().append(`
    YOU GOT IT!
`)

    setTimeout(activateButtons, 2000);

}

function activateButtons() {
    // Turn top button to play again option

    $('#play-game-btn').text('PLAY AGAIN?');
    $('#play-game-btn').on('click', startGame);

    $('#play-game-btn').removeClass('btn-in-game')
    $('#play-game-btn').addClass('play-again');

    // create hard mode option

    $('#btn-container').append(`
        <div id="random-game-btn" class="button play-again">
             HARD MODE?
        </div>
`);

    $('#random-game-btn').on('click', loadRandom);
    $('#random-game-btn').on('click', startGame);
}


function tryAgain() {
    $(this).addClass('.blur')
    $(this).children('.on-image-text').addClass('incorrect');

    $(this).children('.on-image-text').empty().append(`
    TRY AGAIN
`)
}

function resetGame() {
    // clear text under images
    $('.prof-pic').children('.on-image-text').empty();
    $('.prof-pic').children('.on-image-text').removeClass('correct');
    $('.prof-pic').children('.on-image-text').removeClass('incorrect');

    // remove image blur
    $('.prof-pic').removeClass('blur');

    // reset start game buttons
    $('#play-game-btn').on('click', loadImages);
    $('#play-game-btn').on('click', startGame);
    $('#play-game-btn').html('MAKE YOUR GUESS');
    $('.button').off('click', startGame);

    $('.button').addClass('btn-in-game');
    $('.button').removeClass('play-again');

    // remove hard mode button

    $('#random-game-btn').remove();
}

//to-do

// style 'click on:' area 
// implement setTimeout
// format text to occur on top of images. this means changing images into divs with background image and aria labels

