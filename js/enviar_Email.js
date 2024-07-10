document.getElementById('contact-form').addEventListener('submit', function(e){
    e.preventDefault(); // Impede o envio de formulário para evitar recarregar a página

    let form = e.target;
    let data = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            "Accept": 'application/json'
        }
    }).then(response => {
        if(response.ok){
            alert('Mensagem enviada com sucesso!');
            form.reset(); // Limpa os campos do formulário
        } else {
            response.json().then(data => {
                if(Object.hasOwn(data, 'errors')){
                    alert(data['errors'].map(error => error['message']).join(", "));
                } else {
                    alert('Oops! Ocorreu um erro ao enviar a mensagem.');
                }
            })
        }
    }).catch(error => {
        alert('Ocorreu um erro ao enviar sua mensagem. Tente novamentw mais tarde.');
    });
});