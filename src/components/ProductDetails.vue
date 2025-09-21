<template>
    <section class="product-details">
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
</template>

<script setup>
import { useProductsStore } from 'src/stores/products'

const productsStore = useProductsStore()
const product = productsStore.product
console.log(product)
</script>

<style lang="scss" scoped>
.product-details {
    padding: 6rem;
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
