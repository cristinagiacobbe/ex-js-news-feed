
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
        id: 3,
        title: "Viaggio culinario: alla ricerca dei sapori perduti",
        content: "Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.",
        tags: "cucina",
        author: "Marta Bianchi",
        published: "2023-04-20",
        image: "./images/kitchen-food.jpg",
        alt: "kitchen-food",
    },
    {
        id: 4,
        title: "Arte moderna: oltre i confini convenzionali",
        content: "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste ad artisti emergenti.",
        tags: ["arte", "tech"],
        author: "Gabriele Neri",
        published: "2023-05-29",
        image: "./images/modern-art.jpg",
        alt: "modern-art",
    }]


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
}

)
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
        
        console.log(iBookMark.classList);
        const cardMarkup = `              
                <div class="card-body">     
                    <h4 class="card-title">${New.title}</h4>           
                    <h6>in data ${ConvertDate(New.published)}</h6>
                <div>
                    <img src=${New.image}>
                </div>
	        <a href="#" class="btn btn-primary btn-${New.tags[0]}">${New.tags[0]}</a>
	        <a href="#" class="btn btn-primary btn-${New.tags[1]}">${New.tags[1]}</a>
        `
        cardElement.insertAdjacentHTML("beforeend", cardMarkup)       
    })    
}

selTags.addEventListener("change", function (e) {
    //console.log(e.target.value);

    //Before inizialize loop refresh cards
    const cardElement = document.querySelector(".card_container");
    cardElement.innerHTML = ""

    //Consider first of all case of no-target.value found into News.tags ("politic")
    //and case of "all tags"
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

