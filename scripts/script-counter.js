//hide by arrow

const toggleBlockVisibility = (button, block, isBlockVisible) => {
    if (isBlockVisible) {
        block.classList.add('hide');
        button.style.transform = 'rotate(180deg)';
    } else {
        block.classList.remove('hide');
        button.style.transform = 'rotate(0deg)';
    }

    return !isBlockVisible;
}

const basketArrow = document.getElementById('basket-arrow');
const basketMovedBlock = document.getElementById('moved-by-arrow');
let isBasketVisible = true;

basketArrow.addEventListener('click', () => {
    isBasketVisible = toggleBlockVisibility(basketArrow, basketMovedBlock, isBasketVisible);
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
const totalOldPriceElement = document.querySelector('.go-oldPrice');
const totalDiscountElement = document.querySelector('.go-discount');
const totalDeliveryElement = document.querySelector('.go-delivery-goods');


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
    updateTotalPrices()
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
        if(deliveryCounts[1].innerHTML == "184"){
            secondDelibery.classList.add('hide');
        }
        deliveryCounts[index].innerHTML = goodsCount;
    }
}