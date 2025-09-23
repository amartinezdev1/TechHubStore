<template>
    <main class="all-products" :class="wrapperClass">
        <div class="product-header q-mb-lg">
            <div class="text-h3 text-weight-bold col-8">Todos los productos</div>
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
                        <q-img :src="product.image" no-native-menu class="product-image">
                            <q-icon
                                class="absolute all-pointer-events"
                                size="32px"
                                name="delete"
                                color="white"
                                style="top: 8px; right: 8px; cursor: pointer"
                                @click="openDeleteDialog(product)"
                            >
                            </q-icon>
                            <q-icon
                                class="absolute all-pointer-events"
                                size="32px"
                                name="edit"
                                color="white"
                                style="top: 8px; right: 42px; cursor: pointer"
                                @click="updateProduct(product)"
                            >
                            </q-icon>
                        </q-img>
                        <span class="text-body1">{{ product.name }}</span>
                        <span class="text-body1 text-weight-bold">{{ product.price }}</span>
                        <span
                            class="text-body1 text-weight-bold text-primary"
                            style="cursor: pointer"
                            @click="goToProduct(product)"
                            >Ver producto</span
                        >
                    </q-card>
                </div>
            </div>
        </div>
    </main>
    <ConfirmDialog v-model="showDeleteDialog" @confirm="confirmDelete" />
</template>

<script setup>
import { useProductsStore } from 'src/stores/products'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { slugify } from 'src/helpers/slugify'
import { notifyWarn } from 'src/helpers/NotifyHelpers'
import ConfirmDialog from 'src/components/ConfirmDialog.vue'

const showDeleteDialog = ref(false)
const productToDelete = ref(null)

function openDeleteDialog(product) {
    productToDelete.value = product
    showDeleteDialog.value = true
}

function confirmDelete() {
    if (productToDelete.value) {
        deleteProduct(productToDelete.value)
        productToDelete.value = null
    }
    showDeleteDialog.value = false
}

const $q = useQuasar()
const router = useRouter()
const productsStore = useProductsStore()
const isMobile = computed(() => $q.screen.width < 768)
const isTablet = computed(() => $q.screen.width >= 768 && $q.screen.width < 1024)
const isDesktop = computed(() => $q.screen.width >= 1024)

const wrapperClass = computed(() => ({
    mobile: isMobile.value,
    tablet: isTablet.value,
    desktop: isDesktop.value,
}))

const goToAddProduct = () => {
    router.push('/new-product')
}

const goToProduct = (product) => {
    productsStore.setProduct(product)
    const slug = slugify(product.name || '')
    router.push({ name: 'product-detail', params: { slug } })
}

const updateProduct = (product) => {
    productsStore.setProduct(product)
    const slug = slugify(product.name || '')
    router.push({ name: 'update-product', params: { slug } })
}

const deleteProduct = async (product) => {
    const result = await productsStore.deleteProduct(product)
    console.log(result)
    if (result.data?.success) {
        productsStore.allProducts = productsStore.allProducts.filter((p) => p.id !== product.id)
        allProducts.value = allProducts.value.filter((p) => p.id !== product.id)
    } else {
        notifyWarn('No se pudo eliminar el producto')
    }
}

const allProducts = ref([])
onMounted(async () => {
    const result = await productsStore.fetchAllProducts()
    if (result.data?.success) {
        allProducts.value = result.data?.data
        productsStore.setAllProducts(allProducts.value)
    }
})
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
