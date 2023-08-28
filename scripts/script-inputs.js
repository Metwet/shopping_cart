const submitButton = document.querySelector('.submit-button');
const taxSubtext = document.querySelector('.input__subtext-why');
const inputs = document.querySelectorAll('.user__input');

const validateInput = (input) => {
    const inputValue = input.value.trim();
    const inputId = input.id;
    const subtext = document.querySelector(`.input__subtext-${inputId}`);
    
    if (inputValue === '') {
        subtext.classList.remove('hide');
        taxSubtext.classList.add('hide');
        input.classList.add('orange__input');
    } else {
        subtext.classList.add('hide');
        input.classList.remove('orange__input');
    }
}

inputs.forEach(input => {

    input.addEventListener('input', ()=> {
        const inputValue = input.value.trim();
        const inputId = input.id;
        const subtext = document.querySelector(`.input__subtext-${inputId}`);
        
        if (inputValue !== '') {
            subtext.classList.add('hide');
            input.classList.remove('orange__input');
        }
    });
});

submitButton.addEventListener('click', (event)=> {
    event.preventDefault();
    inputs.forEach(input => {
        validateInput(input);
    });
});

//email validation

const emailInput = document.getElementById('email');
const emailErrorSubtext = document.querySelector('.input-email-error');

const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

emailInput.addEventListener('blur', () => {
    const emailValue = emailInput.value.trim();
    if (emailValue !== '') {
        if (!isValidEmail(emailValue)) {
            emailErrorSubtext.classList.remove('hide');
            emailInput.classList.add('red__input');
        } else {
            emailErrorSubtext.classList.add('hide');
            emailInput.classList.remove('red__input');
        }
    }
});

emailInput.addEventListener('input', () => {
    emailErrorSubtext.classList.add('hide');
    emailInput.classList.remove('red__input');
});

// tax-number validation

const taxInput = document.getElementById('tax');
const taxErrorSubtext = document.querySelector('.input-tax-error');

const isValidTax = (num) => {
    const emailPattern = /^\d{14}$/;
    return emailPattern.test(num);
}

taxInput.addEventListener('blur', () => {
    const inputValue = taxInput.value.trim();
    
    if (!inputValue.length) {
        taxErrorSubtext.classList.add('hide');
        taxInput.classList.remove('red__input');
        taxSubtext.classList.remove('hide');
    } else if (!isValidTax(inputValue)) {
        taxErrorSubtext.classList.remove('hide');
        taxInput.classList.add('red__input');
        taxSubtext.classList.add('hide');
    } else {
        taxErrorSubtext.classList.add('hide');
        taxInput.classList.remove('red__input');
        taxSubtext.classList.remove('hide');
    }
});

taxInput.addEventListener('input', () => {
    const inputValue = taxInput.value.trim();
    
    if (inputValue.length === 0) {
        taxErrorSubtext.classList.add('hide');
        taxSubtext.classList.remove('hide');
        taxInput.classList.remove('red__input');
    } else {
        taxErrorSubtext.classList.add('hide');
        taxInput.classList.remove('red__input');
    }

    taxInput.value = inputValue.replace(/[^\d]/g, '');
});

//phone validation
const phoneInput = document.getElementById('phone');
const phoneSubtext = document.querySelector('.input__subtext-phone');
const phoneErrorSubtext = document.querySelector('.input-phone-error');

const isValidPhone = (phone) => {
    const phonePattern = /^\+?\d{1,2} \d{3} \d{3} \d{2} \d{2}$/;
    return phonePattern.test(phone);
}

phoneInput.addEventListener('blur', () => {
    const inputValue = phoneInput.value.trim();
    
    if (!isValidPhone(inputValue)) {
        phoneErrorSubtext.classList.remove('hide');
        phoneInput.classList.add('red__input');
    } else {
        phoneErrorSubtext.classList.add('hide');
        phoneInput.classList.remove('red__input');
    }

    if(inputValue.length === 0){
        phoneErrorSubtext.classList.add('hide');
        phoneInput.classList.remove('red__input');
    }
});

phoneInput.addEventListener('input', () => {
    let inputValue = phoneInput.value.trim();
    
    inputValue = inputValue.replace(/[^\d+]/g, '');
    
    if (inputValue.length > 0 && inputValue[0] !== '+') {
        inputValue = '+' + inputValue;
    }
    
    if (inputValue.length > 30) {
        inputValue = inputValue.slice(0, 30);
    }
    
    if (inputValue.length > 2) {
        inputValue = inputValue.slice(0, 2) + ' ' + inputValue.slice(2);
    }
    if (inputValue.length > 6) {
        inputValue = inputValue.slice(0, 6) + ' ' + inputValue.slice(6);
    }
    if (inputValue.length > 10) {
        inputValue = inputValue.slice(0, 10) + ' ' + inputValue.slice(10);
    }
    if (inputValue.length > 13) {
        inputValue = inputValue.slice(0, 13) + ' ' + inputValue.slice(13);
    }
    if (inputValue.length > 16) {
        inputValue = inputValue.slice(0, 16) + ' ' + inputValue.slice(16);
    }
    
    phoneInput.value = inputValue;
});
