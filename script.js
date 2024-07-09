document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('emailNews');
    const formMessage = document.getElementById('formMessage');
    const buttonText = document.getElementById('buttonText');
    const buttonLoader = document.getElementById('buttonLoader');
    let isSubmitting = false;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (isSubmitting) return;

        const email = emailInput.value.trim();

        if (!validateEmail(email)) {
            displayMessage('Por favor, insira um email válido.', 'error');
            return;
        }

        isSubmitting = true;
        buttonLoader.style.display = 'inline-block';
        buttonText.style.display = 'none';
        displayMessage('Enviando...', 'success');

        // Simular uma chamada de API usando fetch
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar o formulário. Por favor, tente novamente.');
            }
            return response.json();
        })
        .then(data => {
            displayMessage('Obrigado por assinar nossa newsletter!', 'success');
            form.reset();
        })
        .catch(error => {
            displayMessage(error.message, 'error');
        })
        .finally(() => {
            isSubmitting = false;
            buttonLoader.style.display = 'none';
            buttonText.style.display = 'inline';
        });
    });

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    function displayMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
    }
});
