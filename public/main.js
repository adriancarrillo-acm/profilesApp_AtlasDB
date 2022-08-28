const trashCan = document.querySelectorAll(".fa-trash-can")
const delSelection = document.querySelector(".DelButton")
const delBox = document.querySelectorAll("#Selection")

Array.from(trashCan).forEach((Element) => {
    Element.addEventListener("click", deleteProfile)
})

Array.from(delBox).forEach((Element) => {
    Element.addEventListener("change", saveEvents)
})

function saveEvents(){
    let checked = this.siblingNode.querySelectorAll(".deleteBbox:checked").innerText
    console.log(checked)
/*     checked.forEach((elem) => {
        elem.parentElement.style.display = "none"
    }) */
}
/*     let values = Array.from(delBox).filter(i => i.checked).map(i => i.value)
    .forEach((Element) => {
        document.querySelector("td.Name").innerText}) */


async function saveValue(){
   // let count = saveEvents()
/*     let a = Array.from(count)
    for( i=0; i < a.length; i++){
        if(a[i] === 'on'){
        console.log("Box Checked")
        }
        else{
            console.log("hhhgugughuhg")
        }
    } */
    //console.log(count)
}


delSelection.addEventListener("click", saveValue)


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
    let values = saveValue()
    for (let i=0; i < values.length; i++){
    const delName = values.valName
    const delAge = values.valAge
    const delState = values.valState
/*     try {
        const response = await fetch("deletemany", {
            method: "delete",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                Delname: delName,
                Delage: delAge,
                Delstate: delState
            })
        })
    }
    catch (err){
        console.error(err)
    }    
    await response.json()
    location.reload() */
    console.log(`${delName}, ${delAge}, ${delState}`)
}
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