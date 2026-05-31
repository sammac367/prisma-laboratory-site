// catalog.js
document.addEventListener('DOMContentLoaded', function() {
    // --- Плавная прокрутка для ВСЕХ якорных ссылок ---
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    
    allAnchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Пропускаем пустые ссылки и просто "#"
            if (href === "#" || href === "# " || href === "") return;
            
            const targetId = href;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // --- Логика опросника (остаётся без изменений) ---
    const questions = document.querySelectorAll('.quiz-question');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressBar = document.getElementById('progressBar');
    const quizForm = document.getElementById('moleculeQuiz');
    const quizResultDiv = document.getElementById('quizResult');
    const quizContainer = document.querySelector('.quiz-container');
    const resultContent = document.getElementById('resultContent');
    const restartBtn = document.getElementById('restartQuiz');

    let currentQuestion = 1;
    const totalQuestions = questions.length;

    function updateProgress() {
        const percent = ((currentQuestion - 1) / totalQuestions) * 100;
        progressBar.style.width = `${percent}%`;
    }

    function showQuestion(questionNumber) {
        questions.forEach((q, idx) => {
            if (idx + 1 === questionNumber) {
                q.classList.add('active');
            } else {
                q.classList.remove('active');
            }
        });
        
        // Управление кнопками
        if (currentQuestion === 1) {
            prevBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
        }
        
        if (currentQuestion === totalQuestions) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
        
        updateProgress();
    }

    // Проверка, что на текущем вопросе выбран ответ
    function isCurrentQuestionAnswered() {
        const activeQuestion = document.querySelector('.quiz-question.active');
        const selectedRadio = activeQuestion.querySelector('input[type="radio"]:checked');
        return selectedRadio !== null;
    }

    // Далее
    nextBtn.addEventListener('click', () => {
        if (!isCurrentQuestionAnswered()) {
            alert('Пожалуйста, выберите один из вариантов');
            return;
        }
        
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            showQuestion(currentQuestion);
        }
    });

    // Назад
    prevBtn.addEventListener('click', () => {
        if (currentQuestion > 1) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });

    // Функция для получения случайной молекулы
    function getRandomMolecule() {
        const molecules = [
            {
                name: 'Аэробный Контур V-9',
                description: 'Ваша идеальная молекула — <strong>«Аэробный Контур V-9»</strong>. Она оптимизирует потребление кислорода, отодвигает точку закисления и превращает ваши легкие в гиперэффективные турбины. Забудьте об одышке — ваша выносливость станет безграничной.',
                icon: ''
            },
            {
                name: 'Мио-Реактор XT',
                description: 'Вам подходит <strong>«Мио-Реактор XT»</strong>. Эта молекула синхронизирует нервные импульсы со скоростью F1, сокращая время реакции на 0.2 секунды. Вы будете взрывным, быстрым и мощным, как кибернетический атлет.',
                icon: ''
            },
            {
                name: 'Кардио-Контроллер SGN-4',
                description: 'Ваш выбор — <strong>«Кардио-Контроллер SGN-4»</strong>. Она укрепляет фасции, стимулирует регенерацию суставов и подавляет сигналы усталости. Ваши суставы станут похожи на гидравлические домкраты, а восстановление ускорится в разы.',
                icon: ''
            }
        ];
        
        const randomIndex = Math.floor(Math.random() * molecules.length);
        return molecules[randomIndex];
    }

    // Отправка (рандомный результат)
    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Проверяем, что на последнем вопросе выбран ответ
        if (!isCurrentQuestionAnswered()) {
            alert('Пожалуйста, выберите один из вариантов');
            return;
        }
        
        // Получаем случайную молекулу
        const randomMolecule = getRandomMolecule();
        
        // Формируем персональное обращение (добавляем элемент неожиданности)
        const personalMessages = [
            'После анализа ваших биоритмов нейросеть Prisma Lab определила:',
            'Квантовый сканер показал идеальную совместимость с:',
            'Алгоритм подбора молекул выбрал для вас:'
        ];
        const randomMessage = personalMessages[Math.floor(Math.random() * personalMessages.length)];
        
        resultContent.innerHTML = `
            <p style="font-size:1rem; color:#555; margin-bottom:15px;">${randomMessage}</p>
            <p style="font-size:1.3rem; margin-bottom:10px;">${randomMolecule.icon} <strong>${randomMolecule.name}</strong> ${randomMolecule.icon}</p>
            <p>${randomMolecule.description}</p>
            <p style="margin-top:20px; padding-top:15px; border-top:1px solid #ddd; font-size:0.95rem; color:#666;">
                *Результат основан на технологии подбора молекул Prisma Lab v2.0
            </p>
        `;
        
        quizContainer.style.display = 'none';
        quizResultDiv.style.display = 'block';
    });

    // Перезапуск теста
    restartBtn.addEventListener('click', () => {
        currentQuestion = 1;
        showQuestion(1);
        
        // Сбрасываем все радиокнопки
        document.querySelectorAll('.quiz-question input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        
        quizResultDiv.style.display = 'none';
        quizContainer.style.display = 'block';
        progressBar.style.width = '0%';
    });

    // Инициализация: показываем первый вопрос
    showQuestion(1);
    
        // --- Кнопка загрузки дополнительных карточек ---
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const hiddenCards = document.getElementById('hiddenCards');

    if (loadMoreBtn && hiddenCards) {
        loadMoreBtn.addEventListener('click', function() {
            hiddenCards.style.display = 'block';
            loadMoreBtn.style.display = 'none'; // Кнопка исчезает
            
            // Плавная прокрутка к новым карточкам
            setTimeout(() => {
                hiddenCards.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        });
    }

        // --- Модальное окно с формой заявки ---
    const modal = document.getElementById('moleculeModal');
    const modalClose = document.querySelector('.modal-close');
    const modalMoleculeName = document.getElementById('modalMoleculeName');
    const applicationForm = document.getElementById('applicationForm');
    const modalSuccess = document.getElementById('modalSuccess');
    
    // Открытие модального окна
    function openModal(moleculeName) {
        modalMoleculeName.textContent = moleculeName;
        modal.style.display = 'flex';
        applicationForm.style.display = 'block';
        modalSuccess.style.display = 'none';
        applicationForm.reset();
    }
    
    // Закрытие модального окна
    function closeModal() {
        modal.style.display = 'none';
    }
    
    // Навешиваем обработчики на все кнопки "Попробовать"
    document.querySelectorAll('.start-use').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.service-card');
            const moleculeName = card.querySelector('h3').textContent;
            openModal(moleculeName);
        });
    });
    
    // Закрытие по крестику
    modalClose.addEventListener('click', closeModal);
    
    // Закрытие по клику вне окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
        // Отправка формы
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const molecule = modalMoleculeName.textContent;
        
        // Простая валидация
        if (!fullName || !email || !phone) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        
        // Проверяем, принял ли пользователь cookie
        const cookiesAccepted = localStorage.getItem('cookiesAccepted') === 'true';
        
        // Функция для получения IP-адреса (только если куки приняты)
        function getUserIP(callback) {
            if (!cookiesAccepted) {
                callback('Не отправлено (пользователь не принял куки)');
                return;
            }
            
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => callback(data.ip))
                .catch(() => callback('Не удалось определить'));
        }
        
        // Получаем IP (или пропускаем) и отправляем заявку
        getUserIP(function(ip) {
            // Отправка в Telegram
            const botToken = '8881541822:AAEgw-hEPa1EBlDOtlOivYgx6XAt0od7o-4';
            const chatId = '1132629344';
            
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            
            // Если куки не приняты, добавляем предупреждение
            const cookiesWarning = !cookiesAccepted ? '\n\n⚠️ Пользователь НЕ принял cookie. IP-адрес не собран.' : '';
            
            const message = `НОВАЯ ЗАЯВКА Prisma Lab\n\n` +
                           `Время: ${formattedDate}\n` +
                           `Молекула: ${molecule}\n` +
                           `ФИО: ${fullName}\n` +
                           `Email: ${email}\n` +
                           `Телефон: ${phone}\n` +
                           `IP-адрес: ${ip}\n` +
                           `${cookiesWarning}\n\n` +
                           `—\nДанные отправлены с сайта Prisma Lab`;
            
            const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
            
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML'
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    console.log('Заявка отправлена в Telegram');
                    // Показываем сообщение об успехе
                    applicationForm.style.display = 'none';
                    modalSuccess.style.display = 'block';
                } else {
                    console.error('Ошибка:', data);
                    alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
            });
        });
    });
    
    acceptCookiesBtn.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.classList.remove('show');
    });
});