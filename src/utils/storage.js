export function saveToRecents(prompt, result) {
  let recents = JSON.parse(localStorage.getItem("recents")) || [];

  // Find index of existing prompt
  const index = recents.findIndex((r) => r.prompt === prompt);

  if (index !== -1) {
    recents[index].result = result;

    const updated = recents.splice(index, 1)[0];
    recents.unshift(updated);
  } else {
    recents.unshift({ prompt, result });
  }

  // Keep only latest 10
  recents = recents.slice(0, 10);

  localStorage.setItem("recents", JSON.stringify(recents));
}

// Recents from localstorage
export function getRecents() {
  let recents = JSON.parse(localStorage.getItem("recents")) || [];
  return recents;
}

// Delete from localstorage
export function handleDelete(idx) {
  let recents = JSON.parse(localStorage.getItem("recents")) || [];

  let newRecents = recents.filter((e, index) => {
    return index !== idx;
  });

  localStorage.setItem("recents", JSON.stringify(newRecents));
}

// Reset localstorage
export function handleReset() {
  localStorage.removeItem("recents");
}

// Recent by index
export function getRecentByIndex(idx) {
  let recents = JSON.parse(localStorage.getItem("recents")) || [];
  return recents[idx];
}
