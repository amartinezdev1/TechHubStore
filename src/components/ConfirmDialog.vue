<template>
    <q-dialog persistent>
        <q-card>
            <q-card-section class="row items-center justify-between">
                <div class="text-h5"><b>Atencion: </b>Estas a punto de eliminar este producto.</div>
            </q-card-section>

            <q-card-section>
                <span class="text-h6">¿Está seguro que desea continuar?</span></q-card-section
            >

            <br />
            <q-separator />

            <q-card-actions align="right">
                <q-btn
                    label="Cancelar"
                    size="lg"
                    color="negative"
                    unelevated
                    @click="cancelar"
                    class="text-body1"
                    v-close-popup
                />
                <q-btn
                    label="Eliminar"
                    size="lg"
                    color="primary"
                    unelevated
                    @click="confirmar"
                    class="text-body1"
                    v-close-popup
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
const emits = defineEmits(['confirm'])

function confirmar() {
    emits('confirm')
}

function cancelar() {
    emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped></style>
