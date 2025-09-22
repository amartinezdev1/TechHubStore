<template>
    <main class="administrator">
        <div class="text-h4 text-weight-bold text-center q-mb-md">Agregar nuevo producto</div>
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
                    label="Agregar producto"
                    color="primary"
                    class="full-width q-py-md text-body1"
                    @click.prevent="addNewProduct()"
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
import { slugify } from 'src/helpers/slugify'

const router = useRouter()
const productsStore = useProductsStore()

const urlImage = ref('')
const category = ref('')
const productName = ref('')
const price = ref('')
const description = ref('')

async function addNewProduct() {
    const result = await productsStore.addNewProduct({
        name: productName.value,
        price: price.value,
        description: description.value,
        category: [category.value],
        image: urlImage.value,
    })
    console.log('result', result)
    if (result.data?.success) {
        const newProduct = result.data?.data
        productsStore.setProduct(newProduct)
        productsStore.allProducts.push(newProduct)
        const slug = slugify(newProduct.name || '')
        router.push({ name: 'product-detail', params: { slug } })
    } else {
        notifyWarn('Error al agregar el producto. Inténtalo de nuevo.')
    }
}
</script>

<style lang="scss" scoped>
.administrator {
    padding: 4rem 0;
    background-color: #f5f5f5;
}
</style>
