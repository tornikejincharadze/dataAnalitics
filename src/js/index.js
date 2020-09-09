const formInputs = Array.from(document.getElementsByClassName('input'));
const formGroup = document.getElementById('signUpForm');

// Check form input values && if it is filled, add class to it
formInputs.forEach(item => {
    item.addEventListener('change', function () {
        item.value !== '' ? item.classList.add('filled') : item.classList.remove('filled');
    });
});

formGroup.submit.addEventListener('click', function (e) {
    e.preventDefault();
    validate(formGroup.email, formGroup.password, formGroup.rePassword) === true ? HTMLFormElement.prototype.submit.call(formGroup) : '';
});


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(email.value) !== true ? email.classList.add('invalid') : email.classList.remove('invalid');
    return re.test(email.value);
}

function validatePasswords(pass, secondPass) {
    pass.value === '' ? pass.classList.add('invalid') : pass.classList.remove('invalid');
    secondPass.value === '' || pass.value !== secondPass.value ? secondPass.classList.add('invalid') : secondPass.classList.remove('invalid');
    return pass.value === secondPass.value && (pass.value !== '' || secondPass.value !== '');
}

function validate(email, password, secondPassword) {
    return validateEmail(email) && validatePasswords(password, secondPassword);
}

// Responsive menu scripts
const burgerBtn = document.getElementById('brgBtn');
const burgerMenu = document.getElementById('burgerNav');
const navItems = Array.from(document.getElementsByClassName('navigation-item'));

function openNav() {
    burgerBtn.classList.add('active');
    burgerMenu.classList.add('active');
    document.body.classList.add('frozen');
    console.log('opened')
}

function closeNav() {
    burgerBtn.classList.remove('active');
    burgerMenu.classList.remove('active');
    document.body.classList.remove('frozen');
    console.log('closed')
}

function removeActiveClass(nav){
    nav.forEach(item => {
        item.classList.remove('active');
    })
}

navItems.forEach(item => {
    item.addEventListener('click', function (e) {
        e.stopPropagation();
        removeActiveClass(navItems);
        this.classList.add('active');
        closeNav();
    });
});

document.addEventListener('click', function (event) {
    var isClickInside = burgerMenu.contains(event.target) || (burgerBtn.contains(event.target) && !burgerBtn.classList.contains('active'));
    isClickInside ? openNav() : closeNav();
});