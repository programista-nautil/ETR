const cardIcon = document.querySelector('.card-icon')
const cardDescription = document.querySelector('.card-description')
const cardHiddenDescription = document.querySelector('.card-hidden-description')

let hiddenDescriptionVisible = false

cardIcon.addEventListener('click', function () {
	if (!hiddenDescriptionVisible) {
		cardDescription.style.opacity = 1
		hiddenDescriptionVisible = true
	} else {
		cardDescription.style.opacity = 0
		hiddenDescriptionVisible = false
	}
})
