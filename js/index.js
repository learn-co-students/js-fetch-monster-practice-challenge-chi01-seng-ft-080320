const monsterContainer = document.getElementsByClassName('monsterContainer')[0]
const monsterForm = document.getElementById('newMonsterForm')
const forwardBtn = document.getElementById('forward')

function main () {
    loadPageWithMonster()
}


function loadPageWithMonster() {
    fetch ("http://localhost:3000/monsters?_limit=50&_page=1")
    .then(resp => resp.json())
    .then(monsters => monsterIndex(monsters))
}

function monsterIndex (monsters) {
    monsters.forEach(monster => {
        monsterContainer.innerHTML += `
        <h3>${monster.name}<h3>
        <h4>${monster.age}<h4>
        <p>${monster.description}</p><br>
        `
    })
}

function createNewMonster(e){
    let newMonster = {
        name: e.target['monsterName'].value,
        age: e.target['age'].value,
        description: e.target['monsterDescription'].value
    }
    const reqObj = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMonster)
    }

    fetch("http://localhost:3000/monsters", reqObj)
    .then(resp => resp.JSON())
    .then(data => console.log(data))
}

function movePageFwrd(){
let num = 1
fetch(`http://localhost:3000/monsters?_limit=50&_page=${num += 1}`)
.then(resp => resp.json())
.then(monsters => monsterIndex(monsters))
}

monsterForm.addEventListener('submit', createNewMonster)

forwardBtn.addEventListener('click', movePageFwrd)



main()