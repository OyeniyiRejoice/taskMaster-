const API_URL = 'https://backend-wild-field-1148.fly.dev/'; 
const test_api = 'http://localhost:3000';

// Register User
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstname = document.getElementById('firstName').value;
    const lastname = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!firstname || !lastname || !username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    const textBody = JSON.stringify({ firstname, lastname, username, password });
    try {
        const response = await fetch(`${test_api}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: textBody
        });
        if (response.ok) {
            alert('Registration successful! Please log in.');
            window.location.href = 'login.html';
        } else {
            alert('Registration failed.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Login User
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Basic validation
    if (!username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        const response = await fetch(`${test_api}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); // Store the token
            window.location.href = 'tasks.html'; // Redirect to tasks page
        } else {
            alert('Login failed.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Fetch and Display Tasks
async function fetchTasks() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You need to log in first.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`${test_api}/tasks/getPosts`, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const tasks = await response.json();
            displayTasks(tasks);
        } else {
            const errorData = await response.json();
            alert(`Failed to fetch tasks here: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to display tasks
function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description || 'No description'}</p>
            <p>Deadline: ${new Date(task.deadline).toLocaleDateString() || 'No deadline'}</p>
            <p>Priority: ${task.priority || 'low'}</p>
            <button onclick="deleteTask('${task._id}')">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Add Task
document.getElementById('taskForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;   
  
    const deadline = document.getElementById('taskDeadline').value;
    const priority = document.getElementById('taskPriority').value;
  
    //basic validation
    if (!title || !description || !deadline || !priority) {
      alert('Please fill in all fields.');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first.');
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/tasks/getPost`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({   
   title, description, deadline, priority }),
      });
  
      const data = await response.json();
      console.log(data);
  
      // Clear input fields and display success message
      document.getElementById('taskTitle').value = '';
      document.getElementById('taskDescription').value = '';
      document.getElementById('taskDeadline').value = '';
      document.getElementById('taskPriority').value   
   = '';
      alert('Task created successfully!');
    } catch (error) {
      console.error('Error:', error);
  
      if (error.response && error.response.status === 401) {
        alert('Unauthorized. Please log in again.');
      } else {
        alert('An error occurred while creating the task. Please try again later.');
      }
    }
  });