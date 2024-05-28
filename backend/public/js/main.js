document.addEventListener('DOMContentLoaded', function() {
    if (typeof vagaPausada !== 'undefined' && vagaPausada) {
        alert('Esta vaga está pausada. Não é possível se candidatar.');
        window.location.href = '{{ route("vagas.index") }}';
    }
});