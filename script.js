
const News = [
    {
        id: "1",
        title: "Scoperta di una nuova specie di papera di gomma",
        content: "Un breve articolo sulla recente scoperta di una specie di papera di gomma mai vista prima",
        tags: "geo",
        author: "Diana Rossi",
        published: "2023-02-11",
        image: "./images/rubber-duck.jpg",
        alt: "rubber-duck",
    },
    {
        id: "2",
        title: "Esplorando le profondità marine: il mistero degli abissi",
        content: "Un viaggio nelle profondità dell'oceano alla scoperta di creature misteriose e inesplorate.",
        tags: "viaggi",
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
        tags: "arte",
        author: "Gabriele Neri",
        published: "2023-05-29",
        image: "./images/modern-art.jpg",
        alt: "modern-art",
    }]

const TagsType = ["politic"]
News.forEach((eachNew) => {
    if (!TagsType.includes(eachNew.tags)) {
        TagsType.push(eachNew.tags)
    }
})
console.log(TagsType);

const selTags = document.getElementById("tags")
TagsType.forEach((tagType) => {
    let newOption = new Option(tagType, tagType);
    tags.append(newOption);
})
//console.log(tags);

function FilterTag(selectedTag) {
    const NewsCard = News.filter(SingleFilteredTag => {
    return SingleFilteredTag.tags === selectedTag   
})
console.log(NewsCard)
}

FilterTag(TagsType[4])