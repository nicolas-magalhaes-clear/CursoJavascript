HTMLFormElement.prototype.save = function () {
    let form = this;
  

  
    return new Promise((resolve, reject) => {
      form.addEventListener('submit', function onSubmit(e) {
            // Desabilitar o botão de envio
        form.querySelector('button[type="submit"]').disabled = true;
        e.preventDefault();
        form.removeEventListener('submit', onSubmit); // Remover o ouvinte de evento
  
        let formData = new FormData(form);
        fetch(form.action, {
          method: form.method,
          headers: {
            // Set the 'Accept' header to specify that you want JSON response
            'Accept': 'application/json',
            // You may also need to set other headers like 'Authorization' if required
          },
          body: formData
        })
          .then(response => {
            if (response.ok) {
              resolve(response.json());
            } else {
              reject(new Error('Erro na resposta do servidor'));
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  };
  