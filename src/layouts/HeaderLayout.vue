<template>
    <header class="header row justify-between items-center">
        <section class="header-logo row items-center">
            <q-avatar size="50px" class="cursor-pointer" @click="goToHome">
                <img src="/logo-icon.svg" />
            </q-avatar>
            <q-toolbar-title
                class="text-h6 text-weight-bold cursor-pointer gt-xs"
                @click="goToHome"
            >
                <b class="text-primary">Caso</b>Técnico
            </q-toolbar-title>
        </section>
        <section class="header-search gt-sm">
            <q-input
                outlined
                rounded
                dense
                placeholder="Buscar producto"
                color="primary"
                class="search-input"
            >
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </section>
        <section class="header-actions row items-center q-gutter-sm">
            <q-btn flat round icon="search" class="lt-md" color="primary" />
            <q-btn flat no-caps label="Login" class="login-button gt-xs" @click="goToLogin" />
            <q-btn flat round icon="person" class="lt-sm" color="primary" @click="goToLogin" />
        </section>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goToLogin() {
    router.push('/login')
}

function goToHome() {
    router.push('/')
}
</script>

<style lang="scss" scoped>
.header {
    padding: 1rem 2rem;

    @media (min-width: 768px) {
        padding: 1.25rem 4rem;
    }

    @media (min-width: 1024px) {
        padding: 1.25rem 6rem;
    }
}

.search-input {
    width: 300px;

    @media (min-width: 1024px) {
        width: 400px;
    }
}

.login-button {
    padding: 0.5rem 2rem;
    color: $primary;
    border: 1px solid $primary;

    @media (min-width: 768px) {
        padding: 0.5rem 3rem;
    }

    &:hover {
        background-color: $primary;
        color: white;
    }
}

.cursor-pointer {
    cursor: pointer;
}
</style>
