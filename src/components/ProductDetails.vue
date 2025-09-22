<template>
    <section v-if="product" class="product-details">
        <div class="row">
            <div class="col-12 col-md-6">
                <img :src="product.image" class="product-image" />
            </div>
            <div class="col-12 col-md-6 column justify-center q-pa-lg">
                <div class="text-h2 text-weight-bold">{{ product.name }}</div>
                <div class="text-h6 text-weight-bold text-primary">{{ product.price }}</div>
                <div class="text-body1 q-mt-md">
                    {{ product.description }}
                </div>
            </div>
        </div>
    </section>
    <section v-else class="q-pa-lg">
        <div class="text-h6">Producto no encontrado.</div>
    </section>
    <ProductsSimilar v-if="product" />
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from 'src/stores/products'
import ProductsSimilar from './ProductsSimilar.vue'
import { slugify } from 'src/helpers/slugify'
import { notifyWarn } from 'src/helpers/NotifyHelpers'
import router from 'src/router'

const route = useRoute()
const productsStore = useProductsStore()
const storeProduct = computed(() => productsStore.product)

const product = computed(() => {
    const slug = route.params.slug
    const list = productsStore.allProducts || []
    if (slug) {
        const found = list.find((p) => slugify(p.name || '') === slug)
        if (found) return found
        if (storeProduct.value && slugify(storeProduct.value.name || '') === slug) {
            return storeProduct.value
        }
        return null
    }
    return storeProduct.value
})

onMounted(async () => {
    if (!product.value && (!productsStore.allProducts || productsStore.allProducts.length === 0)) {
        try {
            const result = await productsStore.fetchAllProducts()
            if (result.data?.success) {
                productsStore.setAllProducts(result.data?.data || [])
            }
        } catch {
            notifyWarn('Error al cargar productos. Inténtalo de nuevo más tarde.')
            router.push('/')
        }
    }
})
</script>

<style lang="scss" scoped>
.product-details {
    padding: 6rem 6rem 6rem 6rem;
    margin: 0 auto;
    background-color: #f5f5f5;

    @media (max-width: 768px) {
        padding: 2rem 1rem;
    }
}

.product-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    background-position: top center;

    @media (max-width: 768px) {
        height: 300px;
    }
}
</style>
