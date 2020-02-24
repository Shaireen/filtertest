const link = "https://spreadsheets.google.com/feeds/list/1vnKwmmsSAnZKvp_B1aGO3OcEXAQ1NMiuLv3yn-m9qPg/od6/public/values?alt=json";

fetch(link)
    .then(res => res.json())
    .then(handleData);

function handleData(data) {
    const myData = data.feed.entry;
    console.log(myData);
    myData.forEach(showMovies);
}

function showMovies(movie) {

    const genreSplit = movie.gsx$genre.$t.split(", ");
    console.log(genreSplit);
    const actorSplit = movie.gsx$mainactor.$t.split(", ");
    console.log(actorSplit);

    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);

    for (i = 0; i < actorSplit.length; i++) {
        const elemLi = document.createElement("li");
        elemLi.textContent = actorSplit[i];
        if (actorSplit[i] == "Mads Mikkelsen" || actorSplit[i] == " Mads Mikkelsen") {
            clone.querySelector(".oneMovie").classList.add("mads");
        }
        clone.querySelector(".actors").appendChild(elemLi);

    }

    clone.querySelector(".year span").textContent = movie.gsx$year.$t;
    clone.querySelector(".title span").textContent = movie.gsx$name.$t;
    clone.querySelector(".director span").textContent = movie.gsx$director.$t;

    document.querySelector("main").appendChild(clone);


}
