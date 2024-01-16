
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
let SavedNews = []

//Extract each value of key "tags" and push them into a new array
let TagsArray = ["politic"]
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

const contElement = document.querySelector(".card_container")
const checkEl = document.getElementById("check")
GenerateCard(News)
SelectByCheck(News)
SelectByTags()


/**
 * function for the card markup 
 * @param {object} News is the list of News
 */
function GenerateCard(News) {
    News.forEach((New) => {
        const cardMarkup = `      
        <div class="card mx-auto my-5" style="width: 45%;">
            <i class="fa-regular fa-bookmark" data-saved="${New.id}"></i>       
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
            </div>`
        contElement.insertAdjacentHTML("beforeend", cardMarkup)        
    })
    SaveBookmarks()
}

/**
 * function to create an alert message on page in case of no available news
 * @param {object} listNews is the list of News (filtered for tags or for checked)
 */
function Unavailable(listNews) {
    if (listNews.length === 0) {
        const AlertElement = document.createElement("h2")
        AlertElement.innerHTML = ("No news available.")
        contElement.appendChild(AlertElement);
       } else {
        GenerateCard(listNews)}
}

/**
 * Function wich filter News by tags
 * @param {object} News List of news to filter by tags
 */
function SelectByTags() {
selTags.addEventListener("change", function (e) {
    //console.log(e.target.value);
    
    //Before inizialize loop refresh cards
    contElement.innerHTML = ""
    
    //Consider case of "all tags"
    if (e.target.value === "all_tag") {
       GenerateCard(IsChecked());} 
    else {
    const FilteredTags = IsChecked().filter(New => {
        if (typeof New.tags === "object") {
            return (New.tags.find(TagEl => TagEl === e.target.value));}
        else {
            return New.tags === e.target.value;}
    })
    //console.log(FilteredTags);
    //Consider case of no-target.value found into News.tags ("politic")
    Unavailable(FilteredTags)
    }
})
}

/**
 * anonym function to change class icon bookmark (regular=>solid) and save card on click
 */
function SaveBookmarks() {
const iBookMarks = document.querySelectorAll(".card_container > .card > i")
//console.log(iBookMarks);

iBookMarks.forEach(iBookMark => {
    iBookMark.addEventListener("click", function (e) {     
    iBookMark.classList.add("fa-solid")      
    //console.log(e.target.getAttribute("data-saved")); 
    const SavedId = e.target.getAttribute("data-saved")
    SavedNews.push(SavedId)    
    //console.log(SavedNews);     
    }) 
})     
}

/**
 * 
 * @param {object} Anonym function (is applied only on News list)
 * @returns filtered array which contains only checked News (only if check-form is checked !!)
 */
function FilterByCheck() {    
    if (checkEl.checked === true) {
        return News.filter((New) => SavedNews.includes(New.id))
    } else {
        return ""
    }
}

/**
 * 
 * @param {object} Anonym function
 * @returns filtered to generate the list of News (original list or checked list) on which apply filter by tags (in select-form)
 */
function IsChecked() { 
    //console.log(FilterByCheck());   
	if (FilterByCheck() == ""){
	return News;} else {
	return News.filter((New) => SavedNews.includes(New.id));}
}

/**
 * function to generate cards filtered by check when click on check-form
 * @param {object} News list of news to filter by check
 */
function SelectByCheck() {
    //const checkEl = document.getElementById("check")
    checkEl.addEventListener("change", function(e) {      
    if (e.target.checked === true) {
        FilterByCheck();   
        IsChecked();
    //console.log(IsChecked());    
       contElement.innerHTML = ""   
       Unavailable(FilterByCheck())} else {
        contElement.innerHTML = ""
        GenerateCard(News);}   //consider case of "un-check" check-form: refresh page
    })
    }
