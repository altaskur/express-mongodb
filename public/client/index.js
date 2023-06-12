// eslint-disable-next-line no-unused-vars
let showForm = false;

const button = document.querySelector("input[type='button']");
const form = document.querySelector('form');
const closeButton = form.querySelector("input[type='button']");
const scoreBoard = document.querySelector('section.scoreWrapper');

const boardName = scoreBoard.querySelector('section.name');
const boardNameData = boardName.querySelector('section.data');
const boardScore = scoreBoard.querySelector('section.score');
const boardScoreData = boardScore.querySelector('section.data');
const boardIcons = scoreBoard.querySelector('section.icons');
const boardIconsData = boardIcons.querySelector('section.data');

async function fetchData() {
  try {
    const response = await fetch('/api/');

    if (response.ok) {
      const data = await response.json();

      boardScoreData.textContent = '';
      boardNameData.textContent = '';
      boardIconsData.textContent = '';

      data.forEach((item) => {
        const nameSection = document.createElement('section');
        nameSection.textContent = item.name;
        boardNameData.appendChild(nameSection);

        const scoreSection = document.createElement('section');
        scoreSection.textContent = item.score;
        boardScoreData.appendChild(scoreSection);

        const iconSection = document.createElement('section');
        // eslint-disable-next-line no-underscore-dangle
        iconSection.dataset.id = item._id;

        const icon = document.createElement('i');
        icon.classList.add('bi', 'bi-trash-fill');
        // eslint-disable-next-line no-use-before-define
        icon.addEventListener('click', deleteElement);
        iconSection.appendChild(icon);

        boardIconsData.appendChild(iconSection);
      });
    } else {
      throw new Error('Error al obtener los datos');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();

function deleteElement(event) {
  const icon = event.target.parentElement;
  const { id } = icon.dataset;

  fetch(`/api/id/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        fetchData();
      } else {
        throw new Error('Error al eliminar el elemento');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function moveToNext(currentInput, nextIndex) {
  if (currentInput.value.length >= currentInput.maxLength) {
    const nextInput = document.querySelector(`input[type="text"]:nth-of-type(${nextIndex})`);
    if (nextInput) {
      nextInput.focus();
    }
  }
}
button.addEventListener('click', () => {
  showForm = false;
  scoreBoard.classList.add('hidden');
  form.classList.remove('hidden');
});
closeButton.addEventListener('click', () => {
  showForm = true;
  scoreBoard.classList.remove('hidden');
  form.reset();
  form.classList.add('hidden');
});
const inputs = document.querySelectorAll('input[type="text"].number');
inputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    moveToNext(input, index + 2);
  });
});
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name1 = formData.get('name1');
  const name2 = formData.get('name2');
  const name3 = formData.get('name3');
  const score = formData.get('score');
  const data = {
    name1,
    name2,
    name3,
    score,
  };
  try {
    fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Puntuación Guardada!');
          scoreBoard.classList.remove('hidden');
          form.classList.add('hidden');
          form.reset();
          fetchData();
        } else {
          throw new Error('Error al enviar los datos');
        }
      });
  } catch (error) {
    console.error('Error:', error.message);
  }
});
