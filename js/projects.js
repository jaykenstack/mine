// Project Data
const projects = {
    data: [
        {
            id: 1,
            title: "Sales Dashboard",
            description: "Interactive dashboard analyzing e-commerce sales data with predictive insights and real-time metrics.",
            category: "data",
            technologies: ["Python", "Tableau", "SQL", "Pandas"],
            github: "https://github.com/username/sales-dashboard",
            live: "https://sales-dashboard-demo.netlify.app"
        },
        {
            id: 2,
            title: "Customer Segmentation Analysis",
            description: "Machine learning model to segment customers based on purchasing behavior and demographics.",
            category: "data",
            technologies: ["Python", "Scikit-learn", "Matplotlib", "Jupyter"],
            github: "https://github.com/username/customer-segmentation"
        },
        {
            id: 3,
            title: "E-commerce Platform",
            description: "Full-stack online store with React frontend, Node.js backend, and MongoDB database.",
            category: "web",
            technologies: ["React", "Node.js", "MongoDB", "Express"],
            github: "https://github.com/username/ecommerce-platform",
            live: "https://ecommerce-demo.netlify.app"
        },
        {
            id: 4,
            title: "Task Management App",
            description: "Productivity application with drag-and-drop interface and team collaboration features.",
            category: "web",
            technologies: ["Vue.js", "Firebase", "Vuetify", "Vuex"],
            github: "https://github.com/task-manager-app",
            live: "https://taskmanager-demo.netlify.app"
        },
        {
            id: 5,
            title: "Real-time Analytics Dashboard",
            description: "Live data visualization platform combining Python analytics with React frontend.",
            category: "hybrid",
            technologies: ["Python", "React", "D3.js", "Flask", "Socket.io"],
            github: "https://github.com/username/analytics-dashboard",
            live: "https://analytics-dashboard-demo.netlify.app"
        },
        {
            id: 6,
            title: "Financial Data API",
            description: "REST API for financial data with automated data pipelines and React admin panel.",
            category: "hybrid",
            technologies: ["Python", "FastAPI", "React", "PostgreSQL", "Docker"],
            github: "https://github.com/username/financial-api"
        }
    ]
};

// Initialize projects grid
function initializeProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) return;
    
    // Clear existing content (except template)
    const existingProjects = projectsGrid.querySelectorAll('.project-card');
    existingProjects.forEach(project => {
        if (!project.classList.contains('project-template')) {
            project.remove();
        }
    });
    
    // Add projects to grid
    projects.data.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card scroll-animate';
    card.setAttribute('data-category', project.category);
    card.setAttribute('data-id', project.id);
    
    // Color based on category
    let gradient = '';
    let tagColor = '';
    
    switch(project.category) {
        case 'data':
            gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            tagColor = '#667eea';
            break;
        case 'web':
            gradient = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            tagColor = '#f5576c';
            break;
        case 'hybrid':
            gradient = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
            tagColor = '#00f2fe';
            break;
    }
    
    card.innerHTML = `
        <div class="project-image" style="background: ${gradient};">
            <div class="project-tag" style="background: ${tagColor}">
                ${project.category.charAt(0).toUpperCase() + project.category.slice(1)}
            </div>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                ${project.github ? `<a href="${project.github}" target="_blank" class="project-link"><i class="fab fa-github"></i> Code</a>` : ''}
                ${project.live ? `<a href="${project.live}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Filter projects
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Project Modal
function showProjectModal(projectId) {
    const project = projects.data.find(p => p.id === parseInt(projectId));
    
    if (!project) return;
    
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close"><i class="fas fa-times"></i></button>
            <h2>${project.title}</h2>
            <div class="modal-category">${project.category}</div>
            <p>${project.description}</p>
            <div class="modal-technologies">
                <h3>Technologies Used:</h3>
                <div>${project.technologies.map(tech => `<span>${tech}</span>`).join('')}</div>
            </div>
            <div class="modal-links">
                ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-primary"><i class="fab fa-github"></i> View Code</a>` : ''}
                ${project.live ? `<a href="${project.live}" target="_blank" class="btn btn-secondary"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = 'auto';
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProjects();
    
    // Add click event to project cards
    document.addEventListener('click', (e) => {
        const projectCard = e.target.closest('.project-card');
        if (projectCard) {
            const projectId = projectCard.getAttribute('data-id');
            showProjectModal(projectId);
        }
    });
});