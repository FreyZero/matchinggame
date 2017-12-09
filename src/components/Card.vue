<template>
  <div class="col-xs-6 col-md-3">
    <div>
        <div class="card text-center" @click="flipImg()">
            <transition  name="flip" mode="out-in">
                <div v-if="showing" key="front">
                    <slot></slot>
                </div>
                <img id="card" key="back" v-else src="../assets/Images/backcard.jpg">
            </transition>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        data: function () {
            return {
                showing : this.isShow
            }
        },
        props : ['isShow'],
        methods :{
            flipImg() {
                this.showing = !this.showing
                console.log(this.isShow)
            },
            flipBack() {
                this.showing = false
                console.log(this.showing)
            }
        }
    }
</script>

<style scoped>
    .card {
        cursor: pointer;
        border-color: #ddd;
        padding: 5px;
        /* pointer-events: none; */
    }
    
    .card:hover {
        background-color: #ffe2e2;
    }
    .flip-enter-active {
        transition: all .2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    }

    .flip-leave-active {
        transition: all .25s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
    }

    .flip-enter, .flip-leave-to {
        transform: scaleX(0) translateZ(0);
        opacity: 0;
    }
</style>