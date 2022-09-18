const trashCan = document.querySelectorAll(".fa-trash-can")
const edit = document.querySelectorAll(".fa-user-pen")
const delBox = document.querySelectorAll("#Selection")
const delAll = document.querySelector("#selectAll")
document.querySelector('.DelButton').addEventListener("click", deleteSelected)
document.querySelector('#add').addEventListener("click", addProfile)
document.querySelector('#edit').addEventListener("click", editProfile)

delAll.addEventListener("change", allBoxes)

let userToEdit = {}

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
        getvaluefromuserRow(".Name"),
        getvaluefromuserRow(".Age"),
        getvaluefromuserRow(".State")
    ]
}

function getvaluefromuserRow(value) {
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

    userToEdit.name = userArray[0]
    userToEdit.age = userArray[1]
    userToEdit.state = userArray[2] 

    const contOne = document.getElementById('addProfile')
    const contTwo = document.getElementById('editProfile')
    contOne.style.display = 'none'
    contTwo.style.display = 'block'

    document.getElementById('edName').value = userToEdit.name
    document.getElementById('edYears').value = userToEdit.age
    document.getElementById('edLocation').value = userToEdit.state
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
    let newState = document.getElementById('edLocation').value.toUpperCase()
    let update = {name: newName, age: newAge, state: newState}
    try {
        const response = await fetch("editprofile", {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({update, userToEdit})
        })
        await response.json()
        location.reload()
    }
    catch (err){
        console.error(err)
    } 
}