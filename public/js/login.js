const logar = document.getElementById('logar');

logar.addEventListener('submit', async(e) => {
    e.preventDefault();

    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    const response = await fetch('api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({login, senha}),
    });
    const result = await response.json();
    if (response.ok) {
        alert(result.message);
        window.location.href = '/admin';
    } else {
        alert(result.message);
    }
});