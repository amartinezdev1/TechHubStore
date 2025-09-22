<template>
    <main>
        <section class="main-content column items-start q-gutter-y-sm">
            <div class="hero-title text-weight-bold">Welcome to the Home Page</div>
            <div class="hero-subtitle text-weight-bold">This is a sample home page content.</div>
            <q-btn no-caps label="Learn More" color="primary" class="hero-button" />
        </section>
    </main>
    <ProductsCategory :title="'Star Wars'" :products="starWars" />
    <ProductsCategory :title="'Consolas'" :products="consolas" />
    <ProductsCategory :title="'Diversos'" :products="diversos" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useProductsStore } from 'src/stores/products'
import ProductsCategory from 'src/components/ProductsCategory.vue'

const productsStore = useProductsStore()
const starWars = ref([])
const consolas = ref([])
const diversos = ref([])

onMounted(async () => {
    const result = await productsStore.fetchAllProducts()
    if (result.data?.success) {
        const allProducts = result.data?.data
        productsStore.setAllProducts(allProducts)
        consolas.value = allProducts.filter((product) => product.category.includes('console'))
        starWars.value = allProducts.filter((product) => product.category.includes('starwars'))
        diversos.value = allProducts.filter((product) => product.category.includes('other'))
    }
})
</script>

<style lang="scss" scoped>
.main-content {
    color: white;
    padding: 3rem 1rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: linear-gradient(#00000000, #000000cc), url('../assets/Hero.jpeg');
    min-height: 400px;
    justify-content: center;

    @media (min-width: 600px) {
        padding: 4rem 2rem;
        min-height: 500px;
    }

    @media (min-width: 1024px) {
        padding: 6rem 4rem;
        min-height: 600px;
    }

    @media (min-width: 1200px) {
        padding: 6rem;
        min-height: 600px;
    }
}

.hero-title {
    font-size: 1.75rem;
    line-height: 1.2;

    @media (min-width: 600px) {
        font-size: 2.25rem;
    }

    @media (min-width: 1024px) {
        font-size: 3rem;
    }
}

.hero-subtitle {
    font-size: 1rem;
    opacity: 0.9;

    @media (min-width: 600px) {
        font-size: 1.125rem;
    }

    @media (min-width: 1024px) {
        font-size: 1.25rem;
    }
}

.hero-button {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;

    @media (min-width: 600px) {
        padding: 0.875rem 2rem;
        font-size: 1rem;
    }

    @media (min-width: 1024px) {
        padding: 1rem 3rem;
        font-size: 1rem;
    }
}
</style>
