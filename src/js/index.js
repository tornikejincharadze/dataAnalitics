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
    validate(formGroup.email, formGroup.password, formGroup.rePassword) === true ? HTMLFormElement.prototype.submit.call(formGroup) : console.log('err');
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

function submit(e){

}