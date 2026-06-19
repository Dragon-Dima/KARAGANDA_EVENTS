a_state = false;
const eventCards = document.querySelectorAll('.cards .card');
const dialog = document.querySelector('.dialog');

dialog.addEventListener('click', (event) => {
	const rect = dialog.getBoundingClientRect();

	const clickedOutside = (
		event.clientX < rect.left ||
		event.clientX > rect.right ||
		event.clientY < rect.top ||
		event.clientY > rect.bottom
	);

	if (clickedOutside) {
		dialog.close();
	}
});

document.querySelector(".menu_button").addEventListener("click", () => {
	if (!a_state) {
		document.querySelector(".b_menu").style.display = "flex";
		document.querySelector(".menu_button").style.maskImage = "url('медиа/close-x-svgrepo-com.svg')";
		a_state = true;
	} else {
		document.querySelector(".b_menu").style.display = "none";
		document.querySelector(".menu_button").style.maskImage = "url('медиа/menu-svgrepo-com.svg')";
		a_state = false;
	}
})


document.querySelectorAll(".category input[type=\"radio\"]").forEach(button => {
	button.addEventListener("click", () => {
		const filter = button.getAttribute("data-filter");
		console.log(filter);
		eventCards.forEach(card => {
			const category = card.getAttribute("data-category");
			if (filter === "all" || filter === category) {
				card.classList.remove('hidden');
			} else {
				card.classList.add('hidden');
			}
		})
	})
})

document.querySelectorAll('.cards .card button').forEach(button => {
	button.addEventListener("click", () => {
		const parent = button.parentElement;
		const id = d_map[button.parentElement.id];

		const imgLoader = new Image();
		imgLoader.src = id['img'];

		imgLoader.onload = () => {
			dialog.querySelector("h4").textContent = button.parentElement.id;
			dialog.querySelector("h2").textContent = parent.querySelector("h3").textContent;
			dialog.querySelector("img").src = id['img'];
			dialog.querySelector("h3").textContent = 'Дата: ' + parent.querySelector("p").textContent;
			dialog.querySelector("p:first-of-type").textContent = id['desc'];
			dialog.querySelector("p:last-of-type").textContent = id['desc2'];
			dialog.showModal();
		};
	})
})


document.querySelector('.dialog div').addEventListener("click", () => {
	dialog.close();
});

document.querySelector('.dialog button').addEventListener("click", () => {
	dialog.close();
	const id = document.querySelector('.dialog h4').textContent;
	document.querySelector(".booking .events_div .events").value = id;
	document.getElementById('block3').scrollIntoView({
		behavior: 'smooth'
	});
	count();
});

const d_map = {
	'card1': {
		'desc': 'Концерт в ДК Горняков.',
		'desc2': 'Извесные исполнители!',
		'img': 'медиа/Концерт с живым светом и толпой.png',
		'price': 2000
	},
	'card2': {
		'desc': 'Фудбольный матч на "Караганда арене".',
		'desc2': 'Интересная игра и отличная атмосфера!',
		'img': 'медиа/Футбольный мяч на зелёной траве.png',
		'price': 3000
	},
	'card3': {
		'desc': 'Проходит в городском парке.',
		'desc2': 'Ламповая атмасфера!',
		'img': 'медиа/Летний музыкальный фестиваль на закате.png',
		'price': 4000
	},
};



const count = () => {
	const id = d_map[document.querySelector(".booking .events_div .events").value];
	const selected = document.querySelectorAll('.seats .seat:checked').length;
	total = selected * id["price"];
	console.log(total);
	document.querySelector(".booking .sum").textContent = "Общая стоимость: " + total;
	document.querySelector(".booking .total_seats").textContent = "Выбранные места:  " + selected;
	document.querySelector(".booking .success").style.display = "none";
}

const seats = document.querySelectorAll(".seats .seat");
seats.forEach(seat => {
	seat.addEventListener("click", () => {
		count();
	})
});

document.querySelector(".booking .events_div .events").addEventListener("change", () => {
	count();
});

document.querySelector(".booking").addEventListener("submit", event => {
	document.querySelector(".booking .success").style.display = "block";
	event.preventDefault();
})


