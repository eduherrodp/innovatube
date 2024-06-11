<template>
    <section id="about-us" class="container py-5">
        <div class="row align-items-center">
            <div class="col-md-3 mb-4">
                <img src="@/assets/me.jpeg" alt="Tu Foto" class="img-fluid rounded-circle" style="width: 200px;">
            </div>
            <div class="col-md-6">
                <h2 class="mb-3">Acerca de Mí</h2>
                <p class="lead">
                    Mi nombre es <strong>José Eduardo Hernández Rodríguez</strong>, un desarrollador FullStack con
                    pasión por crear
                    productos web fáciles de usar, receptivos y visualmente atractivos. Tengo experiencia tanto en
                    desarrollo front-end como back-end, competente en distintos lenguajes y frameworks, además
                    proficient en cómputo en la nube y sistemas de la información.
                </p>
                <div class="social-links mt-4">
                    <a href="https://github.com/eduherrodp" target="_blank" class="social-link me-3"
                        aria-label="Perfil de GitHub de José Eduardo Hernández Rodríguez">
                        <i class="fab fa-github-square fa-2x"></i>
                    </a>
                    <a href="https://linkedin.com/in/eduherrodp" target="_blank" class="social-link"
                        aria-label="Perfil de LinkedIn de José Eduardo Hernández Rodríguez">
                        <i class="fab fa-linkedin fa-2x"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'AboutUs'
};
</script>

<style scoped>
#about-us {
    padding-top: 3rem;
    padding-bottom: 3rem;
}

.social-links {
    display: flex;
    justify-content: flex-start;
}

.social-link {
    color: #333;
    transition: color 0.3s;
}

.social-link:hover {
    color: #007bff;
}

.social-link:first-child:hover {
    color: black;
}
</style>