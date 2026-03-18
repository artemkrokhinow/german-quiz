const defaultVocabulary = [
	{ word: "Allergie", art: "die", plu: "-n" },
	{ word: "Altenpfleger", art: "der", plu: "-" },
	{ word: "Altersheim", art: "das", plu: "e" },
	{ word: "Appetit", art: "der", plu: "sg" },
	{ word: "Arbeitgeber", art: "der", plu: "-" },
	{ word: "Arzthelfer", art: "der", plu: "-" },
	{ word: "Arztpraxis", art: "die", plu: "praxen" },
	{ word: "Baustelle", art: "die", plu: "n" },
	{ word: "Diät", art: "die", plu: "en" },
	{ word: "Einnahme", art: "die", plu: "n" },
	{ word: "Entbindungsstation", art: "die", plu: "en" },
	{ word: "Entzündung", art: "die", plu: "en" },
	{ word: "Gips", art: "der", plu: "sg" },
	{ word: "Impfpass", art: "der", plu: "e" },
	{ word: "Impfung", art: "die", plu: "en" },
	{ word: "Leiter", art: "die", plu: "n" },
	{ word: "Magen", art: "der", plu: "-" },
	{ word: "Medizin", art: "die", plu: "sg" },
	{ word: "Narkose", art: "die", plu: "n" },
	{ word: "Notaufnahme", art: "die", plu: "n" },
	{ word: "Notfall", art: "der", plu: "e" },
	{ word: "Patient", art: "der", plu: "en" },
	{ word: "Physiotherapeutin", art: "die", plu: "nen" },
	{ word: "Rollstuhl", art: "der", plu: "e" },
	{ word: "Schichtdienst", art: "der", plu: "sg" },
	{ word: "Schlafmittel", art: "das", plu: "-" },
	{ word: "Schmerz", art: "der", plu: "en" },
	{ word: "Schulter", art: "die", plu: "n" },
	{ word: "Spritze", art: "die", plu: "n" },
	{ word: "Versichertenkarte", art: "die", plu: "n" },
	{ word: "Wunde", art: "die", plu: "n" },
	{ word: "Zweck", art: "der", plu: "e" },
];

let vocabulary =
	JSON.parse(localStorage.getItem("myVocabulary")) || defaultVocabulary;

function shuffle(array) {
	return array.sort(() => Math.random() - 0.5);
}

function initQuiz() {
	const grid = document.getElementById("quiz-grid");
	grid.innerHTML = "";
	const shuffledData = shuffle([...vocabulary]);

	shuffledData.forEach((item) => {
		const row = document.createElement("div");
		row.className = "word-row";
		row.innerHTML = `
            <div class="input-wrapper">
                <input type="text" class="art-input" placeholder="Art.">
                <span class="correct-variant art-ans">${item.art}</span>
            </div>
            <span class="word-info">${item.word}</span>
            <div class="input-wrapper">
                <input type="text" class="plural-input" placeholder="Plural">
                <span class="correct-variant plu-ans">${item.plu}</span>
            </div>
        `;
		grid.appendChild(row);
		row.dataset.correctArt = item.art;
		row.dataset.correctPlu = item.plu;
	});
}

document.getElementById("check-btn").addEventListener("click", () => {
	const rows = document.querySelectorAll(".word-row");
	rows.forEach((row) => {
		const artInput = row.querySelector(".art-input");
		const pluInput = row.querySelector(".plural-input");
		const hints = row.querySelectorAll(".correct-variant");
		const correctArt = row.dataset.correctArt.toLowerCase();
		const correctPlu = row.dataset.correctPlu.toLowerCase();

		if (artInput.value.trim().toLowerCase() === correctArt) {
			artInput.className = "art-input correct";
		} else {
			artInput.className = "art-input incorrect";
		}

		let userPlu = pluInput.value.trim().toLowerCase();
		if (userPlu === correctPlu || (correctPlu === "-" && userPlu === "")) {
			pluInput.className = "plural-input correct";
		} else {
			pluInput.className = "plural-input incorrect";
		}
		hints.forEach((hint) => (hint.style.visibility = "visible"));
	});
});

document.getElementById("add-words-btn").addEventListener("click", () => {
	const input = document.getElementById("custom-words-input").value;
	try {
		const cleanedInput = input
			.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ')
			.replace(/'/g, '"');
		const newWords = JSON.parse(cleanedInput);
		if (Array.isArray(newWords)) {
			vocabulary = newWords;
			localStorage.setItem("myVocabulary", JSON.stringify(vocabulary));
			initQuiz();
			document.getElementById("custom-words-input").value = "";
		}
	} catch (e) {
		alert("Syntaxfehler!");
	}
});

document.getElementById("clear-storage-btn").addEventListener("click", () => {
	localStorage.removeItem("myVocabulary");
	location.reload();
});

initQuiz();
