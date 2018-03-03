<template>
  <div>
      <h3>Gallery</h3>
      <button @click="$refs.fileInput.click()" class="btn btn-info">Upload New Image</button>
      <input ref='fileInput' type="file">
      <img src="https://firebasestorage.googleapis.com/v0/b/ratchaponproject.appspot.com/o/renamed-jan.jpg?alt=media&token=c37bafd2-8897-4aa1-9e1b-252b3f279bf2" alt="">
  </div>
</template>

<script>
export default {
  
}
</script>
 <style scoped>
    h3{
        font-family: "Arizonia", cursive;
    }
 </style>
 