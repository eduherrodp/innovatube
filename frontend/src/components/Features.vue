<template>
    <section id="features-section" class="container py-5">
        <h2 class="mb-4 text-center">Nuestras Características</h2>
        <div class="row">
            <div class="col-md-4 mb-3" v-for="(feature, index) in features" :key="index">
                <div class="card h-100 shadow-sm feature-card">
                    <div class="card-body text-center">
                        <i :class="feature.icon" class="feature-icon mb-3"></i>
                        <h5 class="card-title">{{ feature.title }}</h5>
                        <p class="card-text">{{ feature.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Features',
    data() {
        return {
            features: [
                { icon: 'fas fa-search', title: 'Búsqueda rápida de videos', description: 'Encuentra tus videos favoritos al instante.' },
                { icon: 'fas fa-heart', title: 'Guarda tus favoritos', description: 'Mantén tus videos favoritos al alcance de tu mano.' },
                { icon: 'fas fa-play-circle', title: 'Reproduce directamente desde YouTube', description: 'Disfruta de tus videos sin salir de la aplicación.' }
            ]
        };
    }
};
</script>

<style scoped>
#features-section {
    padding-top: 3rem;
    padding-bottom: 3rem;
}

.feature-card {
    transition: transform 0.3s ease-in-out;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-icon {
    font-size: 4rem;
    color: #28a745;
}
</style>