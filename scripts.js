document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body'),
          sidebar = body.querySelector('.sidebar'),
          toggle = body.querySelector(".toggle"),
          searchBtn = body.querySelector(".search-box"),
          searchInput = body.querySelector("#searchInput"),
          searchResults = body.querySelector("#searchResults"),
          modeSwitch = body.querySelector(".toggle-switch"),
          modeText = body.querySelector(".mode-text"),
          modeToggle = document.getElementById('mode-toggle');

    let isNavOpen = false;

    // Verificar el tema guardado o aplicar el predeterminado (oscuro)
    if (!localStorage.getItem('theme') || localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
        modeText.innerText = "Dark Mode";
    } else {
        body.classList.add('light');
        modeText.innerText = "Light Mode";
    }

    // Función para abrir y cerrar el sidebar
    toggle.addEventListener("click", () => {
        isNavOpen = !isNavOpen;
        sidebar.classList.toggle("close");

        // Ajustar margen de header, contenido y footer al cambiar el sidebar
        if (isNavOpen) {
            document.querySelector('header').style.marginLeft = '250px';
            document.querySelector('.content').style.marginLeft = '250px';
            document.querySelector('footer').style.marginLeft = '250px';
        } else {
            document.querySelector('header').style.marginLeft = '88px';
            document.querySelector('.content').style.marginLeft = '88px';
            document.querySelector('footer').style.marginLeft = '88px';
        }

        // Si el nav está cerrado, ocultamos los resultados de búsqueda
        if (!isNavOpen) {
            searchResults.classList.add("hidden");
        }
    });

    // Mostrar el buscador si se hace clic en el icono de búsqueda
    searchBtn.addEventListener("click", () => {
        if (isNavOpen) { // Solo si el nav está abierto
            searchResults.classList.remove("hidden");
        }
    });

    // Cambiar entre modo oscuro y claro
    const switchMode = () => {
        if (body.classList.contains('light')) {
            body.classList.remove('light');
            body.classList.add('dark');
            modeText.innerText = "Dark Mode";
            localStorage.setItem('theme', 'dark');  // Guardar la preferencia
        } else {
            body.classList.remove('dark');
            body.classList.add('light');
            modeText.innerText = "Light Mode";
            localStorage.setItem('theme', 'light');  // Guardar la preferencia
        }

        // Actualizar los resultados de búsqueda según el tema
        updateSearchResults(searchInput.value.toLowerCase());
    };

    modeSwitch.addEventListener("click", switchMode);
    modeToggle.addEventListener("click", switchMode);

    // Función de búsqueda
    const updateSearchResults = (query) => {
        const sections = document.querySelectorAll('section');
        searchResults.innerHTML = '';  // Limpiar resultados anteriores

        if (query === '') {
            searchResults.classList.add('hidden'); // Ocultar si el campo está vacío
            return;
        }

        let foundResults = false;

        sections.forEach(section => {
            const sectionText = section.textContent.toLowerCase();
            const sectionTitle = section.querySelector('h2').textContent.toLowerCase();

            // Verificar si el texto o título de la sección contiene la búsqueda
            if (sectionText.includes(query) || sectionTitle.includes(query)) {
                foundResults = true;

                const listItem = document.createElement('li');
                listItem.innerHTML = `<a href="#${section.id}">${section.querySelector('h2').textContent}</a>`;
                searchResults.appendChild(listItem);
            }
        });

        // Si no hay resultados, mostrar mensaje
        if (!foundResults) {
            searchResults.innerHTML = '<li>No se encontraron coincidencias</li>';
        }

        // Asegurar que el buscador esté visible si se está escribiendo algo
        if (query !== '') {
            searchResults.classList.remove('hidden');
        }
    };

    // Evento para actualizar los resultados de búsqueda al escribir
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        updateSearchResults(query);
    });

    
});
