<template>
    <footer class="footer">
        <div class="row q-col-gutter-lg">
            <div class="col-12 col-md-6 col-lg-3">
                <section class="footer-logo row items-center">
                    <q-avatar size="50px" class="cursor-pointer" @click="goToHome">
                        <img src="/src/assets/logo-icon.svg" />
                    </q-avatar>
                    <q-toolbar-title
                        class="text-h6 text-weight-bold cursor-pointer"
                        @click="goToHome"
                    >
                        <b class="text-primary">Caso</b>Técnico
                    </q-toolbar-title>
                </section>
            </div>

            <div class="col-12 col-sm-6 col-lg-3">
                <section class="footer-links column items-start q-gutter-y-sm">
                    <span class="text-h6 text-weight-bold text-black">Nosotros</span>
                    <a href="#" class="footer-link">Politica de privacidad</a>
                    <a href="#" class="footer-link">Programa de fidelidad</a>
                    <a href="#" class="footer-link">Quiero ser franquiciado</a>
                    <a href="#" class="footer-link">Anuncie aquí</a>
                </section>
            </div>

            <div class="col-12 col-sm-6 col-lg-3">
                <section class="footer-links column items-start q-gutter-y-sm">
                    <span class="text-h6 text-weight-bold text-black">Acerca de</span>
                    <a href="#" class="footer-link">Blogs</a>
                    <a href="#" class="footer-link">Contacto</a>
                    <a href="#" class="footer-link">Nuestra historia</a>
                    <a href="#" class="footer-link">Nuestras tiendas</a>
                </section>
            </div>

            <div class="col-12 col-lg-3">
                <section class="footer-contact column items-start q-gutter-y-sm">
                    <span class="text-h6 text-weight-bold text-black">Contáctanos</span>
                    <q-input
                        outlined
                        bg-color="white"
                        label="Nombre completo"
                        placeholder="John Doe"
                        class="full-width"
                    />
                    <q-input
                        outlined
                        bg-color="white"
                        label="Correo electrónico"
                        placeholder="john.doe@example.com"
                        class="full-width"
                    />
                    <q-btn
                        no-caps
                        label="Enviar"
                        color="primary"
                        class="q-px-xl text-body1 text-weight-bold"
                    />
                </section>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goToHome() {
    router.push('/')
}
</script>

<style lang="scss" scoped>
.footer {
    padding: 2rem 1rem;
    background-color: #eaf2fd;

    @media (min-width: 768px) {
        padding: 2.5rem 2rem;
    }

    @media (min-width: 1024px) {
        padding: 3rem 4rem;
    }

    @media (min-width: 1200px) {
        padding: 3rem 6rem;
    }
}

.footer-link {
    text-decoration: none;
    color: $primary;
    font-weight: 600;
    transition: color 0.2s ease;

    &:hover {
        color: $primary;
    }
}

.cursor-pointer {
    cursor: pointer;
}

@media (max-width: 768px) {
    .footer-logo {
        justify-content: center;
        margin-bottom: 1rem;
    }

    .footer-links,
    .footer-contact {
        align-items: center !important;
        text-align: center;
    }
}
</style>
