<template>
  <div class="col-xs-6 col-md-3">
    <div>
        <div class="card text-center" @click="filpImg()">
            <transition  name="flip" mode="out-in">
                <div v-if="showing" key="front">
                    <slot></slot>
                </div>
                <img id="card" key="back" v-else src="../assets/Images/backcard.jpg">
            </transition>
        </div>
    </div>
    <button class="btn btn-danger" @click="filpImg()">{{isShow}}</button>
  </div>
</template>

<script>
    export default {
        data: function () {
            return {
                showing : false
            }
        },
        props : ['isShow'],
        methods :{
            filpImg() {
                this.showing = !this.showing
                console.log(this.isShow)
            }
        }
    }
</script>

<style scoped>
    .card {
        cursor: pointer;
        border-color: #ddd;
        padding: 5px;
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
        transform: scaleY(0) translateZ(0);
        opacity: 0;
    }
</style>