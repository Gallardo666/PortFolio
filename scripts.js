// Toggle the navbar to expand or collapse
const toggleBtn = document.getElementById('toggle-btn');
const navbar = document.querySelector('.navbar');

    toggleBtn.addEventListener('click', () => {
    navbar.classList.toggle('expanded');
});
