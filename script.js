
const News = [
    {
        id: "1",
        title: "Scoperta di una nuova specie di papera di gomma",
        content: "Un breve articolo sulla recente scoperta di una specie di papera di gomma mai vista prima",
        tags: ["geo", "tech"],
        author: "Diana Rossi",
        published: "2023-02-11",
        image: "./images/rubber-duck.jpg",
        alt: "rubber-duck",
    },
    {
        id: "2",
        title: "Esplorando le profondità marine: il mistero degli abissi",
        content: "Un viaggio nelle profondità dell'oceano alla scoperta di creature misteriose e inesplorate.",
        tags: ["viaggi", "geo"],
        author: "Fabio Mari",
        published: "2023-03-14",
        image: "./images/deep-sea.jpg",
        alt: "deep-sea"
    },
    {
        id: "3",
        title: "Viaggio culinario: alla ricerca dei sapori perduti",
        content: "Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.",
        tags: "cucina",
        author: "Marta Bianchi",
        published: "2023-04-20",
        image: "./images/kitchen-food.jpg",
        alt: "kitchen-food",
    },
    {
        id: "4",
        title: "Arte moderna: oltre i confini convenzionali",
        content: "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste ad artisti emergenti.",
        tags: ["arte", "tech"],
        author: "Gabriele Neri",
        published: "2023-05-29",
        image: "./images/modern-art.jpg",
        alt: "modern-art",
    }]
let UnSavedNews = []

//Extract each value of key "tags" and push them into a new array
TagsArray = ["politic"]
News.forEach((New) => {

    if (typeof New.tags === "object") {
        //case of: ["arte", "tech"]
        for (let i = 0; i < New.tags.length; i++) {
            TagsArray.push(New.tags[i])
        }
    }
    else {
        //case of: "cucina"
        TagsArray.push(New.tags);
    }
})

//console.log(TagsArray);
//create a set of tags (without duplicate)
const Set_tags = new Set(TagsArray)
//console.log(Set_tags);

/* create select form with a dinamic logic*/
const selTags = document.getElementById("tags")
Set_tags.forEach((Set_tag) => {
    let newOption = new Option(Set_tag, Set_tag);
    tags.append(newOption);
})

/**
 * function to convert in format Date DD-MM-YYYY
 * @param {Date} DateToConvert is the original date I need to convert
 * @returns the new converted date
 */
function ConvertDate(DateToConvert) {
    const formatDate = new Date(DateToConvert)
    return (`${formatDate.getDate()}-${(formatDate.getMonth()+1) < 10 ? ("0"+(formatDate.getMonth()+1)) : (formatDate.getMonth()+1)}-${formatDate.getFullYear()}`);
    }

/**
 * The function create cards with filtered objects
 * @param {Object} FilteredObj The filtered object to generate cards
 */
function GenerateCard(FilteredObj) {
    FilteredObj.forEach((New) => {  
        const ContElement = document.querySelector(".card_container") 
        const cardElement = document.createElement("div")
        cardElement.classList.add("card", "mx-auto", "my-5")
        //<div class="card mx-auto my-5" style="width: 45%;">        
        const iBookMark = document.createElement("i")
        iBookMark.classList.add("fa-regular", "fa-bookmark")      
        ContElement.appendChild(cardElement)  
        cardElement.appendChild(iBookMark)        
        
        const cardMarkup = `              
                <div class="card-body">     
                    <h4 class="card-title">${New.title}</h4> 
                    <h5 class="card-title"> pubblicato da ${New.author}</h5>          
                    <h6>in data ${ConvertDate(New.published)}</h6>
                    <p class="card-text">${New.content}</p>
                <div>
                    <img src=${New.image} ${New.alt}>
                </div>
                <a href="#" class="btn btn-primary btn-${typeof New.tags === "object" ? New.tags[0] : New.tags}">${typeof New.tags === "object" ? New.tags[0] : New.tags}</a>
                <a href="#" class="btn btn-primary btn-${typeof New.tags === "object" ? New.tags[1] : "none" }">${typeof New.tags === "object" ? New.tags[1] : ""}</a>
            `
        cardElement.insertAdjacentHTML("beforeend", cardMarkup)     
        
        //event listener on bookmark
        iBookMark.addEventListener("click", function () {
            iBookMark.classList.add("fa-solid")
            cardElement.dataset.saved = (New.id)
        //Create a data-attribute which correspond to the "id"News just for bookmark clicked
	    console.log(cardElement.dataset.saved)
        //Filter the "clicked-bookmark cards" and insert them to the empty array I have created (script.js.43)
        const FilteredUnSaved = News.filter(New => New.id !== cardElement.dataset.saved)
	    UnSavedNews.push(FilteredUnSaved)  
        console.log(UnSavedNews);             
        })
    })    
}
GenerateCard(News)

selTags.addEventListener("change", function (e) {
    //console.log(e.target.value);

    //Before inizialize loop refresh cards
    const contElement = document.querySelector(".card_container");
    contElement.innerHTML = ""
    

    //Consider case of "all tags"
    if (e.target.value === "all_tag") {
       GenerateCard(News);} 
    else {
    const FilteredTags = News.filter(New => {
        if (typeof New.tags === "object") {
            return (New.tags.find(TagEl => TagEl === e.target.value));}
        else {
            return New.tags === e.target.value;}
    })
    //console.log(FilteredTags);
    //Consider case of no-target.value found into News.tags ("politic")
    if (FilteredTags.length === 0) {
        const cardElement = document.querySelector(".card_container")
        //cardElement.innerHTML = ""
        const AlertElement = document.createElement("h2")
        AlertElement.innerHTML = ("No news available.")
        cardElement.appendChild(AlertElement)
    } else {
    GenerateCard(FilteredTags);
    }
    }
})
/**
 * Function to remove all cards before insert just saved cards
 */
function RemoveNews() {
    UnSavedNews.forEach((New) => {  
        const cardElement = document.querySelector(".card");
        cardElement.remove();
})
}


