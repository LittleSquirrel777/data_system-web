<template>
    <div></div> <!-- 空模板 -->
</template>

<script>
export default {
  // mounted() {
  //   window.location.replace('http://ja2108:3000');
  // }
  mounted() {
    const link = document.createElement('a');
    link.href = 'http://ja2108:3000';
    link.target = '_blank';
    link.click();
    window.location.replace('/');
  }
};
</script>