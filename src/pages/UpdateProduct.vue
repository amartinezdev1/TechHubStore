<template>
    <main class="update-product">
        <div class="text-h4 text-weight-bold text-center q-mb-md">Actualizar producto</div>
        <div class="q-pa-md" style="max-width: 600px; margin: auto">
            <q-form class="column q-gutter-sm">
                <q-input
                    outlined
                    v-model="urlImage"
                    label="URL de la imagen"
                    placeholder="https://example.com/image.jpg"
                    class="q-mb-md"
                    bg-color="white"
                    :rules="[
                        (val) => (val && val.length > 0) || 'La URL de la imagen es requerida',
                    ]"
                />
                <q-select
                    outlined
                    v-model="category"
                    label="Categoria"
                    class="q-mb-md"
                    bg-color="white"
                    :options="['console', 'other', 'starwars']"
                    :rules="[(val) => (val && val.length > 0) || 'La categoría es requerida']"
                />
                <q-input
                    outlined
                    v-model="productName"
                    label="Nombre del producto"
                    class="q-mb-md"
                    bg-color="white"
                    :rules="[
                        (val) => (val && val.length > 0) || 'El nombre del producto es requerido',
                    ]"
                />
                <q-input
                    outlined
                    v-model="price"
                    label="Precio del producto"
                    class="q-mb-md"
                    bg-color="white"
                    :rules="[(val) => (val && val.length > 0) || 'El precio debe ser mayor a 0']"
                />
                <q-input
                    outlined
                    v-model="description"
                    label="Descripción del producto"
                    class="q-mb-md"
                    bg-color="white"
                    type="textarea"
                    :rules="[(val) => (val && val.length > 0) || 'La descripción es requerida']"
                />
                <q-btn
                    no-caps
                    label="Actualizar producto"
                    color="primary"
                    class="full-width q-py-md text-body1"
                    @click.prevent="updateProduct()"
                />
            </q-form>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from 'src/stores/products'
import { notifyWarn } from 'src/helpers/NotifyHelpers'

const router = useRouter()
const productsStore = useProductsStore()
const product = productsStore.product

const urlImage = ref(product?.image || '')
const category = ref(product?.category[0] || '')
const productName = ref(product?.name || '')
const price = ref(product?.price || '')
const description = ref(product?.description || '')

async function updateProduct() {
    const result = await productsStore.updateProduct({
        id: product.id,
        name: productName.value,
        price: price.value,
        description: description.value,
        category: [category.value],
        image: urlImage.value,
    })
    console.log('result', result)
    if (result.data?.success) {
        router.push('/all-products')
    } else {
        notifyWarn('Error al actualizar el producto. Inténtalo de nuevo.')
    }
}
</script>

<style lang="scss" scoped>
.update-product {
    padding: 4rem 0;
    background-color: #f5f5f5;
}
</style>
