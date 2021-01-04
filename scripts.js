window.addEventListener('load', displayAnimals)
document.querySelector(".submit-button").addEventListener('click', postAnimal)
document.querySelector(".animals").addEventListener('click', deleteAnimal)

async function displayAnimals() {
    try {
        const response = await fetch("http://localhost:3001/api/v1/animals");
        const animals = await response.json();
        const zoo = document.querySelector(".animals")
        const formattedAnimals = animals.map(animal => {
            return `
            <article class="animal" id="${animal.id}">
                <button class="delete">
                    <i class="fa fa-close" id="delete"></i>
                </button>
                <div class="animal-info">
                    <h2 class="name">${animal.name.toUpperCase()}</h2>
                        <div class="info">
                            <div class="diet">
                                <h3>Diet:</h3>
                                    <p class="diet-data">${animal.diet}</p>
                            </div>
                            <div class="fun-fact">        
                                <h3>Fun Fact:</h3>
                                    <p class="fun-fact-data">${animal.fun_fact}</p>
                            </div>        
                        </div>
                    </div>
            </article>`
        }).join('')
        zoo.innerHTML = formattedAnimals
    } catch (error) {
        console.error(error)
    }
}

async function postAnimal() {
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: Date.now(),
            name: document.querySelector("#name-input").value,
            diet: document.querySelector("#diet-input").value,
            fun_fact: document.querySelector("#fun-fact-input").value
        })
    }
    try {
        await fetch("http://localhost:3001/api/v1/animals", settings)
        displayAnimals()
    } catch (error) {
        console.error(error)
    }
}

async function deleteAnimal(event) {
    if (event.target.id === "delete") {
        const animalId = event.target.closest(".animal").id
        const settings = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        }
        try {
            await fetch(`http://localhost:3001/api/v1/animals/${animalId}`, settings)
            displayAnimals()
        } catch (error) {
            console.error(error)
        }
    }
}