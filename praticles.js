// particles.js - фоновые 3D-эффекты для главной страницы

document.addEventListener('DOMContentLoaded', function() {
    // Создаём элементы для фоновых эффектов
    function createBackgroundEffects() {
        // 1. Голографический блик
        const glossFlare = document.createElement('div');
        glossFlare.classList.add('gloss-flare');
        document.body.appendChild(glossFlare);
        
        // 2. Линия сканирования
        const scanLine = document.createElement('div');
        scanLine.classList.add('scan-line');
        document.body.appendChild(scanLine);
        
        // 3. Плавающие частицы
        const particleCount = 18;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('floating-particle');
            const size = Math.random() * 80 + 20;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 8}s`;
            particle.style.animationDuration = `${7 + Math.random() * 8}s`;
            document.body.appendChild(particle);
        }
    }
    
    createBackgroundEffects();
});