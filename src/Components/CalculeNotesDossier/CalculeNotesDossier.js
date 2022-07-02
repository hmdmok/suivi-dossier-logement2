function calculate(
  dossier,
  salairDemandeur,
  salairConjoin,
  situationF,
  tableNote
) {
  let noteEnci1 = 0,
    noteEnci2 = 0,
    noteEnci3 = 0,
    noteEnci4 = 0,
    noteRev1 = 0,
    noteRev2 = 0,
    noteRev3 = 0,
    kidNote = 0,
    garageNote = 0,
    legem1Note = 0,
    legem2Note = 0,
    locaNote = 0,
    foncNote = 0,
    no_celiNote = 0,
    celi_chNote = 0,
    patrNote = 0,
    endiNote = 0;
  let note = 0;

  const curentYear = new Date().getFullYear();
  const currentDate = new Date();
  let encienteDossier = 0,
    conditionHebergement = 0,
    situationFamiliale = 0,
    situationPersonele = 0,
    revenue = 0;

  tableNote.map((noteElement) => {
    if (noteElement.code === "rev1") {
      noteRev1 = noteElement.notes;
    }
    if (noteElement.code === "rev2") {
      noteRev2 = noteElement.notes;
    }
    if (noteElement.code === "rev3") {
      noteRev3 = noteElement.notes;
    }
    if (noteElement.code === "enci1") {
      noteEnci1 = noteElement.notes;
    }
    if (noteElement.code === "enci2") {
      noteEnci2 = noteElement.notes;
    }
    if (noteElement.code === "enci3") {
      noteEnci3 = noteElement.notes;
    }
    if (noteElement.code === "enci4") {
      noteEnci4 = noteElement.notes;
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

    if (noteElement.code === "legem2") {
      legem2Note = noteElement.notes;
    }
    if (noteElement.code === "loca") {
      locaNote = noteElement.notes;
    }
    if (noteElement.code === "fonc") {
      foncNote = noteElement.notes;
    }
    if (noteElement.code === "no_celi") {
      no_celiNote = noteElement.notes;
    }
    if (noteElement.code === "celi_ch") {
      celi_chNote = noteElement.notes;
    }
    if (noteElement.code === "patr") {
      patrNote = noteElement.notes;
    }
    if (noteElement.code === "endi") {
      endiNote = noteElement.notes;
    }
  });
  const enciAns = curentYear - dossier.date_depo.split("-")[0];
  if (5 <= enciAns < 8) {
    encienteDossier = noteEnci1;
  } else if (8 <= enciAns < 10) {
    encienteDossier = noteEnci2;
  } else if (10 <= enciAns < 15) {
    encienteDossier = noteEnci3;
  } else if (enciAns >= 15) {
    encienteDossier = noteEnci4;
  }

  const salairTotal = salairDemandeur + salairConjoin;
  if (salairTotal <= 12000) {
    revenue = noteRev1;
  } else if (12000 < salairTotal <= 18000) {
    revenue = noteRev2;
  } else if (18000 < salairTotal <= 24000) {
    revenue = noteRev3;
  }

  if (dossier.stuation_d === "garage") {
    conditionHebergement = garageNote;
  } else if (dossier.stuation_d === "legem_1") {
    conditionHebergement = legem1Note;
  } else if (dossier.stuation_d === "legem_2") {
    conditionHebergement = legem2Note;
  } else if (dossier.stuation_d === "loca") {
    conditionHebergement = locaNote;
  } else if (dossier.stuation_d === "fonc") {
    conditionHebergement = foncNote;
  }

  if (situationF !== "c") {
    situationFamiliale += 10;
  } else if (dossier.numb_p > 0) {
    situationFamiliale += 8;
  }
  if ((dossier.numb_p + dossier.num_enf) * kidNote > 8) {
    situationFamiliale += 8;
  } else {
    situationFamiliale += (dossier.numb_p + dossier.num_enf) * kidNote;
  }

  if (dossier.stuation_s_avec_d) {
    situationPersonele += 30;
  }
  if (dossier.stuation_s_andicap) {
    situationPersonele += 30;
  }

  note =
    encienteDossier +
    conditionHebergement +
    situationFamiliale +
    situationPersonele +
    revenue;
  console.log(note);
  return note;
}

module.exports = { calculate };
