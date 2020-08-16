const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const dogImageContainer = document.querySelector('#dog-image-container')
const dogBreeds = document.querySelector('#dog-breeds')
const breedDropdown = document.querySelector('select#breed-dropdown')
let dogBreedsArray = []

fetch(imgUrl)
.then(r => r.json())
.then(dogImgs => renderDogImgs(dogImgs.message))

function renderDogImgs(dogImgs) {
    dogImgs.forEach(dogImgUrl => {
        const img = document.createElement('img')
            img.src = dogImgUrl
            img.className = "center"
            img.style.height = '300px'
            dogImageContainer.append(img)
    });
};

fetch(breedUrl)
.then(r => r.json())
.then(dogBreedData => {
    getDogBreeds(dogBreedData.message)
    turnDogBreedsArrayToHTML(dogBreedsArray)
    });

function turnDogBreedsArrayToHTML(dogBreedsArray) {
    dogBreedsArray.forEach((dogBreed) => {
        const newLi = document.createElement('li')
            newLi.innerText = dogBreed
            dogBreeds.append(newLi)

            newLi.addEventListener('click', (e) => {
                e.target.style.color = 'red'
            })
    })
}

function getDogBreeds(dogBreedsObject) {
    for (const dogBreed in dogBreedsObject) {
        if (dogBreedsObject[dogBreed].length > 0) {
            dogBreedsObject[dogBreed].forEach((subBreed) => {
            dogBreedsArray.push(`${subBreed} ${dogBreed}`)
        })
        } else {
            dogBreedsArray.push(dogBreed)
        }
    }
}

breedDropdown.addEventListener('change', (e) => {
    dogBreeds.innerHTML = ""
    userSelection = e.target.value;
    const filteredDogBreedsArray = dogBreedsArray.filter(dogBreed => dogBreed.startsWith(userSelection));
    turnDogBreedsArrayToHTML(filteredDogBreedsArray);
});