// script.js
document.querySelectorAll('.rating-stars').forEach(function(starsContainer) {
    const stars = starsContainer.querySelectorAll('.fa-star');
    stars.forEach(function(star) {
        star.addEventListener('click', function() {
            const rating = star.getAttribute('data-rating');
            stars.forEach(function(s) {
                if (s.getAttribute('data-rating') <= rating) {
                    s.classList.add('checked');
                } else {
                    s.classList.remove('checked');
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Display the current date and time
    var currentDate = new Date();
    document.getElementById('date').textContent = currentDate.toLocaleDateString();
    document.getElementById('time').textContent = currentDate.toLocaleTimeString();
});

document.getElementById('evaluationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve form data
    const indexNumber = document.getElementById('indexNumber').value;
    const punctualRating = document.querySelector('input[name="punctualRating"]:checked').value;
    const lecturesRating = document.querySelector('input[name="lecturesRating"]:checked').value;
    const teachingAidsRating = document.querySelector('input[name="teachingAidsRating"]:checked').value;
    const lecturePaceRating = document.querySelector('input[name="lecturePaceRating"]:checked').value;
    const syllabusRating = document.querySelector('input[name="syllabusRating"]:checked').value;
    const knowledgeRating = document.querySelector('input[name="knowledgeRating"]:checked').value;
    const comments = document.getElementById('comments').value;

    // Create an object to hold the form data
    const formData = {
        indexNumber,
        punctualRating,
        lecturesRating,
        teachingAidsRating,
        lecturePaceRating,
        syllabusRating,
        knowledgeRating,
        comments
    };

    // Send the form data to the server
    fetch('submit-form.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(function(response) {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Error: ' + response.status);
        }
    })
    .then(function(data) {
        // Handle the server response if needed
        console.log(data);
        // Reset the form
        document.getElementById('evaluationForm').reset();
    })
    .catch(function(error) {
        // Handle any error that occurred during the request
        console.log(error);
    });
});
