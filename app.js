class CourseSchedule {
    constructor() {
        this.weekDays = ['周一', '周二', '周三', '周四', '周五'];
        this.timeSlots = ['第1节', '第2节', '第3节', '第4节', '第5节'];
        this.currentWeek = 1;
        this.courses = [];
        
        this.init();
    }

    init() {
        this.initWeekSelector();
        this.initCourseData();
        this.renderSchedule();
        this.bindEvents();
    }

    initWeekSelector() {
        const weekSelect = document.getElementById('weekSelect');
        for (let i = 1; i <= 20; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `第${i}周`;
            weekSelect.appendChild(option);
        }
    }

    initCourseData() {
        this.courses = [
            {
                name: '高等数学',
                teacher: '张老师',
                location: '教室A101',
                weekDay: 0,
                timeSlot: 0,
                weeks: [1, 2, 3, 4]
            }
            // 可以添加更多课程...
        ];
    }

    renderSchedule() {
        const grid = document.getElementById('scheduleGrid');
        grid.innerHTML = '';

        // 添加表头
        this.weekDays.forEach(day => {
            const header = document.createElement('div');
            header.className = 'weekday-header';
            header.textContent = day;
            grid.appendChild(header);
        });

        // 渲染课程格子
        for (let i = 0; i < this.timeSlots.length; i++) {
            for (let j = 0; j < this.weekDays.length; j++) {
                const cell = document.createElement('div');
                cell.className = 'course-item';
                
                const course = this.courses.find(c => 
                    c.weekDay === j && 
                    c.timeSlot === i && 
                    c.weeks.includes(this.currentWeek)
                );

                if (course) {
                    cell.innerHTML = `
                        <div class="course-name">${course.name}</div>
                        <div class="course-info">${course.teacher}</div>
                        <div class="course-info">${course.location}</div>
                    `;
                }
                
                grid.appendChild(cell);
            }
        }
    }

    bindEvents() {
        document.getElementById('weekSelect').addEventListener('change', (e) => {
            this.currentWeek = parseInt(e.target.value);
            this.renderSchedule();
        });
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new CourseSchedule();
});