document.addEventListener('DOMContentLoaded', function() {
    const calendarBody = document.getElementById('calendarBody');
    const monthYearElement = document.getElementById('monthYear');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let currentDate = new Date();

    function generateCalendar(month, year) {
        // Limpar o calendário
        calendarBody.innerHTML = '';

        // Configurar o título do mês e ano
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        monthYearElement.textContent = `${monthNames[month]} ${year}`;

        // Primeiro dia do mês
        const firstDay = new Date(year, month, 1).getDay();
        // Número de dias no mês
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Criar as linhas e colunas do calendário
        let date = 1;
        for (let i = 0; i < 6; i++) { // Criar 6 semanas
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) { // Criar 7 dias por semana
                const cell = document.createElement('td');

                if (i === 0 && j < firstDay) {
                    // Preencher as células vazias antes do primeiro dia do mês
                    cell.classList.add('empty');
                } else if (date > daysInMonth) {
                    // Parar de adicionar células quando acabar os dias do mês
                    cell.classList.add('empty');
                } else {
                    // Adicionar a data à célula
                    cell.setAttribute('data-date', `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`);
                    cell.textContent = date;

                    date++;
                }

                row.appendChild(cell);
            }

            calendarBody.appendChild(row);
        }

        // Carregar os eventos do backend
        loadEvents();
    }

    function loadEvents() {
        fetch('http://127.0.0.1:8001/eventos')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Verifique se os dados estão sendo carregados
                data.forEach(evento => {
                    const eventDate = new Date(evento.data);
                    const formattedDate = eventDate.toISOString().split('T')[0]; // Ajuste para obter a data no formato YYYY-MM-DD
                    const cell = document.querySelector(`[data-date='${formattedDate}']`);
                    if (cell) {
                        console.log(`Evento encontrado para ${formattedDate}`); // Verifique se o evento é encontrado
                        const eventElement = document.createElement('div');
                        eventElement.className = 'event';
                        eventElement.innerHTML = `${evento.descricao}`;
                        cell.appendChild(eventElement);
                    }
                });
            });
    }

    prevButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
    });

    nextButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
    });

    // Inicializar o calendário
    generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
});
