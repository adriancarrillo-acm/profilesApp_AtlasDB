
/* async function init() {
    document.getElementById('name').textContent = 'John Wick';
    document.getElementById('email').textContent = 'John Wick@hotmail.com';
    document.getElementById('interests').textContent = 'fighting';

    const cont = document.getElementById('container');
    cont.style.display = 'block';
    getButn.style.display = 'none'
}; */

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
                state: inputState,
            })
        })
        location.reload()
    }
    catch (err){
        console.error(err)
    }
}

/* function editProfile() {
    const contEdit = document.getElementById('container-edit');
    const cont = document.getElementById('container');

    document.getElementById('input-name').value = document.getElementById('name').textContent;
    document.getElementById('input-email').value = document.getElementById('email').textContent;
    document.getElementById('input-interests').value = document.getElementById('interests').textContent;

    cont.style.display = 'none';
    contEdit.style.display = 'block';
} */