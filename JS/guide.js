// Main functionality for Buying Guide

document.addEventListener('DOMContentLoaded', () => {
    // Tab switching logic for Recommendations
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.rec-tab-pane');

    function activateTab(targetId) {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => {
            p.classList.remove('active');
            p.style.display = 'none';
        });

        const btn = document.querySelector(`.tab-btn[data-target="${targetId}"]`);
        if (btn) btn.classList.add('active');

        const targetPane = document.getElementById(targetId + '_pane');
        if (targetPane) {
            targetPane.style.display = 'block';
            setTimeout(() => targetPane.classList.add('active'), 10);
        }
    }

    if (tabBtns.length > 0 && tabPanes.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                activateTab(btn.getAttribute('data-target'));
            });
        });
    }

    // Smooth Scrolling
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    for (let item of scrollLinks) {
        item.addEventListener('click', (e) => {
            let hashval = item.getAttribute('href')
            let target = document.querySelector(hashval)
            if (target) {
                e.preventDefault()
                let position = target.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                })
            }
        })
    }

    // Smart PC Finder Logic
    let answers = {};
    const step1 = document.getElementById('quiz-step-1');
    const step2 = document.getElementById('quiz-step-2');
    const step3 = document.getElementById('quiz-step-3');
    const result = document.getElementById('quiz-result');

    document.querySelectorAll('#quiz-step-1 .quiz-btn').forEach(b => {
        b.addEventListener('click', () => {
            answers.use = b.getAttribute('data-val');
            step1.style.display = 'none';
            step2.style.display = 'block';
        });
    });

    document.querySelectorAll('#quiz-step-2 .quiz-btn').forEach(b => {
        b.addEventListener('click', () => {
            answers.form = b.getAttribute('data-val');
            step2.style.display = 'none';
            step3.style.display = 'block';
        });
    });

    document.querySelectorAll('#quiz-step-3 .quiz-btn').forEach(b => {
        b.addEventListener('click', () => {
            answers.budget = b.getAttribute('data-val');
            step3.style.display = 'none';
            calculateResult();
        });
    });

    function calculateResult() {
        let text = "";
        let targetTab = "student";

        if (answers.use === 'office') {
            if (answers.budget === 'low') {
                text = "The Student Tab's recommendations perfectly fit a solid budget office workflow.";
                targetTab = "student";
            } else {
                text = "The Office Pro tier handles intense spreadsheets and Chrome tabs with ease.";
                targetTab = "office";
            }
        }
        else if (answers.use === 'gaming') {
            text = "The Gaming tier matches exactly what you need for blazing fast frame-rates.";
            targetTab = "gaming";
        }
        else if (answers.use === 'editing') {
            if (answers.budget === 'high') {
                text = "The Creative Pro tier is your gateway to unhindered 4K rendering.";
                targetTab = "creative";
            } else {
                text = "You can edit videos efficiently utilizing our mid-range Gaming tier options.";
                targetTab = "gaming";
            }
        }

        document.getElementById('quiz-match-text').textContent = text;
        result.style.display = 'block';

        document.getElementById('quiz-go-btn').onclick = () => {
            activateTab(targetTab);
            let position = document.getElementById('recommendations').getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: position, behavior: 'smooth' });
        };
    }

    const resetBtn = document.getElementById('quiz-reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            answers = {};
            result.style.display = 'none';
            step2.style.display = 'none';
            step3.style.display = 'none';
            step1.style.display = 'block';
        });
    }
});
