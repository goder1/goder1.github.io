document.addEventListener('DOMContentLoaded', function() {
    const pageImages = document.querySelectorAll('.work_pics');
    const extraImage = new Image();
    extraImage.src = 'images/your_work.png';
    extraImage.alt = 'Your work';
    extraImage.classList.add('work_pics');
    
    const images = [pageImages[0], extraImage, pageImages[1]];
    const popup_model = document.getElementById('popup_model');
    const popup_form = document.getElementById('popup_form');
    const popupImg = document.getElementById('popup_image');
    const emailInput = document.getElementById('input_email_popup');
    const mobileInput = document.getElementById('input_mobile_popup');
    const nameInput = document.getElementById('input_name_popup');
    const messageInput = document.getElementById('input_message_popup');
    const leftArrow = document.getElementById('left_popup_arrow');
    const rightArrow = document.getElementById('right_popup_arrow');
    const openFormBtn = document.getElementById('form_popup_btn');
    const closeFormBtn = document.getElementById('form_submit_popup');
    const annoyingPopup = document.getElementById('popup_message');
    
    const wasAnnoyingPopupClosed = localStorage.getItem('AnnoyingPopup');
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^\+?\d{10,15}$/;
    const englishRegex = /^[a-zA-Z0-9\s.,!?@#$%^&*()_+-=<>/[\]{}|\\:;"']*$/;
    const russianRegex = /^[а-яА-Я0-9\s.,!?@#$%^&*()_+-=<>/[\]{}|\\:;"']*$/;
    const englishNameRegex = /^[A-Za-z]{2,}(?:['\s-][A-Za-z]+)*$/;
    const russianNameRegex = /^[А-ЯЁа-яё]{2,}(?:[' -][А-ЯЁа-яё]+)*$/;
    
    let currentImageIndex = 0;
    
    if (!wasAnnoyingPopupClosed) {
        const welcomePopupTimer = setTimeout(() => {
            showAnnoyingPopup();
        }, 30000);
    }
    
    function showAnnoyingPopup() {
        annoyingPopup.style.display = 'flex';
        
        document.body.style.overflow = 'hidden';
    }
    
    document.getElementById('popup_message').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            document.body.style.overflow = 'auto';
            localStorage.setItem('AnnoyingPopup', 'true');
        }
    });
    
    function validateEmail(email) {
        return emailRegex.test(email);
    }

    function validateMobile(mobile) {
        return mobileRegex.test(mobile);
    }

    function validateText(text) {
        if (englishRegex.test(text) && !russianRegex.test(text)) {
            return true;
        }
        return !englishRegex.test(text) && russianRegex.test(text);
    }
    
    function validateName(name) {
        if (englishNameRegex.test(name) && !russianNameRegex.test(name)) {
            return true;
        }
        return !englishNameRegex.test(name) && russianNameRegex.test(name);
    }
    
    function checkSameLanguage(name, text) {
        return englishRegex.test(text) == englishNameRegex.test(name);
    }
    
    function openPopupImage(index) {
        currentImageIndex = index;
        popupImg.src = images[currentImageIndex].src;
        popup_model.style.display = 'flex';
        popupImg.style.maxHeight = "700px";
        popupImg.style.maxWidth = "700px";
        if (currentImageIndex == 0) {
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'block';
        } else if (currentImageIndex == 2) {
            rightArrow.style.display = 'none';
            leftArrow.style.display = 'block';
        } else {
            leftArrow.style.display = 'block';
            rightArrow.style.display = 'block';
        }
        document.body.style.overflow = 'hidden';
    }
    
    function closePopupImage() {
        popup_model.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function closePopupForm() {
        popup_form.classList.remove('show');
        
        setTimeout(() => {
            popup_form.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    function ForceClosePopupForm() {
        popup_form.classList.remove('show');
        
        setTimeout(() => {
            popup_form.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    function showPrevImage() {
        currentImageIndex = currentImageIndex - 1;
        if (currentImageIndex == 0) {
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'block';
        } else {
            leftArrow.style.display = 'block';
            rightArrow.style.display = 'block';
        }
        popupImg.src = images[currentImageIndex].src;
    }
    
    function showNextImage() {
        currentImageIndex = currentImageIndex + 1;
        if (currentImageIndex == 2) {
            rightArrow.style.display = 'none';
            leftArrow.style.display = 'block';
        } else {
            leftArrow.style.display = 'block';
            rightArrow.style.display = 'block';
        }
        popupImg.src = images[currentImageIndex].src;
    }
    
    function openForm() {
        popup_form.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            popup_form.classList.add('show');
        }, 10);
    }
    
    emailInput.addEventListener('input', function() {
        if (!validateEmail(this.value) && this.value.length > 0) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = '';
        }
        checkFormValidity();
    });

    mobileInput.addEventListener('input', function() {
        if (!validateMobile(this.value) && this.value.length > 0) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = '';
        }
        checkFormValidity();
    });

    messageInput.addEventListener('input', function() {
        if (!validateText(this.value) && this.value.length > 0) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = '';
        }
        checkFormValidity();
    });

    function checkFormValidity() {
        const isEmailValid = validateEmail(emailInput.value);
        const isMobileValid = validateMobile(mobileInput.value);
        const isMessageValid = validateTe(messageInput.value);
        
        submitBtn.disabled = !(isEmailValid && isMobileValid && isMessageValid);
        
        if (submitBtn.disabled) {
            submitBtn.style.opacity = '0.5';
            submitBtn.style.cursor = 'not-allowed';
        } else {
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        }
    }
    
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            openPopupImage(index);
        });
    });
    
    openFormBtn.addEventListener('click', openForm);
    leftArrow.addEventListener('click', showPrevImage);
    rightArrow.addEventListener('click', showNextImage);
    
    popup_model.addEventListener('click', (e) => {
        if (e.target === popup_model) {
            closePopupImage();
        }
    });
    
    popup_form.addEventListener('click', (e) => {
        if (e.target === popup_form) {
            ForceClosePopupForm();
        }
    });
    
    document.querySelector('#popup_form_content form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateEmail(emailInput.value)) {
            alert('Please enter a valid email address');
            emailInput.focus();
            return;
        }
        
        if (!validateMobile(mobileInput.value)) {
            alert('Please enter a valid phone number (10-15 digits, + optional)');
            mobileInput.focus();
            return;
        }
        
        if (!validateName(nameInput.value)) {
            alert('Please use either only English characters or only Russian in your name');
            nameInput.focus();
            return;
        }
        
        if (!validateText(messageInput.value)) {
            alert('Please use either only English characters or only Russian in your message');
            messageInput.focus();
            return;
        }
        
        if (!checkSameLanguage(nameInput.value, messageInput.value)) {
            alert('Please use the same language in both name and message');
            nameInput.focus();
            messageInput.focus();
            return;
        }
        
        closeFormBtn.disabled = true;
        closeFormBtn.textContent = 'Отправляем...';
        closeFormBtn.style.backgroundColor = '#3c465d';
        closeFormBtn.style.cursor = 'not-allowed';
        
        setTimeout(() => {
            closeFormBtn.textContent = 'Успешно отправлено!';
            closeFormBtn.style.backgroundColor = '#77ccb8';
            
            setTimeout(() => {
                closeFormBtn.style.cursor = 'pointer';
                closeFormBtn.textContent = 'Submit';
                closeFormBtn.disabled = false;
                closeFormBtn.style.backgroundColor = '';
            }, 2000);
        }, 1500);
    });
    
    function handleScroll() {
        const secondDiv = document.getElementById('second_div');
        const nav = document.querySelector('nav');
        const secondDivPosition = secondDiv.getBoundingClientRect().top;
        const placeholder = document.getElementById('nav-placeholder');

        if (secondDivPosition <= 0) {
            nav.style.position = 'fixed';
            nav.style.width = '80%';
            nav.style.borderRadius = '0 0 15px 15px';
            nav.style.maxWidth = '80%';
            nav.style.transform = "translateX(-50%)"; 
            placeholder.style.height = "70px";
        } else {
            nav.style.transform = "translateX(0%)"; 
            nav.style.position = 'static';
            nav.style.width = '80%';
            nav.style.borderRadius = '0 0 15px 15px';
            nav.style.maxWidth = '1100px';
            nav.style.left = "50%";
            placeholder.style.height = "0";
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);
    
    function updateCountdown() {
        const targetDate = new Date('June 30, 2028 00:00:00').getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('timer').innerHTML = '<p>The countdown is over!</p>';
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);

    updateCountdown();
});
