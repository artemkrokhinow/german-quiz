const vocabulary = [
	{ word: "Allergie", art: "die", plu: "-n" },
	{ word: "Altenpfleger", art: "der", plu: "-" },
	{ word: "Altersheim", art: "das", plu: "-e" },
	{ word: "Appetit", art: "der", plu: "Sg." },
	{ word: "Arbeitgeber", art: "der", plu: "-" },
	{ word: "Arzthelfer", art: "der", plu: "-" },
	{ word: "Arztpraxis", art: "die", plu: "-praxen" },
	{ word: "Baustelle", art: "die", plu: "-n" },
	{ word: "Diät", art: "die", plu: "-en" },
	{ word: "Einnahme", art: "die", plu: "-n" },
	{ word: "Entbindungsstation", art: "die", plu: "-en" },
	{ word: "Entzündung", art: "die", plu: "-en" },
	{ word: "Gips", art: "der", plu: "Sg." },
	{ word: "Impfpass", art: "der", plu: "-e" },
	{ word: "Impfung", art: "die", plu: "-en" },
	{ word: "Leiter", art: "die", plu: "-n" },
	{ word: "Magen", art: "der", plu: "-" },
	{ word: "Medizin", art: "die", plu: "Sg." },
	{ word: "Narkose", art: "die", plu: "-n" },
	{ word: "Notaufnahme", art: "die", plu: "-n" },
	{ word: "Notfall", art: "der", plu: "-e" },
	{ word: "Patient", art: "der", plu: "-en" },
	{ word: "Physiotherapeutin", art: "die", plu: "-nen" },
	{ word: "Rollstuhl", art: "der", plu: "-e" },
	{ word: "Schichtdienst", art: "der", plu: "Sg." },
	{ word: "Schlafmittel", art: "das", plu: "-" },
	{ word: "Schmerz", art: "der", plu: "-en" },
	{ word: "Schulter", art: "die", plu: "-n" },
	{ word: "Spritze", art: "die", plu: "-n" },
	{ word: "Versichertenkarte", art: "die", plu: "-n" },
	{ word: "Wunde", art: "die", plu: "-n" },
	{ word: "Zweck", art: "der", plu: "-e" },
];

function shuffle(array) {
	return array.sort(() => Math.random() - 0.5);
}

function initQuiz() {
	const grid = document.getElementById("quiz-grid");
	const shuffledData = shuffle([...vocabulary]);

	shuffledData.forEach((item, index) => {
		const row = document.createElement("div");
		row.className = "word-row";
		row.innerHTML = `
            <input type="text" class="art-input" data-index="${index}" placeholder="Art.">
            <span class="word-info">${item.word}</span>
            <input type="text" class="plural-input" data-index="${index}" placeholder="Plural">
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

		const correctArt = row.dataset.correctArt.toLowerCase();
		const correctPlu = row.dataset.correctPlu.toLowerCase().replace('"', "");

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
	});
});

initQuiz();
