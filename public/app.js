// Déclaration clé d'API de la NASA
const APIKEY = 'Oieq6TMKCmnwdlgGfUR6gafuMIsl6O4JyeWmkcaM';

// Récupération des photos de la date indiquée dans le formulaire
document.getElementById('dateForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const date = document.getElementById('date').value;

    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${APIKEY}`)
        .then(response => response.json())
        .then(data => {
            displayPhotos(data.photos);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des photos :', error);
        });
});

// Ajout des photos dans le HTML
function displayPhotos(photos) {
    const photosContainer = document.getElementById('photos');
    const body = document.body;
    photosContainer.innerHTML = '';
    photosContainer.style.display='grid';
    photosContainer.style.height='fit-content';

    if (photos.length === 0) {
        photosContainer.innerHTML = '<p>Aucune photo disponible pour cette date.</p>';
        return;
    }

    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.img_src;
        imgElement.alt = 'Photo du rover sur Mars';
        imgElement.classList.add('rover-photo');

        const manifestInfo = document.createElement('p');
        manifestInfo.textContent = `Mission manifest : ${photo.rover.name} - ${photo.camera.full_name}`;

        const photoContainer = document.createElement('div');
        photoContainer.appendChild(imgElement);
        photoContainer.appendChild(manifestInfo);
        photosContainer.appendChild(imgElement);
    });
};

// Ajout possibilité d'ouvrir photos en plein écran
document.getElementById('photos').addEventListener('click', function(event) {
    if (event.target.tagName === 'IMG') {
        const fullScreenOverlay = document.getElementById('fullScreenOverlay');
        const fullScreenImage = document.getElementById('fullScreenImage');

        fullScreenImage.src = event.target.src;
        fullScreenOverlay.style.display = 'flex';
    }
});

document.getElementById('closeButton').addEventListener('click', function() {
    document.getElementById('fullScreenOverlay').style.display = 'none';
});

// Ajout du scroll au haut de page au clic sur le logo

const scrollToTop = document.querySelector(".logo");
scrollToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
});
scrollToTop();