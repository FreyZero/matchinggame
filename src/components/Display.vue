<template>
    <div>
        <div class="col-sm-12" >
            <app-card v-for="(card,index) in cardList" :key="index" :isShow="isFacing" ref="childCard">
                <img id="card" :src="getImgUrl(card.realImg)" @click="flipCard(index)" >
            </app-card>
        </div>
        <div>
            {{text}}
        </div>
        <button class="btn btn-danger" @click="newGame"> 
            New Game
        </button>
        <button class="btn btn-info" @click="flipBackAll">
            Flip All
        </button>
        <button class="btn btn-warning" @click="callToChild">
            Call Child
        </button>
    </div>
</template>

<script>
import Card from './Card.vue'
import ConsoleBar from './Console.vue'

const BACK_CARD = "backcard"

export default {
    components: {
        appCard: Card,
        appConsole :  ConsoleBar
    },
    data: function () {
        return{
            text : "Original",
            // cardObject : {              ***can't use object template for push to array because object will refer the same reference (chage one wil change all other)
            //     currentImg : "backcard", ****When you add the object to the array, it's only a reference to the object that is added.
            //     realImg : "kaede1",
            //     status : 0
            // },
            cardList : [],
            imgList : ['kaede1','kaede2','kaede3','kaede4','kaede5','kaede6','kaede7','kaede8','kaede9','kaede10'],
            selectingState : {
                firstCard :{
                    position : 0,
                    cardImg : 'kaede0'
                },
                secondCard :{
                    position : 0,
                    cardImg : 'kaede0'
                },
                faceupCard : 0
            },
            score : 0,
            times : 0,
            isFacing : false
        }
    },
    methods:{
      flipCard: function (index) {
          this.text = (this.text == "Original" ? "chg" : "Original")
          if (this.cardList[index].status == 0) {
            this.cardList[index].currentImg = this.cardList[index].realImg
            this.cardList[index].status = 1
          } else if (this.cardList[index].status == 1) {
            this.cardList[index].currentImg = "backcard"
            this.cardList[index].status = 0
          }
        //   console.log(index)
        //   console.log(this.cardList)
        },
        newGame() {
            this.flipBackAll()
            this.isFacing = true
            this.selectingState.faceupCard = 0
            let imgRand = ['kaede1','kaede2','kaede3','kaede4','kaede5','kaede6','kaede7','kaede8','kaede9','kaede10']
            let position = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
            let randNum = 0
            let randPosition = 0
            for (let i = 0; i < 8; i++) {
                randNum = Math.floor(Math.random() * 10)
                while(imgRand[randNum] == "kaede0"){
                    randNum = Math.floor(Math.random() * 10)
                }
                for (let j = 0; j < 2; j++) {
                    randPosition = Math.floor(Math.random() * 16)
                    while(position[randPosition] == -1) {
                        randPosition = Math.floor(Math.random() * 16)
                    }
                    this.cardList[randPosition].realImg = imgRand[randNum]
                    position[randPosition] = -1
                }
                imgRand[randNum] = "kaede0"
            }
            // console.log('NEW GAME')
        },
        getImgUrl(img) {
          var images = require.context('../assets/images', false, /\.jpg$/)
          return images('./' + img + ".jpg")
        },
        initImg() {
            return (this.imgList[Math.floor(Math.random() * 10)])
        },
        flipBackAll() {
            this.cardList.forEach(card => {
                card.currentImg = "backcard"
                card.status = 0
            });
        },
        callToChild() {
            this.$refs.childCard[0].flipBack()
            console.log(this.$refs.childCard[0])
        }
    },
    beforeMount: function () {
        for (let index = 0; index < 16; index++) {
            this.cardList.push({
                currentImg : "backcard",
                realImg : this.initImg(),
                status : 0
            })
        }
        console.log(this.cardList)
    }

}
</script>

<style >
    @media screen and (min-width: 250px){
        #card{
            height: 200px;
            width: auto;
        }  
    }
    @media screen and (min-width: 768px){
        #card{
            height: 180px;
            width: auto;
        }  
    }
    @media screen and (min-width: 1200px){
        #card{
            height: 140px;
            width: auto;
        }  
    }
    @media screen and (min-width: 1600px){
        #card{
            height: 200px;
            width: auto;
        }  
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0
    }
</style>

