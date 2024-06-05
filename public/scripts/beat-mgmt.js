const deleteBeatButtonElements = document.querySelectorAll(".beat-item button");

async function deleteBeat(event) {
    const buttonElement = event.target;
    const beatId = buttonElement.dataset.beatid;
    const csrfToken = buttonElement.dataset.csrf;

    const response = await fetch('/admin/beats/' + beatId + '?_csrf=' + csrfToken, {
        method: 'DELETE',
    });

    if (!response.ok) {
        alert('Something went wrong!');
        return;
    }

    buttonElement.parentElement.parentElement.parentElement.parentElement.remove()
}

for (const deleteBeatButtonElement of deleteBeatButtonElements) {
  deleteBeatButtonElement.addEventListener("click", deleteBeat);
}
