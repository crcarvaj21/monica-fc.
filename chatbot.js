document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    // Abrir/Cerrar chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    // Enviar mensaje al hacer click en el botón
    chatbotSend.addEventListener('click', handleSendMessage);

    // Enviar mensaje al presionar Enter
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    function handleSendMessage() {
        const messageText = chatbotInput.value.trim();
        if (messageText === '') return;

        // Añadir mensaje del usuario
        addMessage(messageText, 'user-message');
        chatbotInput.value = '';

        // Simular respuesta del bot
        setTimeout(() => {
            const botResponse = getBotResponse(messageText);
            addMessage(botResponse, 'bot-message');
        }, 600);
    }

    function addMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);
        messageDiv.innerHTML = text; // Usamos innerHTML para permitir saltos de línea y botones si es necesario
        chatbotMessages.appendChild(messageDiv);
        
        // Auto-scroll hacia abajo
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Exponer sendOption globalmente para los botones extra
    window.sendOption = function(option) {
        addMessage(option, 'user-message');
        
        setTimeout(() => {
            const botResponse = getBotResponse(option);
            addMessage(botResponse, 'bot-message');
        }, 600);
    };

    function getBotResponse(input) {
        const text = input.toLowerCase();
        
        if (text.includes('agendar') || text.includes('amistoso') || text.includes('retar')) {
            return '¿Quieres medirte contra el Gigante de Conchalí? Llena el formulario en la sección "Agendar Partido" y nuestra directiva se pondrá en contacto contigo. <br><a href="#agendar-partido" style="color:var(--color-secundario); font-weight:bold; display:inline-block; margin-top:5px;">Ir a Agendar Partido</a>';
        }
        else if (text.includes('partido') || text.includes('juegan') || text.includes('proximo')) {
            return '¡Nuestro próximo partido es este Sábado 15 de Junio a las 18:00 hrs contra Vascoamigos en el Estadio Municipal de Conchalí! ¡Te esperamos!';
        }
        else if (text.includes('socio') || text.includes('membresía') || text.includes('asociarme')) {
            return '¡Para ser socio de Monica FC, debes llenar el formulario en la sección de socios contándonos tu mejor momento o mejor gol con el club! La directiva evaluará tu solicitud. <br><a href="#hazte-socio" style="color:var(--color-secundario); font-weight:bold; display:inline-block; margin-top:5px;">Ir a Hazte Socio</a>';
        }
        else if (text.includes('entrada') || text.includes('ticket')) {
            return 'Las entradas se venden el mismo día del partido en la puerta del estadio. ¡Llega temprano para asegurar tu lugar!';
        }
        else if (text.includes('ropa') || text.includes('indumentaria') || text.includes('camiseta') || text.includes('comprar')) {
            return 'Puedes revisar nuestra sección de Tienda en la página. Tenemos las camisetas de la temporada 2026 y tazones oficiales. <a href="#tienda" style="color:var(--color-secundario); font-weight:bold;">Ir a la tienda</a>';
        }
        else if (text.includes('unirme') || text.includes('probarme') || text.includes('equipo') || text.includes('jugar')) {
            return 'Siempre buscamos nuevos talentos. Por favor, déjanos un mensaje en el formulario de contacto indicando tu posición y experiencia.';
        }
        else if (text.includes('hola') || text.includes('saludos')) {
            return '¡Hola hinchas del Monica! Qué gusto saludarlos. ¿Necesitan saber del próximo partido o sobre nuestra indumentaria?';
        }
        else if (text.includes('gracias')) {
            return '¡De nada! ¡Aguante el Gigante de Conchalí!';
        }
        else {
            return 'No estoy seguro de entender. Puedes preguntarme sobre el próximo partido, indumentaria, cómo unirte al equipo o cómo hacerte socio.';
        }
    }

    // Manejo del formulario de Hazte Socio
    const formSocio = document.getElementById('form-socio');
    if (formSocio) {
        formSocio.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar recarga
            
            const mensajeEl = document.getElementById('socio-mensaje');
            const boton = formSocio.querySelector('.btn-enviar');
            const originalText = boton.innerHTML;
            
            // Estado de envío
            boton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            boton.disabled = true;
            
            // Simular envío a la directiva
            setTimeout(() => {
                formSocio.reset();
                boton.innerHTML = originalText;
                boton.disabled = false;
                
                mensajeEl.textContent = '¡Gracias! Tu solicitud ha sido enviada a la directiva. Te contactaremos pronto tras evaluar tu mejor momento/gol.';
                mensajeEl.style.display = 'block';
                
                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    mensajeEl.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
});