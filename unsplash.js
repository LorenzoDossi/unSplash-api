const formTag = document.querySelector("form")
const inputTag = formTag.querySelector("input")
const resultsTag = document.querySelector("section.results")

const accessKey = "7712a89f32f90df231ff278ddc662d6e0c3298f46b98cefee9d2264434ffb886"
const apiUrl = `https://api.unsplash.com/search/photos?per_page=24&query=`
const searchUnsplash = (term) => {
    return(fetch(apiUrl + term, {
            method: "GET",
            headers: {
                "Authorization": `Client-ID ${accessKey}`
            }
        }))
        .then(response => response.json())
        .then(data => {
            return data.results.map(result => {
                return {
                    imageSrc: result.urls.regular,
                    width: result.width,
                    height: result.height,
                    name: result.user.name,
                    title: (result.description || "Site made by Lorenzo Dossi"),
                    color: (result.color || "#ccc") + "33"
                }
            })
        })
}

const addResult = results => {
    resultsTag.innerHTML = ""

    results.forEach((result) => {
        resultsTag.innerHTML += `
        <div class="single-result">
            <div class="image" style="background-color: ${result.color};">
                <img src=${result.imageSrc} />
            </div>
            <h2>${result.title}</h2>
            <p>By ${result.name} - ${result.width} x ${result.height}</p>
        </div>
        `
    })
}

formTag.addEventListener("submit", function(e) {

    const searchTerm = inputTag.value
    if (searchTerm.length > 3)
        searchUnsplash(searchTerm).then(results => addResult(results))

    e.preventDefault()
})