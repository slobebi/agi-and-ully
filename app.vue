<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />

  </div>
  <Analytics />
  <NuxtPage />
</template>
