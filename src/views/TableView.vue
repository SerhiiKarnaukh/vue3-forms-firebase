<template>
  <v-main class="px-4 pb-4">
    <v-card
      max-width="400"
      class="mx-auto"
    > <v-card-title class="mb-6">
        <h2
          class="text-md-h3 mx-auto font-weight-medium"
          justify="center"
        >Table</h2>
      </v-card-title>
      <v-container class="bg-surface-variant">
        <v-row
          v-for="n in 3"
          :key="n"
          cols="12"
          sm="4"
          no-gutters
        >
          <v-col
            v-for="n in 3"
            :key="n"
            cols="12"
            sm="4"
          >
            <v-sheet class="ma-2 pa-2">
              One of three columns
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-main>
</template>

<script>
import {useStore} from 'vuex'
export default {
    setup () {
        const store = useStore()
        return {}
    }
}
</script>

<style scoped>
</style>
