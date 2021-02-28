
const blockGame = document.getElementById('game')
const blockGameChoise = document.getElementById('game-choise')

const countUser = document.getElementById('score-count')
let count = 0;

const fields = document.getElementsByClassName('field')
const arrayChoises = getValues(fields)

const userPickedImg = document.getElementById('user-picked-img')
const housePickedImg = document.getElementById('house-picked-img')

const buttonPlayAgain = document.getElementById('play-again-botton')
const gameResult = document.getElementById('game-result-title')
const divGame = document.getElementById('game-result')

const divHouse = document.getElementById('house-pickedfield')
const divUser = document.getElementById('user-picked-field')

const openRules_btn = document.getElementById('rules-button')
const cancelBtn = document.getElementById('popup-close')
countUser.innerText = count

openRules_btn.onclick = function entry() {
   document.getElementById('entry').style.display = "block";
}

window.onclick = function (e) {
   if (e.target == document.getElementById('entry')) {
      document.getElementById('entry').style.display = "none";
   }
}

cancelBtn.onclick = function () {
   document.getElementById('entry').style.display = "none";
}


function getValues(select) {
   var result = [];

   for (var i = 0, iLen = select.length; i < iLen; i++) {
      let input = select[i];
      result.push(input);
   }
   return result;
}


function userChoise(e) {
   let target = e.target;
   if (target.classList.contains('field')) {
      userStep = target.id
      blockGame.style.display = 'none'
      blockGameChoise.style.display = 'flex'
      userPickedImg.src = `images/icon-${userStep}.svg`
      divUser.className += ` picked-${userStep}`
      setTimeout(houseChoise, 2000);
   }
}
function houseChoise() {
   let itemsForChoise = [...arrayChoises]
   let neededIndex = Math.floor(Math.random() * (itemsForChoise.length - 0) + 0)
   houseChoosen = itemsForChoise[neededIndex].id
   housePickedImg.src = `images/icon-${houseChoosen}.svg`
   divHouse.className += `picked-${houseChoosen}`
   divHouse.id = 'house-picked-field'
   divGame.style.display = 'flex'
   winner()
}
function winner() {
   let combRes = userStep + houseChoosen;
   switch (combRes) {
      case 'rockrock':
      case 'paperpaper':
      case 'scissorsscissors':
      case 'spockspock':
      case 'lizardlizard':
         gameResult.innerText = 'It is draw)'

         break
      case 'rockscissors':
      case 'paperrock':
      case 'paperspock':
      case 'scissorspaper':
      case 'rocklizard':
      case 'spockrock':
      case 'scissorslizard':
      case 'lizardspock':
      case 'lizardpaper':
         gameResult.innerText = 'You won'
         count++
         countUser.innerText = count
         break
      default:
         gameResult.innerText = 'You loose '
         count--
         countUser.innerText = count
   }
   localStorage.setItem('counter', count);
}

count = localStorage.getItem('counter')
countUser.innerText = count
function playGame() {
   blockGame.style.display = 'block'
   blockGameChoise.style.display = 'none'
   divUser.className = ''
   divHouse.className = ''
   divHouse.id = 'house-pickedfield'
   divGame.style.display = 'none'
   housePickedImg.src = ``
}


for (let i = 0; i < arrayChoises.length; i++) {
   arrayChoises[i].addEventListener('click', userChoise)
}
buttonPlayAgain.addEventListener('click', playGame)


