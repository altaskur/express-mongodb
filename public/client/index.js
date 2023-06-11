let showForm = false;


const button = document.querySelector("input[type='button']");
const form = document.querySelector("form");
const scoreBoard = document.querySelector("section.scoreWrapper");

button.addEventListener('click', () => {
    showForm = false;
    scoreBoard.classList.add("hidden");
    form.classList.remove("hidden")
});

const inputs = document.querySelectorAll('input[type="text"].number');
inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        moveToNext(input, index + 2);
    });
});
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario normal

    // Obtener los datos del formulario
    const formData = new FormData(form);

    // Realizar la solicitud AJAX
    try {
        fetch('/api/', {
            method: 'POST',
            body: formData
          })
            .then(response => {
                if (response.ok) {
                    console.log('Datos enviados con éxito');
                } else {
                    throw new Error('Error al enviar los datos');
                }
            });
    } catch (error) {
        console.error('Error:', error.message);
    }
});
function moveToNext(currentInput, nextIndex) {
    if (currentInput.value.length >= currentInput.maxLength) {
        const nextInput = document.querySelector(`input[type="text"]:nth-of-type(${nextIndex})`);
        if (nextInput) {
            nextInput.focus();
        }
    }
}


