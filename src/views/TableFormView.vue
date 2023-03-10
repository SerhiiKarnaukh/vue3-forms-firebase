<template>
  <v-main class="px-4 pb-4">
    <v-card
      max-width="400"
      class="mx-auto"
    > <v-card-title class="mb-6">
        <h2 class="text-md-h3 font-weight-medium">Create table</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="tableHandler">
          <v-text-field
            v-model.trim="state.sizeX"
            label="Size-X"
            prepend-icon="mdi-alpha-x-box"
            placeholder="Enter number"
            :error-messages="v$.sizeX.$errors.map(e => e.$message)"
          ></v-text-field>

          <v-text-field
            v-model.trim="state.sizeY"
            label="Size-Y"
            placeholder="Enter  number"
            prepend-icon="mdi-alpha-y-circle"
            :error-messages="v$.sizeY.$errors.map(e => e.$message)"
          ></v-text-field>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              variant="flat"
              color="success"
              type="submit"
              :disabled="v$.$invalid"
            >
              Submit
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-main>
</template>

<script>
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { required, integer } from '@vuelidate/validators'
  import router from '@/router'
  import {useStore} from 'vuex'
    export default {
        setup () {
            const store = useStore()
            const state = reactive({
                sizeX: '',
                sizeY: '',
            })
            const rules = {
                sizeX: { required, integer },
                sizeY: { required,  integer},
            }

            const v$ = useVuelidate(rules, state)

            const tableHandler = async () => {
                const isFormCorrect = await v$._value.$validate()
                if (isFormCorrect) {
                    const formData = {
                        sizeX: state.sizeX,
                       sizeY: state.sizeY,
                    }
                    store.dispatch('table/createTable', formData)
                    router.push('/table')
                    return
                }
            };
        return { state, v$, tableHandler }
    },
  }
</script>

<style scoped>
</style>
