<template>
    <section class="products-similar">
        <div class="row">
            <div class="text-h3">Productos similares</div>
        </div>
        <div>
            <q-carousel
                v-model="slide"
                transition-prev="slide-right"
                transition-next="slide-left"
                swipeable
                animated
                arrows
                height="350px"
                style="background-color: #f5f5f5"
            >
                <q-carousel-slide :name="1" class="column">
                    <div
                        class="row fit justify-start items-center q-gutter-lg q-col-gutter no-wrap"
                    >
                        <ProductsPreview
                            v-for="product in allProducts"
                            :key="product.id"
                            :product="product"
                            style="background-color: #f5f5f5; min-width: 200px"
                            @click="goToProduct(product)"
                            class="product-item"
                        />
                    </div>
                </q-carousel-slide>
            </q-carousel>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { slugify } from 'src/helpers/slugify'
import { useProductsStore } from 'src/stores/products'
import ProductsPreview from './ProductsPreview.vue'

const router = useRouter()
const slide = ref(1)
const productsStore = useProductsStore()
const allProducts = ref([])

function goToProduct(product) {
    productsStore.setProduct(product)
    const slug = slugify(product.name || '')
    router.push({ name: 'product-detail', params: { slug } })
}

onMounted(() => {
    allProducts.value = productsStore.allProducts || []
})
</script>

<style lang="scss" scoped>
.products-similar {
    padding: 0 6rem 4rem 6rem;
    background-color: #f5f5f5;

    @media (max-width: 768px) {
        padding: 2rem 1rem;

        .text-h3 {
            font-size: 2.5rem;
            padding: 0 1rem;
        }
    }
}

.products-lists {
    flex-wrap: wrap;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        gap: 1rem !important;
    }

    @media (min-width: 601px) and (max-width: 1023px) {
        justify-content: space-around;
    }

    @media (min-width: 1024px) {
        justify-content: space-between;
    }
}

.product-item {
    @media (max-width: 600px) {
        width: 100%;
        max-width: 300px;
    }
}
</style>
