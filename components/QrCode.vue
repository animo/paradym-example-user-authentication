<script>
import QrcodeVue from 'qrcode.vue'

export default {
  components: {
    QrcodeVue,
  },
  data() {
    return {
      value: 'https://example.com',
      size: 196,
    }
  },
}
</script>

<template>
  <qrcode-vue
    :value="value"
    :size="size"
    level="H"
  />
</template>
