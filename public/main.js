const trashCan = document.querySelectorAll(".fa-trash-can")
const delBox = document.querySelectorAll("#Selection")
const delAll = document.querySelector("#selectAll")

delAll.addEventListener("change", allBoxes)

Array.from(trashCan).forEach((Element) => {
    Element.addEventListener("click", deleteProfile)
})

Array.from(delBox).forEach((Element) => {
    Element.addEventListener("change", boxSelection)
})

function boxSelection(){
    let selectedNames = Array.from(delBox).filter(i => i.checked)
    .map(i => i.parentNode.querySelector(".Name").innerText)
    let selectedAges = Array.from(delBox).filter(i => i.checked)
    .map(i => i.parentNode.querySelector(".Age").innerText)
    let selectedStates = Array.from(delBox).filter(i => i.checked)
    .map(i => i.parentNode.querySelector(".State").innerText)
    return [selectedNames, selectedAges, selectedStates]
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