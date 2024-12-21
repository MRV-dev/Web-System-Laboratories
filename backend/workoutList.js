// DOM elements
const workoutList = document.querySelector('#workout-list ul'); // Target the <ul> inside #workout-list
const addButton = document.getElementById('add-button');
const workoutInput = document.getElementById('workouts');
const repsInput = document.getElementById('reps');
const loadInput = document.getElementById('loads');

// API base URL (make sure to include http://)
const baseURL = 'http://localhost:5000/api/workouts/';

// Fetch and display the list of workouts
const fetchWorkouts = async () => {
    try {
        // Fetch workouts from API without pagination query params
        const response = await fetch(baseURL);
        if (!response.ok) throw new Error('Failed to fetch workouts');
        const workouts = await response.json();

        // Clear current list before updating
        workoutList.innerHTML = '';

        // Loop through workouts and display each one
        workouts.forEach(workout => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.innerHTML = `
                <div class="workout-info">
                    <p class="workout-title">${workout.title}</p>
                    <small class="reps">Reps: ${workout.reps}</small>
                    <small class="loads">Load: ${workout.load}kg</small>
                </div>
                <button class="btn btn-danger delete" data-id="${workout._id}">Delete</button>
            `;
            workoutList.appendChild(listItem);

            // Add a separator line after each workout
            const separator = document.createElement('hr');
            workoutList.appendChild(separator);
        });

    } catch (error) {
        console.error('Error fetching workouts:', error);
    }
};

// Add a new workout
const addWorkout = async (event) => {
    event.preventDefault(); // Prevent page reload

    const title = workoutInput.value.trim();
    const reps = repsInput.value.trim();
    const load = loadInput.value.trim();

    // Check if any field is empty
    if (!title || !reps || !load) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, reps, load }),
        });

        if (!response.ok) throw new Error('Failed to add workout');
        const newWorkout = await response.json();
        console.log('Workout added:', newWorkout);

        // Clear the form fields after successful submission
        workoutInput.value = '';
        repsInput.value = '';
        loadInput.value = '';

        // Refresh the workouts list after adding a new workout
        fetchWorkouts();

    } catch (error) {
        console.error('Error adding workout:', error);
    }
};

// Delete a workout
const deleteWorkout = async (id) => {
    try {
        const response = await fetch(`${baseURL}${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete workout');
        
        // Refresh the workouts list after deleting a workout
        fetchWorkouts();
        
    } catch (error) {
        console.error('Error deleting workout:', error);
    }
};

// Event listener for form submission (Add button)
addButton.addEventListener('click', addWorkout);

// Event listener for deleting a workout
workoutList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        const workoutId = e.target.getAttribute('data-id');
        deleteWorkout(workoutId);
    }
});

// Initial fetch of workouts when the page loads
fetchWorkouts();
