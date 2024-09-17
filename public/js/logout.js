const logout = document.getElementById('logout');

logout.addEventListener('click', async() => {
    const response = await fetch('/api/auth/logout', {method: 'POST'});
    const result = await response.json();
    if (response.ok) {
        alert(result.message);
        window.location.href = '/'
    } else {
        alert("Erro ao tentar fazer logout!");
    }
});