<template>
    <main class="login">
        <div class="text-h4 text-weight-bold text-center">Iniciar sesión</div>
        <div class="q-pa-md" style="max-width: 400px; margin: auto">
            <q-form class="column q-gutter-sm">
                <!-- admin@pruebatecnica.com pruebatecnica -->
                <q-input
                    filled
                    v-model="email"
                    label="Correo electrónico"
                    placeholder="johndoe@example.com"
                    type="email"
                    class="q-mb-md"
                    bg-color="white"
                    :rules="emailRules"
                />
                <q-input
                    filled
                    v-model="password"
                    label="Contraseña"
                    type="password"
                    class="q-mb-md"
                    bg-color="white"
                    :rules="[(val) => (val && val.length > 0) || 'La contraseña es requerida']"
                />
                <q-btn
                    no-caps
                    class="full-width q-py-md text-body1 google-btn"
                    @click.prevent="authUserWithGoogle"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        class="google-icon"
                    />
                    <span class="google-label text-body1">Registrarse con Google</span>
                </q-btn>
                <q-btn
                    no-caps
                    label="Registrarse con correo electrónico"
                    color="primary"
                    class="full-width q-py-md text-body1"
                    @click.prevent="authUser"
                />
            </q-form>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { notifyWarn } from 'src/helpers/NotifyHelpers'
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth'

const email = ref('')
const password = ref('')
const router = useRouter()

const auth = getAuth()
const googleProvider = new GoogleAuthProvider()

const authUserWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
        .then(() => {
            router.push('/new-product')
        })
        .catch((error) => {
            notifyWarn('Error al iniciar sesión con Google: ' + error.message)
        })
}

const authUser = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
            router.push('/new-product')
        })
        .catch((error) => {
            notifyWarn('Error al iniciar sesión: ' + error.message)
        })
}

const emailRules = [
    (mail) => (mail && mail.length > 0) || 'Correo electronico es requerido',
    (mail) => /.+@.+\..+/.test(mail) || 'Correo electronico no es valido',
]
</script>

<style lang="scss" scoped>
.login {
    padding: 8rem 0;
    background-color: #f5f5f5;
}

.google-btn {
    background: #fff !important;
    color: #4285f4 !important;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
}
.google-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
}
.google-label {
    font-weight: 600;
}
</style>
