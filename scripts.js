document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body'),
        sidebar = body.querySelector('.sidebar'), // Ensure this targets the correct element
        toggle = body.querySelector(".toggle"),
        searchBtn = body.querySelector(".search-box"),
        modeSwitch = body.querySelector(".toggle-switch"),
        modeText = body.querySelector(".mode-text");

    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("close");
    });

    searchBtn.addEventListener("click", () => {
        sidebar.classList.remove("close");
    });

    modeSwitch.addEventListener("click", () => {
        if (body.classList.contains('light')) {
            body.classList.remove('light');
            body.classList.add('dark');
            modeText.innerText = "Light mode";
        } else {
            body.classList.remove('dark');
            body.classList.add('light');
            modeText.innerText = "Dark mode";
        }
    });
});
