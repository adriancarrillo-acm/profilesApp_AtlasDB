const trashCan = document.querySelectorAll(".fa-trash-can")
const delBox = document.querySelectorAll("#Selection")

Array.from(trashCan).forEach((Element) => {
    Element.addEventListener("click", deleteProfile)
})

Array.from(delBox).forEach((Element) => {
    Element.addEventListener("change", boxSelection)
})

function boxSelection(){
    let selectedBoxes = Array.from(delBox).filter(i => i.checked)
    .map(i => i.parentNode.querySelector(".Name").innerText)
    return selectedBoxes
}

/* async function saveValue(){
     let count = saveEvents()
     let a = Array.from(count)
    for( i=0; i < a.length; i++){
        if(a[i] === 'on')

/* async function saveValue(){
     let count = saveEvents()
     let a = Array.from(count)
    for( i=0; i < a.length; i++){
        if(a[i] === 'on'){
        console.log("Box Checked")
        }
        else{
            console.log("hhhgugug")}     
} */


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
    let nameArray = boxSelection()
    for(let i=0; i < nameArray.length; i++){
        let delName = nameArray[i]
        try {
            const response = await fetch("deletemany", {
                method: "delete",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    Delname: delName
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