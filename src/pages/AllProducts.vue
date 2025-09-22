<template>
    <main class="all-products" :class="wrapperClass">
        <div class="product-header q-mb-lg">
            <div class="text-h3 text-weight-bold col-8">Productos similares</div>
            <q-btn
                no-caps
                label="Agregar producto"
                color="primary"
                class="full-width text-body1 text-weight-bold col-4"
                style="max-width: 200px"
                @click="goToAddProduct"
            />
        </div>
        <div>
            <div class="product-list justify-between">
                <div class="col-2 q-mb-lg" v-for="product in allProducts" :key="product.id">
                    <q-card class="my-card column" flat>
                        <img :src="product.image" class="product-image" />
                        <span class="text-body1">{{ product.name }}</span>
                        <span class="text-body1 text-weight-bold">{{ product.precio }}</span>
                        <span
                            class="text-body1 text-weight-bold text-primary"
                            style="cursor: pointer"
                            >Ver producto</span
                        >
                    </q-card>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { useProductsStore } from 'src/stores/products'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const $q = useQuasar()
const router = useRouter()
const isMobile = computed(() => $q.screen.width < 768)
const isTablet = computed(() => $q.screen.width >= 768 && $q.screen.width < 1024)
const isDesktop = computed(() => $q.screen.width >= 1024)
console.log(isMobile, isTablet, isDesktop)

const wrapperClass = computed(() => ({
    mobile: isMobile.value,
    tablet: isTablet.value,
    desktop: isDesktop.value,
}))

const productsStore = useProductsStore()
const allProducts = productsStore.allProducts || []

const goToAddProduct = () => {
    router.push('/new-product')
}
</script>

<style lang="scss" scoped>
.all-products {
    background-color: #f5f5f5;

    .product-header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

        @media (max-width: 500px) {
            justify-content: center;
            text-align: center;

            .text-h3 {
                font-size: 2rem;
            }
        }
    }

    .product-list {
        display: flex;
        flex-wrap: wrap;

        @media (max-width: 480px) {
            justify-content: center;
        }
    }
}

.mobile {
    padding: 2rem;
}

.tablet {
    padding: 4rem;
}

.desktop {
    padding: 6rem;
}

.my-card {
    max-width: 300px;
    background-color: #f5f5f5;

    .product-image {
        width: 200px;
        height: 200px;
        object-fit: cover;
        display: block;
        margin: 1rem 0;
    }
}
</style>
