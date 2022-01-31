function calculate(dossier, tableNote) {
  let noteYear = 0,
    kidNote = 0,
    garageNote = 0,
    legem1Note = 0;
  let note = 0;

  const curentYear = new Date().getFullYear();
  const currentDate = new Date();
  let encienteDossier = 0;

  tableNote.map((noteElement) => {
    if (noteElement.code === "ans") {
      noteYear = noteElement.notes;
    }

    if (noteElement.code === "enfant") {
      kidNote = noteElement.notes;
    }

    if (noteElement.code === "garage") {
      garageNote = noteElement.notes;
    }

    if (noteElement.code === "legem_1") {
      legem1Note = noteElement.notes;
    }
  });

  if (curentYear - dossier.date_depo.split("-")[0] < 5) {
    encienteDossier = (curentYear - dossier.date_depo.split("-")[0]) * noteYear;
  } else {
    encienteDossier = 4 * noteYear;
  }

  note = encienteDossier + kidNote + garageNote + legem1Note;
  console.log(note);
  return note;
}

module.exports = { calculate };
