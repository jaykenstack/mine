// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create skill level animations
    animateSkillBars();
    
    // Create interactive chart if Chart.js is available
    if (typeof Chart !== 'undefined') {
        createSkillsChart();
        createExperienceChart();
    }
    
    // Create simple D3.js visualization if available
    if (typeof d3 !== 'undefined') {
        createSimpleD3Chart();
    }
});

// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.width = '0';
                
                setTimeout(() => {
                    skillBar.style.transition = 'width 1.5s ease-in-out';
                    skillBar.style.width = width;
                }, 200);
                
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Create skills radar chart using Chart.js
function createSkillsChart() {
    const ctx = document.getElementById('skillsChart');
    
    if (!ctx) {
        // Create canvas if it doesn't exist
        const skillsSection = document.querySelector('.skills .container');
        if (skillsSection) {
            const chartContainer = document.createElement('div');
            chartContainer.className = 'chart-container';
            chartContainer.style.marginTop = '3rem';
            chartContainer.style.height = '400px';
            
            const canvas = document.createElement('canvas');
            canvas.id = 'skillsChart';
            chartContainer.appendChild(canvas);
            skillsSection.appendChild(chartContainer);
        } else {
            return;
        }
    }
    
    const skillsChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Python', 'SQL', 'Data Viz', 'Statistics', 'JavaScript', 'React', 'Node.js', 'Git'],
            datasets: [{
                label: 'Technical Skills',
                data: [90, 85, 88, 80, 95, 88, 82, 85],
                backgroundColor: 'rgba(67, 97, 238, 0.2)',
                borderColor: 'rgba(67, 97, 238, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(67, 97, 238, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(67, 97, 238, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: '#fff',
                        font: {
                            size: 12,
                            family: "'Poppins', sans-serif"
                        }
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: 'rgba(255, 255, 255, 0.5)',
                        showLabelBackdrop: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#fff',
                        font: {
                            size: 14,
                            family: "'Poppins', sans-serif"
                        }
                    }
                }
            }
        }
    });
}

// Create experience timeline chart
function createExperienceChart() {
    const ctx = document.getElementById('experienceChart');
    
    if (!ctx) return;
    
    const experienceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [
                {
                    label: 'Data Analysis Skills',
                    data: [65, 72, 78, 85, 88, 90],
                    borderColor: 'rgba(67, 97, 238, 1)',
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Web Development Skills',
                    data: [70, 75, 80, 85, 90, 95],
                    borderColor: 'rgba(247, 37, 133, 1)',
                    backgroundColor: 'rgba(247, 37, 133, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    },
                    suggestedMin: 50,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#fff'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(67, 97, 238, 0.5)',
                    borderWidth: 1
                }
            }
        }
    });
}

// Simple D3.js bar chart
function createSimpleD3Chart() {
    const container = document.querySelector('.skills-container');
    
    if (!container) return;
    
    // Create chart container
    const chartDiv = document.createElement('div');
    chartDiv.id = 'd3-chart';
    chartDiv.style.marginTop = '2rem';
    chartDiv.style.height = '300px';
    chartDiv.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    chartDiv.style.borderRadius = '8px';
    chartDiv.style.padding = '1rem';
    chartDiv.style.background = 'rgba(0, 0, 0, 0.2)';
    
    container.appendChild(chartDiv);
    
    // Sample data
    const data = [
        { skill: 'Python', value: 90 },
        { skill: 'JavaScript', value: 95 },
        { skill: 'SQL', value: 85 },
        { skill: 'React', value: 88 },
        { skill: 'Data Viz', value: 88 },
        { skill: 'Node.js', value: 82 }
    ];
    
    // Set up dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = chartDiv.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select('#d3-chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Create scales
    const x = d3.scaleBand()
        .domain(data.map(d => d.skill))
        .range([0, width])
        .padding(0.1);
    
    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);
    
    // Create bars
    svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.skill))
        .attr('width', x.bandwidth())
        .attr('y', d => y(d.value))
        .attr('height', d => height - y(d.value))
        .attr('fill', 'url(#bar-gradient)')
        .attr('rx', 4)
        .attr('ry', 4);
    
    // Add gradient
    const gradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'bar-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');
    
    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#4361ee');
    
    gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#3a0ca3');
    
    // Add axes
    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('fill', '#fff')
        .style('font-family', "'Poppins', sans-serif");
    
    svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y).ticks(5))
        .selectAll('text')
        .style('fill', '#fff')
        .style('font-family', "'Poppins', sans-serif");
    
    // Style axes
    svg.selectAll('.domain, .tick line')
        .style('stroke', 'rgba(255, 255, 255, 0.3)');
    
    // Add value labels
    svg.selectAll('.value-label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'value-label')
        .attr('x', d => x(d.skill) + x.bandwidth() / 2)
        .attr('y', d => y(d.value) - 10)
        .attr('text-anchor', 'middle')
        .text(d => d.value + '%')
        .style('fill', '#fff')
        .style('font-family', "'Poppins', sans-serif")
        .style('font-weight', '600');
}

// Add CSS for D3 chart
const style = document.createElement('style');
style.textContent = `
    .bar:hover {
        opacity: 0.8;
        cursor: pointer;
    }
    
    .value-label {
        font-size: 12px;
        pointer-events: none;
    }
    
    .chart-container {
        position: relative;
        margin: 2rem auto;
    }
`;
document.head.appendChild(style);