<template>
  <div class="col-xs-6 col-md-3">
    <div>
        <div class="card text-center" :style="statusColor">
            <transition  name="flip" mode="out-in">
                <div v-if="showing" key="front">
                    <slot></slot>
                </div>
                <div v-else key="back">
                    <slot></slot>
                </div>
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
        props : ['isShow','status'],
        methods :{
            flipImg() {
                this.showing = !this.showing
                // console.log(this.isShow)
            },
            flipBack() {
                this.showing = false
                // console.log(this.showing)
            }
        },
        computed :{
            statusColor() {
                if (this.status == 0){
                    this.showing = false
                    return {filter: "drop-shadow(0px 0px 10px #00cc66)"}
                } else if (this.status == 1){
                    this.showing = true
                    return {filter: "drop-shadow(0px 0px 10px #ffff80)", "pointer-events": "none"}
                } else {
                    this.showing = true
                    return {filter: "drop-shadow(0px 0px 10px #ff6666)", "pointer-events": "none"}
                }
                
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
        /* filter: drop-shadow(0px 0px 10px #00cc66); */
        border-radius: 7px;
        margin-bottom: 10px;
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