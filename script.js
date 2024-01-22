
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
let savedNews = []

//Extract each value of key "tags" and push them into a new array
let tagsArray = ["politic"]
News.forEach((New) => {

    if (typeof New.tags === "object") {
        //case of: ["arte", "tech"]
        for (let i = 0; i < New.tags.length; i++) {
            tagsArray.push(New.tags[i])
        }
    }
    else {
        //case of: "cucina"
        tagsArray.push(New.tags);
    }
})

//console.log(TagsArray);
//create a set of tags (without duplicate)
const set_tags = new Set(tagsArray)
//console.log(Set_tags);

/* create select form with a dinamic logic*/
const selTags = document.getElementById("tags")
set_tags.forEach((set_tag) => {
    let newOption = new Option(set_tag, set_tag);
    newOption.classList.add(`btn-${set_tag}`)
    tags.append(newOption);
})

/* function ConvertDate(DateToConvert) {
    const formatDate = new Date(DateToConvert)
    return (`${formatDate.getDate()}-${(formatDate.getMonth() + 1) < 10 ? ("0" + (formatDate.getMonth() + 1)) : (formatDate.getMonth() + 1)}-${formatDate.getFullYear()}`);
} */

/**
 * 
 * @param {string} dateToConvert string-date in american format
 * @returns string-date in italian format
 */
function ConvertDate(dateToConvert) {
    return dateToConvert.split("-").reverse().join("-")
}

//NON FUNZIONA ANCORA: SERVE A RENDERE DINAMICO L'INSERIMENTO DEL TAG <A REF></A>
/* function TemplateTags(param) {
    if (typeof param === "object") {
        for (let i = 0; i < param.length; i++) {
            let TagMarkup = `
        <a href="#" class="btn btn-primary btn-${param[i]}">${param[i]}</a>`
        }
    } else {
        let TagMarkup = `
        <a href="#" class="btn btn-primary btn-${param}">${param}</a>`
    }
} */


const contElement = document.querySelector(".card_container")
const checkEl = document.getElementById("check")
GenerateCard(News)
SelectByCheck(checkEl)
SelectByTags(selTags)


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
                <a href="#" class="btn btn-primary btn-${typeof New.tags === "object" ? New.tags[1] : "none"}">${typeof New.tags === "object" ? New.tags[1] : ""}</a>
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
        const alertElement = document.createElement("h2")
        alertElement.innerHTML = ("No news available.")
        contElement.appendChild(alertElement);
    } else {
        GenerateCard(listNews)
    }
}


/**
 * Function wich filter News by tags
 * @param {object} listTags different tags (the element filter)
 */
function SelectByTags(listTags) {
    listTags.addEventListener("change", function (e) {
        //console.log(e.target.value);

        //Before inizialize loop refresh cards
        contElement.innerHTML = ""

        //Consider case of "all tags"
        if (e.target.value === "all_tag") {
            GenerateCard(IsChecked(News));
        }
        else {
            const filteredTags = IsChecked(News).filter(New => {
                if (typeof New.tags === "object") {
                    return (New.tags.find(TagEl => TagEl === e.target.value));
                }
                else {
                    return New.tags === e.target.value;
                }
            })
            //console.log(FilteredTags);
            //Consider case of no-target.value found into News.tags ("politic")
            Unavailable(filteredTags)
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
            const savedId = e.target.getAttribute("data-saved")
            //aggiungo la possibilità di "disattivare il salvataggio del bookmark aggiornando anche l'array degli elementi salvati"
            if (iBookMark.classList[iBookMark.classList.length - 1] === "fa-solid") {
                iBookMark.classList.remove("fa-solid")
                console.log(iBookMark.classList)
                savedNews.pop(savedId)
                console.log(savedNews)
            } else {
                iBookMark.classList.add("fa-solid")
                console.log(iBookMark.classList)
                savedNews.push(savedId)
                console.log(savedNews)
            }

            //console.log(e.target.getAttribute("data-saved")); 
        })
    })
}

/**
 * 
 * @param {object} listNews list of News to filter
 * @returns filtered array which contains only checked News (only if check-form is checked !!)
 */
function FilterByCheck(listNews) {
    if (checkEl.checked === true) {
        return listNews.filter((New) => savedNews.includes(New.id))
    } else {
        return ""
    }
}

/**
 * 
 * @param {object} listNews list of News to filter
 * @returns filtered to generate the list of News (original list or checked list) on which apply filter by tags (in select-form)
 */
function IsChecked(listNews) {
    //console.log(FilterByCheck(News));   
    if (FilterByCheck(News) == "") {
        return listNews;
    } else {
        return listNews.filter((New) => savedNews.includes(New.id));
    }
}

/**
 * function to generate cards filtered by check when click on check-form
 * @param {object} DomEl tag element which trigger the event
 */
function SelectByCheck(DomEl) {
    //const checkEl = document.getElementById("check")
    DomEl.addEventListener("change", function (e) {
        if (e.target.checked === true) {
            FilterByCheck(News);
            IsChecked(News);
            //console.log(IsChecked(News));    
            contElement.innerHTML = ""
            Unavailable(FilterByCheck(News))
        } else {
            contElement.innerHTML = ""
            GenerateCard(News);
        }   //consider case of "un-check" check-form: refresh page
    })
}






