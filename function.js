let seatCount = 0;
const ticketClass = 'Economy';
const ticketPrice = 550;

const seatsContainer = document.getElementById('seats-container');
const seats = seatsContainer.querySelectorAll('.btn');

for (const seat of seats) {
    seat.addEventListener('click', function (a) {
        if (!seat.classList.contains('selected')) { 
            seat.classList.add('selected'); 

            seatCount++;
            if (seatCount <= 4) {
                if (seatCount === 4) {
                    document.getElementById('coupon-apply-btn').removeAttribute('disabled');
                }
                document.getElementById('seat-count').innerText = seatCount;
                const seatNumber = a.target;
                seatNumber.style.backgroundColor = '#1DD100';
                seatNumber.style.color = 'white';
                const seatNumberText = a.target.innerText;

                const seatLeft = document.getElementById('seat-left').innerText;
                const seatLeftNumber = parseInt(seatLeft);
                const remainingSeat = seatLeftNumber - 1;
                document.getElementById('seat-left').innerText = remainingSeat;

                const priceTable = document.getElementById('price-table-container');

                const div = document.createElement('div');
                div.classList.add('flex', 'justify-between');
                const p1 = document.createElement('p');
                const p2 = document.createElement('p');
                const p3 = document.createElement('p');
                p1.innerText = seatNumberText;
                p2.innerText = ticketClass;
                p3.innerText = ticketPrice;

                div.appendChild(p1);
                div.appendChild(p2);
                div.appendChild(p3);

                priceTable.appendChild(div);

                const totalPrice = ticketPrice * seatCount;
                document.getElementById('total-price').innerText = totalPrice;
            } else {
                alert("You can't buy more than 4 tickets");
                seatCount--; // Decrement seat count if the limit is reached
            }
        }
    });
}



function couponApplyBtn() {
    const inputCouponText = document.getElementById('coupon-input-field').value.trim();

    if (inputCouponText.toUpperCase() === 'NEW15') {
        applyDiscount(15);
    } else if (inputCouponText === 'Couple 20' || inputCouponText === 'Couple 20'.charAt(0).toUpperCase() + 'ouple 20'.slice(1)) {
        applyDiscount(20);
    } else {
        alert('Invalid Coupon');
    }
}


function applyDiscount(discountPercentage) {
    const totalPriceText = document.getElementById('total-price').innerText;
    const totalPriceNumber = parseInt(totalPriceText);
    const discountedPrice = totalPriceNumber * discountPercentage / 100;
    const grandTotalPrice = totalPriceNumber - discountedPrice;

    document.getElementById('grand-total').innerText = grandTotalPrice;

    const discountContainer = document.getElementById('discount');
    discountContainer.innerHTML = ''; // Clear previous discounts

    const h3One = document.createElement('h3');
    h3One.innerText = 'Discount';
    discountContainer.appendChild(h3One);

    const h3Two = document.createElement('h3');
    h3Two.innerText = 'BDT ' + discountedPrice;
    discountContainer.appendChild(h3Two);
}




// for button disable
window.addEventListener('DOMContentLoaded', () => {
  
    document.getElementById('coupon-apply-btn').setAttribute('disabled', 'disabled');

    
    for (const seat of seats) {
        seat.addEventListener('click', function () {
            const phoneNumber = document.getElementById('phone-number').value.trim();
            const selectedSeats = document.querySelectorAll('.selected');
            if (seatCount > 0 && phoneNumber !== '' && selectedSeats.length >= 1) {
                document.getElementById('next-btn').removeAttribute('disabled');
            }
        });
    }
});
// disable coupne

// Function to hide coupon field and apply button
function applyCouponAndHideFields(discountPercentage) {
    applyDiscount(discountPercentage);
    hideCouponFieldAndButton();
    // Save coupon status to localStorage
    localStorage.setItem('couponApplied', 'true');
}

function couponApplyBtn() {
    const inputCouponText = document.getElementById('coupon-input-field').value.trim();

    if (inputCouponText === 'NEW15') {
        applyCouponAndHideFields(15);
    } else if (inputCouponText === 'Couple 20') {
        applyCouponAndHideFields(20);
    } else {
        alert('Invalid Coupon');
    }
}

// Function to hide coupon field and apply button
function hideCouponFieldAndButton() {
    document.getElementById('coupon-input-field').style.display = 'none';
    document.getElementById('coupon-apply-btn').style.display = 'none';
}

