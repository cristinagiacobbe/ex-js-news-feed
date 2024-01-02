
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
            TagsArray.push(New.tags[i])} }
            else {
//case of: "cucina"
                TagsArray.push(New.tags); }
    }

)
//console.log(TagsArray);
//create a set of tags (withou duplicate)
const Set_tags = new Set(TagsArray)
//console.log(Set_tags);

/* create select form with a dinamic logic*/
const selTags = document.getElementById("tags")
Set_tags.forEach((Set_tag) => {
    let newOption = new Option(Set_tag, Set_tag);
    tags.append(newOption);
})


const FilteredTags = News.filter(New => {
    if (typeof New.tags === "object") {
        return (New.tags.find(TagEl => TagEl === "arte"));} 	
        else {
        return New.tags === "arte"}
    }
)
console.log(FilteredTags);

FilteredTags.forEach((New) => {
const cardElement = document.querySelector(".card");
const cardMarkup = `
<div class="card-body">
            <h4 class="card-title">${New.title}</h4>
            <h5 class="card-title"> pubblicato da ${New.author}</h5>
            <h6>in data ${New.published}</h6>
            <p class="card-text">${New.content}</p>
            <div>
                <img src=${New.image} ${New.alt}>
            </div>
	<a href="#" class="btn btn-primary btn-${New.tags[0]}">${New.tags[0]}</a>
	<a href="#" class="btn btn-primary btn-${New.tags[1]}">${New.tags[1]}</a>
</div>`

cardElement.insertAdjacentHTML("beforeend", cardMarkup)
})


/* const cardElement = document.querySelector(".card")
const cardMarkup = `
<div class="card-body">
            <h4 class="card-title">${SingleFilteredTag.title}</h4>
            <h5 class="card-title">pubblicato da ${SingleFilteredTag.author}</h5>
            <h6>in data ${SingleFilteredTag.published}</h6>
            <p class="card-text">${SingleFilteredTag.content}</p>
            <div>
                <img src=${SingleFilteredTag.image} class="mb-2" alt=${SingleFilteredTag.alt}>
            </div>
            <a href="#" class="btn btn-primary btn-geo">${SingleFilteredTag.tags}</a>
            <a href="#" class="btn btn-primary btn-tech">tech</a>
        </div>
`
cardElement.insertAdjacentHTML("beforeend", cardMarkup) */

