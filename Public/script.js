// toggle nav bar

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}
//scroll sections
let sections = document.querySelectorAll('section');

let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*= ' + id + ']').classList.add('active');
            });
            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });
    
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);
//removes navbar after scrolling to selected section
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
//footer animation
    let footer = document.querySelector('footer');
    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);

}




//contact form and email sending code
const contactForm = document.querySelector('.contact-form');

let name = document.getElementById('name');
let email = document.getElementById('email');
let phoneNum = document.getElementById('phoneNum');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    let formData = {
        name: name.value,
        email: email.value,
        phoneNum: phoneNum.value,
        subject: subject.value,
        message: message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert('Email successfully sent. Thank You.');
            name.value = '';
            email.value = '';
            phoneNum.value = '';
            subject.value = '';
            message.value = '';
        }else{
            alert('OOPS! Something went wrong. Please try again.')
        }
    }

    xhr.send(JSON.stringify(formData));
})

//contact info modal 
document.getElementById("contactInfoButton").addEventListener("click", function () {
    // Show the contact information modal
    const modal = document.getElementById("contactInfoModal");
    modal.style.display = "block";
});

document.getElementById("closeContactInfo").addEventListener("click", function () {
    // Close the contact information modal
    const modal = document.getElementById("contactInfoModal");
    modal.style.display = "none";
    // modal.classList.add('modalBGAnimation');
});

// Close the modal if the user clicks outside of it
window.addEventListener("click", function (e) {
    const modal = document.getElementById("contactInfoModal");
    if (e.target == modal) {
        modal.style.display = "none";
    }
});


//text animation script

const dynamicText = document.querySelector(".home-content h3 span");
const words = ["Developer", "Gamer", "Paramedic", "Nurse"];

// Variables to track the position and deletion status of the word
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentChar;
    dynamicText.classList.add("stop-blinking");

    if (!isDeleting && charIndex < currentWord.length) {
        // If condition is true, type the next character
        charIndex++;
        setTimeout(typeEffect, 200);
    } else if (isDeleting && charIndex > 0) {
        // If condition is true, remove the previous character
        charIndex--;
        setTimeout(typeEffect, 100);
    } else {
        // If word is deleted then switch to the next word
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200);
    }
}

typeEffect();
