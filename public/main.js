const getButn = document.querySelector('#getButton');
const editButn = document.querySelector('#editButton');
const updateButn = document.querySelector('#updateButton');

getButn.addEventListener("click", init)
editButn.addEventListener("click", editProfile)
updateButn.addEventListener("click", updateProfile)


async function init() {
    document.getElementById('name').textContent = 'John Wick';
    document.getElementById('email').textContent = 'John Wick@hotmail.com';
    document.getElementById('interests').textContent = 'fighting';

    const cont = document.getElementById('container');
    cont.style.display = 'block';
    getButn.style.display = 'none'
};

async function updateProfile() {
    const contEdit = document.getElementById('container-edit');
    const cont = document.getElementById('container');

    const payload = {
        name: document.getElementById('input-name').value, 
        email: document.getElementById('input-email').value, 
        interests: document.getElementById('input-interests').value
    };

    document.getElementById('name').textContent = payload.name;
    document.getElementById('email').textContent = payload.email;
    document.getElementById('interests').textContent = payload.interests;

    cont.style.display = 'block';
    contEdit.style.display = 'none';
}

function editProfile() {
    const contEdit = document.getElementById('container-edit');
    const cont = document.getElementById('container');

    document.getElementById('input-name').value = document.getElementById('name').textContent;
    document.getElementById('input-email').value = document.getElementById('email').textContent;
    document.getElementById('input-interests').value = document.getElementById('interests').textContent;

    cont.style.display = 'none';
    contEdit.style.display = 'block';
}