// popups

const paymentDiv = document.getElementById('change-section__payment');
const deliveryDiv = document.getElementById('change-section__delivery');
const paymentButtons = document.querySelectorAll('.payment-fix');
const deliveryButtons = document.querySelectorAll('.delivery-fix');
const closeButtons = document.querySelectorAll('.close');

const hideAllPopups = () => {
    paymentDiv.style.display = 'none';
    deliveryDiv.style.display = 'none';
}

const showPayment = () => {
    paymentDiv.style.display = 'flex';
}

const showDelivery = () => {
    deliveryDiv.style.display = 'flex';
}

closeButtons.forEach(button => {
    button.addEventListener('click', hideAllPopups);
});

paymentButtons.forEach(event => {
    event.addEventListener('click', showPayment);
});

deliveryButtons.forEach(event => {
    event.addEventListener('click', showDelivery);
});

window.onclick = (event) => {
 if(event.target == paymentDiv){
    paymentDiv.style.display = 'none';
 }
 if(event.target == deliveryDiv){
    deliveryDiv.style.display = 'none';
 }
}

//type of delivery

const btnTake = document.getElementById('delivery-type__btn-take');
const btnCourier = document.getElementById('delivery-type__btn-courier');
const itemsCourier = document.querySelector('.change__items-courier');
const itemsTake = document.querySelector('.change__items-take');

btnTake.addEventListener('click', () => {
    btnTake.classList.add('btn-active');
    btnCourier.classList.remove('btn-active');
    itemsCourier.style.display = 'none';
    itemsTake.style.display = 'block';
});

btnCourier.addEventListener('click', () => {
    btnCourier.classList.add('btn-active');
    btnTake.classList.remove('btn-active');
    itemsTake.style.display = 'none';
    itemsCourier.style.display = 'block';
});

//change delivery text 

const deliveryDoneButton = document.querySelector('.change-btn__delivery');
const radioDeliveryButtons = document.querySelectorAll('.real-radio-delivery');
const deliveryTextBlocks = document.querySelectorAll('.go-delivery-text');

deliveryDoneButton.addEventListener('click', () => {
    let selectedAddress = '';

    radioDeliveryButtons.forEach(radioButton => {
        if (radioButton.checked) {
            const radioLabel = radioButton.closest('.change__radio');
            const addressTextElement = radioLabel.querySelector('.change__radio-text');
            
            const cleanAddressText = addressTextElement.cloneNode(true);
            cleanAddressText.querySelectorAll('img').forEach(img => img.remove());

            selectedAddress = cleanAddressText.textContent.trim();
        }
    });

    if (selectedAddress) {
        deliveryTextBlocks.forEach(block => {
            block.textContent = selectedAddress;
        });
    }

    hideAllPopups();
});

//change payment text 

const radioPaymentButtons = document.querySelectorAll('.real-radio-payment');
const paymentTextBlocks = document.querySelectorAll('.go-payment-data');
const paymentDoneButton = document.querySelector('.change-btn__payment');

paymentDoneButton.addEventListener('click', () => {
    let selectedText = '';
    let selectedImg = '';

    radioPaymentButtons.forEach(radioButton => {
        if (radioButton.checked) {
            const radioLabel = radioButton.closest('.change__radio');
            selectedText = radioLabel.querySelector('.change__radio-text').textContent.trim();
            selectedImg = radioLabel.querySelector('.change__img img').src;
        }
    })

    paymentTextBlocks.forEach(block => {
        block.innerHTML = `
            <div class="payment-logo">
                <img src="${selectedImg}" alt="payment_icon">
            </div>
            <div class="payment-card">${selectedText}</div>
        `;
    })

    hideAllPopups();
})
