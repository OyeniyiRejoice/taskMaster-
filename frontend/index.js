/*
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
        const response = await fetch(`${API_URL}/register`, {
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
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); // Store the token
            window.location.href = 'task.html'; // Redirect to tasks page
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
        const response = await fetch(`${API_URL}/tasks/getPost`, {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${token}`,
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
      const response = await fetch(`${API_URL}/tasks/addPost`, {
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
  */

  
  const API_URL = 'https://backend-wild-field-1148.fly.dev';

// ── REGISTER ──
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstname = document.getElementById('firstName').value;
    const lastname = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!firstname || !lastname || !username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname, lastname, username, password })
        });

        if (response.ok) {
            alert('Registration successful! Please log in.');
            window.location.href = 'login.html';
        } else {
            const data = await response.json();
            alert(data.message || 'Registration failed.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});

// ── LOGIN ──
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            window.location.href = 'task.html';
        } else {
            const data = await response.json();
            alert(data.message || 'Login failed.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});

// ── FETCH TASKS ──
async function fetchTasks() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You need to log in first.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/tasks/getPost`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const tasks = await response.json();
            displayTasks(tasks);
            checkDeadlines(tasks);
        } else {
            const errorData = await response.json();
            alert(`Failed to fetch tasks: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// ── DISPLAY TASKS ──
function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<p>No tasks yet. Add one above.</p>';
        return;
    }

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        const deadline = task.deadline
            ? new Date(task.deadline).toLocaleDateString()
            : 'No deadline';

        const priority = task.priority || 'low';

        taskItem.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description || 'No description'}</p>
                <p>Deadline: ${deadline}</p>
                <span class="tag ${priority}">${priority}</span>
            </div>
            <button onclick="deleteTask('${task._id}')">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// ── ADD TASK ──
document.getElementById('taskForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const deadline = document.getElementById('taskDeadline').value;
    const priority = document.getElementById('taskPriority').value;

    if (!title || !deadline || !priority) {
        alert('Please fill in title, deadline and priority.');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        alert('You need to log in first.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/tasks/addPost`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, deadline, priority }),
        });

        if (response.ok) {
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDescription').value = '';
            document.getElementById('taskDeadline').value = '';
            document.getElementById('taskPriority').value = 'low';
            fetchTasks();
        } else {
            const data = await response.json();
            alert(data.message || 'Failed to create task.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});


// ── DELETE TASK ──
async function deleteTask(taskId) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You need to log in first.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            fetchTasks();
        } else {
            alert('Failed to delete task.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// ── SEARCH ──
document.getElementById('search')?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        item.style.display = title.includes(query) ? 'flex' : 'none';
    });
});

// ── DEADLINE REMINDER (NEW FEATURE) ──
function checkDeadlines(tasks) {
    if (!('Notification' in window)) return;

    Notification.requestPermission().then(permission => {
        if (permission !== 'granted') return;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        tasks.forEach(task => {
            if (!task.deadline) return;

            const deadline = new Date(task.deadline);
            deadline.setHours(0, 0, 0, 0);

            if (deadline.getTime() === today.getTime()) {
                new Notification('TaskMaster Reminder', {
                    body: `"${task.title}" is due TODAY.`,
                    icon: '/assets/task.png'
                });
            } else if (deadline.getTime() === tomorrow.getTime()) {
                new Notification('TaskMaster Reminder', {
                    body: `"${task.title}" is due TOMORROW.`,
                    icon: '/assets/task.png'
                });
            }
        });
    });
}

// ── INIT ──
function init() {
    // Only fetch tasks if we are on a page that actually displays them (like task.html)
    const taskList = document.getElementById('taskList');
    
    if (taskList) {
        fetchTasks();
    }
}

init();
