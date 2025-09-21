<template>
    <section class="products-category">
        <section class="title-category row justify-between q-mb-xs">
            <p class="text-h4 text-weight-bold">{{ props.title }}</p>
            <q-btn
                flat
                no-caps
                icon-right="arrow_forward"
                label="Ver todo"
                class="text-body1 text-primary text-weight-bold"
            />
        </section>
        <section class="products-lists row q-gutter-md">
            <ProductsPreview
                v-for="product in props.products.slice(0, 6)"
                :key="product.id"
                :product="product"
                class="product-item"
            />
        </section>
    </section>
</template>

<script setup>
import ProductsPreview from './ProductsPreview.vue'
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        required: true,
    },
})
</script>

<style lang="scss" scoped>
.products-category {
    margin: 2rem 1rem;

    @media (min-width: 768px) {
        margin: 2.5rem 2rem;
    }

    @media (min-width: 1024px) {
        margin: 3rem 4rem;
    }

    @media (min-width: 1200px) {
        margin: 3rem 6rem;
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
        justify-content: center;
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
