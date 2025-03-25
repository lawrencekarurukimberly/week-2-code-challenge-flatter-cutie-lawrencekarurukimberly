// Your code here
document.addEventListener('DOMContentLoaded',domFunc)

const topCharBar = document.getElementById("character-bar")
function fetchNames (){
    return fetch("http://localhost:3000/characters")
    .then((res)=> res.json())
    .then(characNames)

}
function characNames(characters){
    characters.forEach(character => {
        const charSpan = document.createElement("span")
        charSpan.innerHTML = character.name
        topCharBar.appendChild(charSpan)

        charSpan.addEventListener("click", ()=>HandleClicker(character))
    });
}


const charIntel = document.getElementById("detailed-info")
function fetchDetails (){
    return fetch(`http://localhost:3000/characters/${character.id}`)
    .then((res)=>res.json())
    .then(HandleClicker)
    .catch(error => console.error("Error fetching character details:", error))
}
function HandleClicker(character){
 const charName = document.getElementById("name")
 charName.innerHTML = character.name

 const charImg = document.querySelector("#detailed-info img")
 charImg.src = character.image
 charImg.alt = character.name

 const charVotes = document.getElementById("vote-count")
 charVotes.textContent = character.votes
}

function addSubmitListener(){
    const form = document.getElementById("votes-form")
    form.addEventListener("submit", handleFormSubmission)
}

function handleFormSubmission(event){
    event.preventDefault();

    const inputedVotes = document.getElementById("votes")
    const charVotes = document.getElementById("vote-count")

    votesToAdd = parseInt(inputedVotes.value,10)
    if (isNaN(votesToAdd) || votesToAdd < 0) {
        alert("Please enter a correct number");
        return;}

    const currentVotes = parseInt(charVotes.textContent,10)
    charVotes.textContent = currentVotes + votesToAdd
    console.log("votes has been given")
    inputedVotes.value= ""
}
function resetListener(){
    const resetBtn = document.getElementById("reset-btn")
    resetBtn.addEventListener("click",resetVotes)
    function resetVotes(){
        let charVotes = document.getElementById("vote-count")
        charVotes.textContent = 0
        console.log("your vote has been rest")
    }
}
function addCharSubmitListener(){
    const addCharForm = document.getElementById("character-form")
    addCharForm.addEventListener("submit",handleAddingChar)
    console.log("new char details have been submitted")
}
function handleAddingChar(event){
    event.preventDefault()
    const newCharName = document.querySelector("#character-form input[name='name']").value
    const newCharImage = document.getElementById("image-url").value
    console.log("User Input - Name:", newCharName);
    console.log("User Input - Image URL:", newCharImage);

    if (!newCharName || !newCharImage) {
        alert("Please enter both a name and an image URL.");
        return;}

        addNewChar(newCharName, newCharImage);
        event.target.reset()
        console.log("the newChar details have been added ✅")
}
function addNewChar(newCharName, newCharImage){
    const newChar ={
        name : newCharName,
        image : newCharImage,
        votes : 0
    }
    const nameSpan = document.createElement("span")
    nameSpan.textContent = newCharName
    nameSpan.addEventListener("click", () =>HandleCharClick(newChar))
    topDiv.appendChild(nameSpan)
        HandleCharClick(newChar)
}

function domFunc (){
    fetchNames()
    addSubmitListener()
    resetListener()
    addCharSubmitListener()
}
