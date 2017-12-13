<template>
    <div :style="parentUI">
        <div class="col-sm-12" >
            <div class="">
                <transition-group name="swap">
                    <app-card v-for="(card,index) in cardList" :key="card.id" :isShow="isFacing" :status="card.status" ref="childCard">
                        <img id="card" :src="getImgUrl(card.currentImg)" @click="flipCard(index)" >
                    </app-card>
                </transition-group>
            </div>  
        </div>
        <div class="text-center"> 
            <div class="btn-group">
                <button class="btn btn-danger" @click="newGame()"> 
                    New Game
                </button>
                <button class="btn btn-info" @click="shuffle()">
                    Swap All
                </button>
                <button class="btn btn-warning" @click="callToChild()">
                    Call Child
                </button>
            </div>
            <div class="btn-group">
                <span class="btn btn-default" >
                    Score : {{score}} / 8
                </span>
                <span class="btn btn-default" >
                    Times : 0
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import Card from './Card.vue'
import ConsoleBar from './Console.vue'
import _ from 'underscore'

const BACK_CARD = "backcard"

export default {
    components: {
        appCard: Card,
        appConsole :  ConsoleBar
    },
    data: function () {
        return{
            // cardObject : {              ***can't use object template for push to array because object will refer the same reference (chage one wil change all other)
            //     currentImg : "backcard", ****When you add the object to the array, it's only a reference to the object that is added.
            //     realImg : "kaede1",
            //     status : 0
            // },
            cardList : [],
            imgList : ['kaede1','kaede2','kaede3','kaede4','kaede5','kaede6','kaede7','kaede8','kaede9','kaede10'],
            selectingCard : {
                firstCard :{
                    position : -1,
                    cardImg : ''
                },
                secondCard :{
                    position : -1,
                    cardImg : ''
                },
                matchedCard : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
            },
            score : 0,
            times : 0,
            isFacing : false,
            parentUI : {}
        }
    },
    methods:{
        flipCard(index) {
        //   if (this.cardList[index].status == 0) {                                flip freely
        //     this.cardList[index].currentImg = this.cardList[index].realImg
        //     this.cardList[index].status = 1
        //   } else if (this.cardList[index].status == 1) {
        //     this.cardList[index].currentImg = "backcard"
        //     this.cardList[index].status = 0
        //   }
            if (this.times == 0) {
                this.times++                
                //manage display
                this.cardList[index].status = 1
                this.cardList[index].currentImg = this.cardList[index].realImg
                //manage state
                this.selectingCard.firstCard.position = index
                this.selectingCard.firstCard.cardImg = this.cardList[index].realImg
            } else if (this.times == 1) {
                this.parentUI = {"pointer-events": "none"}
                this.times++
                //manage display
                this.cardList[index].status = 1
                this.cardList[index].currentImg = this.cardList[index].realImg
                //manage state
                this.selectingCard.secondCard.position = index
                this.selectingCard.secondCard.cardImg = this.cardList[index].realImg
                // console.log(this.selectingCard.secondCard.cardImg)
                this.afterMatching()
                this.clearState()
            }
        },
        newGame() {
            this.callToChild()
            this.shuffle()
            this.loadPage()
            this.clearState()
            this.selectingCard.matchedCard = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
            this.score = 0
            
        },
        loadPage() {
            this.isFacing = false
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
        },
        getImgUrl(img) {
          var images = require.context('../assets/images', false, /\.jpg$/)
          return images('./' + img + ".jpg")
        },
        initImg() {
            return (this.imgList[Math.floor(Math.random() * 10)])
        },
        callToChild() {
            this.$refs.childCard.forEach(function(child, index) {
                child.flipBack()
            })
            this.cardList.forEach(function(card, index) {
                card.status = 0
                card.currentImg = BACK_CARD
            })
        },
        callToSpecificChild() {
            this.selectingCard.matchedCard.forEach((num,index) => {
                this.cardList[num].status = 0
                this.cardList[num].currentImg = BACK_CARD
                this.$refs.childCard[this.cardList[num].id].flipBack()  //when shuffle index of cardList is changed so childCard's index should refer to cardList
                console.log(num + '  AND  ' + index)
            })
            // console.log(this.$refs.childCard)
        },
        afterMatching() {
            let index1 = this.selectingCard.matchedCard.indexOf(this.selectingCard.firstCard.position)
            let index2 = 0
            console.log(this.selectingCard.matchedCard)
            if (this.selectingCard.firstCard.cardImg == this.selectingCard.secondCard.cardImg) {
                this.score++
                this.selectingCard.matchedCard.splice(index1,1)
                index2 = this.selectingCard.matchedCard.indexOf(this.selectingCard.secondCard.position)
                this.selectingCard.matchedCard.splice(index2,1)
                this.cardList[this.selectingCard.firstCard.position].status = 2
                this.cardList[this.selectingCard.secondCard.position].status = 2
            } else {
                setTimeout(()=>{
                    this.callToSpecificChild()
                    this.parentUI = {}
                }, 1300);
            }
            console.log(this.selectingCard.matchedCard)
        },
        clearState() {
            this.selectingCard.firstCard.cardImg = ''
            this.selectingCard.firstCard.position = -1
            this.selectingCard.secondCard.cardImg = ''
            this.selectingCard.secondCard.position = -1
            this.times = 0
        },
        shuffle() {
            this.cardList = _.shuffle(this.cardList)
        }
    },
    beforeMount: function () {
        for (let index = 0; index < 16; index++) {
            this.cardList.push({
                id : index,
                currentImg : "backcard",
                realImg : this.initImg(),
                status : 0
            })
        }
        this.loadPage()
        // console.log(this.cardList)
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
            height: 130px;
            width: auto;
        }  
    }
    @media screen and (min-width: 1600px){
        #card{
            height: 190px;
            width: auto;
        }  
    }
    img{
        border-radius: 10px;
    }
    .border{
        border-color: lightseagreen;
        border-style: solid;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0
    }
    .swap-move{
        transition: transform 1s;
    }
    
</style>

