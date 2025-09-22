<template>
    <q-card class="my-card column q-gutter-y-sm" flat style="width: 200px">
        <img :src="props.product.image" class="product-image" />
        <span class="text-body1">{{ props.product.name }}</span>
        <span class="text-body1 text-weight-bold">{{ props.product.price }}</span>
        <span
            class="text-body1 text-weight-bold text-primary"
            style="cursor: pointer"
            @click="goToProduct"
            >Ver producto</span
        >
    </q-card>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useProductsStore } from 'src/stores/products'
import { slugify } from 'src/helpers/slugify'

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
})

const router = useRouter()
const productsStore = useProductsStore()

const goToProduct = () => {
    productsStore.setProduct(props.product)
    const slug = slugify(props.product.name || '')
    router.push({ name: 'product-detail', params: { slug } })
}
</script>

<style lang="scss" scoped>
.product-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    display: block;
    margin: 1rem auto;
}
</style>
