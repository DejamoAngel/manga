document.addEventListener("DOMContentLoaded", () => {
    const findInput = document.getElementById("findInput");
    const findButton = document.getElementById("findButton");
    const resultsContainer = document.getElementById("resultsContainer");

    findButton.addEventListener("click", async () => {
        const findValue = encodeURIComponent(findInput.value.trim());
        if (!findValue) return;

        try {
            const response = await fetch(`https://api.mangadex.org/manga?title=${findValue}&limit=10&includes[]=cover_art`);
            const data = await response.json();

            resultsContainer.innerHTML = data.data.map(manga => `
                <h1>${manga.attributes.title.en}</h1>
                <p>${manga.attributes.description.en}</p>
                <img src="https://uploads.mangadex.org/covers/${manga.id}/${manga.relationships.find(r => r.type === "cover_art").attributes.fileName}" alt="${manga.attributes.title.en} Cover">
            `).join('');
        } catch (error) {
            console.log(error);
        }
    });
});
