const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let userData = []

// User Functions
async function getData() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()
    // console.log(data)
    const fullName = data.results[0].name.first + " " + data.results[0].name.last
    const wealth = `$${Math.floor(Math.random() * 1000000)}`;
    const newUser = {
        name: fullName,
        money: wealth
    }
    userData.push(newUser);
    updateMain();
}
function updateMain() {
    // const user = userData[userData.length - 1]
    main.innerHTML = ' <h2> <strong>Person</strong> Wealth </h2>'
    userData.forEach((user) => {
        main.innerHTML += `<div class="person">
        <div>${user.name}</div>
        <div>${user.money}</div>
        </div> `
    })
}
function double() {
    const newData = userData.map((item) => {
        var name = item.name
        var money = item.money
        return ({
            name: name,
            money: `$${money.slice(1) * 2}`
        }
        )
    })
    userData = newData;
    updateMain()
}
function filter() {
    const newData = userData.filter((user) => {
        const wealth = Number(user.money.slice(1))
        return wealth >= 1000000
    })
    userData = newData;
    updateMain()
}
function sortByrichest() {
    userData.sort((a, b) => {
        const w1 = Number(a.money.slice(1))
        const w2 = Number(b.money.slice(1))
        return w1 - w2;
    })
    updateMain()
}
function calculateTotal() {
    let total = 0
    userData.forEach((user) => {
        const w1 = Number(user.money.slice(1))
        total += w1
    })
    main.innerHTML += `<div class="person total">
    <div >Total</div>
    <div>$${total}</div>
    </div> `
}
addUserBtn.addEventListener('click', getData)
doubleBtn.addEventListener('click', double)
showMillionairesBtn.addEventListener('click', filter)
sortBtn.addEventListener('click', sortByrichest)
calculateWealthBtn.addEventListener('click', calculateTotal)

