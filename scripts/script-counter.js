//hide by arrow
const collapsedBlock = document.querySelector('.collapsed');
const chechboxAllBlock = document.querySelector('.basket-checkbox-all');

const toggleBlockVisibility = (button, block, isBlockVisible, isCollapsedBlock) => {
    if (isBlockVisible) {
        block.classList.add('hide');
        button.style.transform = 'rotate(180deg)';
        if(isCollapsedBlock){
            collapsedBlock.classList.remove('hide');
            chechboxAllBlock.classList.add('hide');
        }
    } else {
        block.classList.remove('hide');
        button.style.transform = 'rotate(0deg)';
        if(isCollapsedBlock){
            collapsedBlock.classList.add('hide');
            chechboxAllBlock.classList.remove('hide');
        }
    }

    return !isBlockVisible;
}

const basketArrow = document.getElementById('basket-arrow');
const basketMovedBlock = document.getElementById('moved-by-arrow');
let isBasketVisible = true;

basketArrow.addEventListener('click', () => {
    isBasketVisible = toggleBlockVisibility(basketArrow, basketMovedBlock, isBasketVisible, true);
});

const missingArrow = document.getElementById('missing-arrow');
const missingMovedBlock = document.getElementById('missing-moved-by-arrow');
let isMissingVisible = true;

missingArrow.addEventListener('click', () => {
    isMissingVisible = toggleBlockVisibility(missingArrow, missingMovedBlock, isMissingVisible);
});

//checkboxes

const allCheckbox = document.getElementById('all-checkbox');
const itemCheckboxes = document.querySelectorAll('.item-checkbox');

allCheckbox.addEventListener('change', () => {
    const isChecked = allCheckbox.checked;

    itemCheckboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
        const changeEvent = new Event('change');
        checkbox.dispatchEvent(changeEvent);
    });
});

itemCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const areAllChecked = Array.from(itemCheckboxes).every(checkbox => checkbox.checked);
        allCheckbox.checked = areAllChecked;
    });
});

// change price depending on checkboxes

const newPriceBlocks = document.querySelectorAll('.new-price');
const oldPriceBlocks = document.querySelectorAll('.old-price');
const deliveryImg = document.querySelectorAll('.details-img');
const secondDelibery = document.getElementById('second-delivery');

const totalNewPriceElement = document.querySelector('.go-newPrice');
const totalPriceCollapsedElement = document.querySelector('.collapsed-price');
const totalOldPriceElement = document.querySelector('.go-oldPrice');
const totalDiscountElement = document.querySelector('.go-discount');
const totalDeliveryElement = document.querySelector('.go-delivery-goods');
const totalDeliveryCollapsedElement = document.querySelector('.collapsed-goods');


itemCheckboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
        updateTotalPrices();
        if(checkbox.checked){
            deliveryImg[index].classList.remove('hide');
            if(index===1){
                secondDelibery.classList.remove('hide');
            }
        }else{
            deliveryImg[index].classList.add('hide');
            if(index===1){
                secondDelibery.classList.add('hide');
            }
        }
    });
});

//counter +/-

const minusButtons = document.querySelectorAll('.counter__minus');
const plusButtons = document.querySelectorAll('.counter__plus');
const counterNumbers = document.querySelectorAll('.counter__number');

for (let i = 0; i < minusButtons.length; i++) {
    minusButtons[i].addEventListener('click', () => {
        if (counterNumbers[i].textContent > 1) {
            counterNumbers[i].textContent = parseInt(counterNumbers[i].textContent) - 1;
            updateItemPrice(i);
            updateDeliveryCount(i);
            if (i !== 1 && counterNumbers[i].textContent <= 2) {
                plusButtons[i].classList.add("last-item");
            }
            if (i !== 1 && counterNumbers[i].textContent === "1") {
                minusButtons[i].classList.add("last-item");
                plusButtons[i].classList.remove("last-item");
            } else {
                minusButtons[i].classList.remove("last-item");
            }
        }
    });

    plusButtons[i].addEventListener('click', () => {
        if (i !== 1) {
            if (counterNumbers[i].textContent < 2) {
                minusButtons[i].classList.remove("last-item");
            }
            if (counterNumbers[i].textContent < 2) {
                counterNumbers[i].textContent = parseInt(counterNumbers[i].textContent) + 1;
                updateItemPrice(i);
                updateDeliveryCount(i);
                if (counterNumbers[i].textContent === "2") {
                    plusButtons[i].classList.add("last-item");
                }
            }
        } else {
            counterNumbers[i].textContent = parseInt(counterNumbers[i].textContent) + 1;
            updateItemPrice(i);
            updateDeliveryCount(i)
        }
    });
}

//get one item prices

const oneItemPrices = [];

for (let i = 0; i < newPriceBlocks.length; i++) {
    const newPrice = parseInt(newPriceBlocks[i].textContent.replace(/\s+/g, '').trim());
    const oldPrice = parseInt(oldPriceBlocks[i].textContent.replace(/\s+/g, '').trim());
    const goodsCount = parseInt(counterNumbers[i].textContent);
    let itemNewPrice = Math.round(newPrice / goodsCount);
    let itemOldPrice = Math.round(oldPrice / goodsCount);
    oneItemPrices.push({
        itemNewPrice: itemNewPrice,
        itemOldPrice: itemOldPrice
    })
}

//update total prices

function updateItemPrice(index){
    const newPriceBlock = newPriceBlocks[index];
    const oldPriceBlock = oldPriceBlocks[index];
    const count = parseInt(counterNumbers[index].textContent);

    const newPrice = count * oneItemPrices[index].itemNewPrice;
    const oldPrice = count * oneItemPrices[index].itemOldPrice;;
    
    newPriceBlock.textContent = `${newPrice.toLocaleString()} сом`;
    oldPriceBlock.textContent = `${oldPrice.toLocaleString()} сом`;
    updateTotalPrices();
}

function updateTotalPrices() {
    let selectedItemsTotalNewPrice = 0;
    let selectedItemsTotalOldPrice = 0;
    let selectedItemsTotalDiscount = 0;
    let totalItemsCount = 0;

    for (let i = 0; i < itemCheckboxes.length; i++) {
        if (itemCheckboxes[i].checked) {
            const newPrice = parseInt(newPriceBlocks[i].textContent.replace(/\s+/g, '').trim());
            const oldPrice = parseInt(oldPriceBlocks[i].textContent.replace(/\s+/g, '').trim());
            selectedItemsTotalNewPrice += newPrice;
            selectedItemsTotalOldPrice += oldPrice;
            selectedItemsTotalDiscount += (oldPrice - newPrice);
            totalItemsCount += parseInt(counterNumbers[i].textContent);
        }
    }

    totalNewPriceElement.textContent = `${selectedItemsTotalNewPrice.toLocaleString()} сом`;
    totalOldPriceElement.textContent = `${selectedItemsTotalOldPrice.toLocaleString()} сом`;
    if(selectedItemsTotalDiscount === 0) {
        totalDiscountElement.textContent = `${selectedItemsTotalDiscount.toLocaleString()} сом`;
    } else {
        totalDiscountElement.textContent = `-${selectedItemsTotalDiscount.toLocaleString()} сом`;
    }
    if(totalItemsCount === 0){
        totalDeliveryElement.textContent = `Нет товаров`;
    } else if(totalItemsCount === 1){
        totalDeliveryElement.textContent = `${totalItemsCount} товар`;
    } else {
        totalDeliveryElement.textContent = `${totalItemsCount} товара`;
    }
    totalPriceCollapsedElement.textContent = `${selectedItemsTotalNewPrice.toLocaleString()}`;
    totalDeliveryCollapsedElement.textContent = `${totalItemsCount}`;
    updateOrderButton();
}

//delivery count 
const deliveryCounts = document.querySelectorAll('.delivery-count');

function updateDeliveryCount(index) {
    const goodsCount = counterNumbers[index].textContent;
    if(goodsCount == 1){
        deliveryCounts[index].classList.add('hide');
    } else {
        deliveryCounts[index].classList.remove('hide');
    }
    if(goodsCount > 184) {
        secondDelibery.classList.remove('hide');
        deliveryCounts[index].innerHTML = "184";
        deliveryCounts[3].innerHTML = goodsCount - 184;
    } else {
        if(index === 1 && deliveryCounts[1].innerHTML == "184"){
            secondDelibery.classList.add('hide');
        }
        deliveryCounts[index].innerHTML = goodsCount;
    }
}

//pay now checkbox

const payNowCheckbox = document.querySelector('.pay-now-checkbox');
const paymentTimeText = document.getElementById('payment-time__text');

payNowCheckbox.addEventListener('change', () => {
    updateOrderButton();
});

function updateOrderButton () {
    if (payNowCheckbox.checked) {
        const newPrice = totalNewPriceElement.textContent.trim();
        submitButton.textContent = `Оплатить ${newPrice}`;
        paymentTimeText.classList.add('hide');
    } else {
        submitButton.textContent = 'Заказать';
        paymentTimeText.classList.remove('hide');
    }
}

// delete items
const deleteButtons = document.querySelectorAll('.item__btn-delete');
const items = document.querySelectorAll('.basket-section__item');
let countMissingDelete = 0;

deleteButtons.forEach((deleteButton, index)=>{
    deleteButton.addEventListener('click', ()=>{
        items[index].classList.add('hide');
        if(index < 3){
            itemCheckboxes[index].checked = false;
            updateTotalPrices();
            updateDeliveryCount(index);
            deliveryImg[index].classList.add('hide');
            if(index===1){
                secondDelibery.classList.add('hide');
            }
            if(!itemCheckboxes[0].checked && !itemCheckboxes[1].checked  && !itemCheckboxes[2].checked){
                const basketListElement = document.querySelectorAll('.basket-section__list');
                basketListElement[0].innerHTML = '<h2>Корзина пуста</h2>';
            }
            changeShoppingStatus();
        }else{
            countMissingDelete++;
            console.log(countMissingDelete);
        }
        
        if(countMissingDelete===3){
            const missingElement = document.querySelector('.basket-section__missing');
            missingElement.classList.add('hide');
        }
    })
});

function changeShoppingStatus(){
    const statusElement = document.querySelectorAll('.shopping-status');
    statusElement.forEach((status)=>{
        let oldNumber = parseInt(status.textContent);
        oldNumber--;
        if(oldNumber){
            status.textContent = oldNumber;
        } else {
            status.classList.add('hide');
        }
    });
}

// like items

const likeImg = document.querySelectorAll('.like');
const likedImg = document.querySelectorAll('.liked');

likeImg.forEach((like, index)=> {
    like.addEventListener('click', ()=>{
        like.style.display = 'none';
        likedImg[index].style.display = 'block';
    })
});

likedImg.forEach((liked, index)=> {
    liked.addEventListener('click', ()=>{
        liked.style.display = 'none';
        likeImg[index].style.display = 'block';
    });
});