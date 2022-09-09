import { User } from './Models/Users.js'

const trashCan = document.querySelectorAll(".fa-trash-can")
const edit = document.querySelectorAll(".fa-user-pen")
const delBox = document.querySelectorAll("#Selection")
const delAll = document.querySelector("#selectAll")
document.querySelector('.DelButton').addEventListener("click", deleteSelected)
document.querySelector('#add').addEventListener("click", addProfile)
document.querySelector('#edit').addEventListener("click", editProfile)


delAll.addEventListener("change", allBoxes)

Array.from(trashCan).forEach((Element) => {
    Element.addEventListener("click", deleteProfile)
})
Array.from(edit).forEach((Element) => {
    Element.addEventListener("click", editingScreen)
})

Array.from(delBox).forEach((Element) => {
    Element.addEventListener("change", boxSelection)
})

function boxSelection(){
    return [
        getvaluefromUserRow(".Name"),
        getvaluefromUserRow(".Age"),
        getvaluefromUserRow(".State")
    ]
}

function getvaluefromUserRow(value) {
    return Array.from(delBox)
        .filter(i => i.checked)
        .map(i => i.parentNode.querySelector(value).innerText)
}

function allBoxes(){
    if(delAll.checked){
        for(let i=0; i < delBox.length; i++){
            delBox[i].checked=true;  
        }
    }
    else{
        for(let i=0; i < delBox.length; i++){
            delBox[i].checked=false;  
        }
    }
}

async function editingScreen(){
    let userArray = [
        this.parentNode.querySelector(".Name").innerText,
        this.parentNode.querySelector(".Age").innerText,
        this.parentNode.querySelector(".State").innerText
    ]

    let oldUser = new User(userArray[0], userArray[1], userArray[2]) 

    const contOne = document.getElementById('addProfile')
    const contTwo = document.getElementById('editProfile')
    contOne.style.display = 'none'
    contTwo.style.display = 'block'
    
    // document.getElementById('edName').value = userArray[0]
    // document.getElementById('edYears').value = userArray[1]
    // document.getElementById('edLocation').value = userArray[2]
    
    document.getElementById('edName').value = oldUser.firstName
    document.getElementById('edYears').value = oldUser.age
    document.getElementById('edLocation').value = oldUser.state

    //console.log(user)
    editProfile()
    return oldUser
}

async function deleteProfile() {
    const delName = this.parentNode.querySelector(".Name").innerText
    const delAge = this.parentNode.querySelector(".Age").innerText
    const delState = this.parentNode.querySelector(".State").innerText
    try {
        const response = await fetch("deleteprofile", {
            method: "delete",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                Delname: delName,
                Delage: delAge,
                Delstate: delState
            })
        })
        await response.json()
        location.reload()
    }
    catch (err){
        console.error(err)
    }
}

async function deleteSelected() {
    let [DelName, DelAge, DelState] = boxSelection()

     for(let i=0; i < DelName.length; i++){
        let delName = DelName[i]
        let delAge = DelAge[i]
        let delState = DelState[i]
        try {
            const response = await fetch("deletemany", {
                method: "delete",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    Delname: delName,
                    Delage: delAge,
                    Delstate: delState
                })
            })
            await response.json()
        }
        catch (err){
            console.error(err)
        }
    }
    console.log("Multiple Profiles Deleted!!")
    location.reload()
}


async function addProfile() {
    let inputName = document.getElementById('fName').value
    let inputAge = document.getElementById('years').value
    let inputState = document.getElementById('location').value
    try {
        const response = await fetch("addprofile", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: inputName,
                age: inputAge,
                state: inputState
            })
        })
        await response.json()
        location.reload()
    }
    catch (err){
        console.error(err)
    }

}
async function editProfile() {
    let newName = document.getElementById('edName').value
    let newAge = document.getElementById('edYears').value
    let newState = document.getElementById('edLocation').value

    let editInput = await editingScreen()
    // user.firsName = document.getElementById('edName').value
    // user.age = document.getElementById('edYears').value
    // user.state = document.getElementById('edLocation').value
/*     try {
        const response = await fetch("editprofile", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: inputName,
                age: inputAge,
                state: inputState
            })
        })
        await response.json()
        location.reload()
    }
    catch (err){
        console.error(err)
    } */
    console.log(editInput)
    console.log(newName, newAge, newState)
}









   // user.firsName = document.getElementById('edName').value
    // user.age = document.getElementById('edYears').value
    // user.state = document.getElementById('edLocation').value
/*     try {
        const response = await fetch("editprofile", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: inputName,
                age: inputAge,
                state: inputState
            })
        })
        await response.json()
        location.reload()
    }
    catch (err){
        console.error(err)
    } */