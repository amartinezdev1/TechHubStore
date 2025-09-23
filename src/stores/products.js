import { defineStore } from "pinia";
import { Loading } from "quasar";
import { api } from "boot/axios";

export const useProductsStore = defineStore("products", {
    state: () => ({
        product: null,
        allProducts: [],
    }),
    getters: {},
    actions: {
        async fetchAllProducts() {
            Loading.show();
            try {
                const response = await api({
                    method: 'get',
                    url: 'https://api-pxhu.onrender.com/api/v1/products/allProducts',
                });
                return response
            } catch (error) {
                const response = { success: false, message: "", handled: false };
                if (error._handled) {
                    response.handled = true;
                }
                response.message = 'ERROR - ' + error;
                return response;
            } finally {
                Loading.hide();
            }
        },

        async fetchProductById(payload) {
            Loading.show();
            try {
                const response = await api({
                    method: 'get',
                    url: `https://api-pxhu.onrender.com/api/v1/products/getProduct/${payload.id}`
                })
                return response
            } catch (error) {
                const response = { success: false, message: "", handled: false };
                if (error._handled) {
                    response.handled = true;
                }
                response.message = 'ERROR - ' + error;
                return response;
            } finally {
                Loading.hide();
            }
        },

        async addNewProduct(payload) {
            Loading.show();
            try {
                const response = await api({
                    method: 'post',
                    url: 'https://api-pxhu.onrender.com/api/v1/products/addProduct',
                    data: payload
                });
                return response
            } catch (error) {
                const response = { success: false, message: "", handled: false };
                if (error._handled) {
                    response.handled = true;
                }
                response.message = 'ERROR - ' + error;
                return response;
            } finally {
                Loading.hide();
            }
        },

        async updateProduct(payload) {
            Loading.show();
            try {
                const response = await api({
                    method: 'put',
                    url: `https://api-pxhu.onrender.com/api/v1/products/updateProduct/${payload.id}`,
                    data: payload
                })
                return response
            } catch (error) {
                const response = { success: false, message: "", handled: false };
                if (error._handled) {
                    response.handled = true;
                }
                response.message = 'ERROR - ' + error;
                return response;
            } finally {
                Loading.hide()
            }
        },

        async deleteProduct(payload) {
            Loading.show();
            try {
                const response = await api({
                    method: 'delete',
                    url: `https://api-pxhu.onrender.com/api/v1/products/deleteProduct/${payload.id}`
                })
                return response
            } catch (error) {
                const response = { success: false, message: "", handled: false };
                if (error._handled) {
                    response.handled = true;
                }
                response.message = 'ERROR - ' + error;
                return response;
            } finally {
                Loading.hide();
            }
        },

        responseErrorHandler(response){
            if(response.success){
                if(!response.data){
                    return {
                        success: false,
                        message: 'Error desconocido en la comunicación con el servidor. <br>' + response.request.responseURL,
                        handled: false
                    }
                }
                return {success: true, data: response.data}
            } else return { success: false, message: response.data, handled: false}
        },

        setAllProducts(products){
            this.allProducts = products;
        },

        setProduct(product) {
            this.product = product;
        },

        clearAllProducts() {
            this.allProducts = [];
        },

        clearProduct() {
            this.product = null;
        }
    },
    persist: true
});
