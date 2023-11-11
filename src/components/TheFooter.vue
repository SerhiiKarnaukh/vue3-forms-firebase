<template>
  <v-footer color="primary">
    <v-row justify="center" no-gutters>
      <v-btn color="white" variant="text" class="mx-2" rounded="xl" to="/">
        Home
      </v-btn>
      <v-btn
        color="white"
        variant="text"
        class="mx-2"
        rounded="xl"
        :href="remotedDjangoHost"
      >
        All Apps
      </v-btn>
      <v-btn
        color="white"
        variant="text"
        class="mx-2"
        rounded="xl"
        :href="remotedVueHost"
      >
        Vue Apps
      </v-btn>
      <div v-if="!$store.state.auth.token">
        <v-btn
          v-for="link in links"
          :key="`${link.label}-footer-link`"
          color="white"
          variant="text"
          class="mx-2"
          rounded="xl"
          :to="link.url"
        >
          {{ link.label }}
        </v-btn>
      </div>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Games Store</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        label: 'Signup',
        url: '/signup',
      },
      {
        label: 'Login',
        url: '/login',
      },
    ],
    remotedDjangoHost: import.meta.env.VITE_REMOTE_DJANGO_HOST,
    remotedVueHost: import.meta.env.VITE_REMOTE_VUE_HOST,
  }),
}
</script>

<style lang="scss" scoped></style>
