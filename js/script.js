// Script sencillo para manejar el formulario de contacto
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', evt => {
        evt.preventDefault();
        alert('Gracias por su mensaje!');
        form.reset();
    });
});
