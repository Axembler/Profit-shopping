<template>
      <div class="main-index">
            <!-- <transition-group class="top-index" tag="div" name="fade" mode="in-out"> -->
            <div class="top-index">
                  <div class="item" v-for="(item, index) in items" :key="item.id">
                        <span class="item-label">
                              {{index + 1}}
                        </span>
                        <div class="amounts">
                              <div class="amount-padding">
                                    <label>Volume</label>
                                    <input v-model="item.volume" placeholder="liters" min="0" step="0.1" type="number" required />
                              </div>
                              <div>
                                    <label>Price</label>
                                    <input v-model="item.price" placeholder="rubles" min="0" step="5" type="number" required />
                              </div>
                        </div>
                        <button class="remove-button" @click="remove(index), division()" v-if="items.length > 2">
                              <img src="~/static/images/cancel.png">
                        </button>
                  </div>
                  <button class="add" @click="add()" v-if="items.length < 4" key="beliberda">
                        ADD
                  </button> 
            </div>
            <!-- </transition-group> -->
            <div class="bottom-index">
                  <button class="calc-button" @click="division()">CALCULATE</button>
                  <label class="button-label-first">profit</label>
                  <label class="button-label-second" v-for="(profit, index) in profits" :key="index">{{profits[index]}}%</label>
            </div>
      </div>
</template>

<script>
export default {
    data () {
        return {
            min: null,
            results: [],
            profits: [],
            items: [
                {   
                    id: 1,
                    volume: null,
                    price: null
                },
                {
                    id: 2,
                    volume: null,
                    price: null
                }
            ]
        }
    },
      methods: {
            division() {
                  this.results = []
                  this.profits = []
                  let result = 1
                  for (let i = 0; i < this.items.length; i++) {
                        result = this.items[i].volume
                        for (let j = 0; j < this.items.length; j++) {
                              let n = [i]
                              if (!n.includes(j)) {
                                    result *= this.items[j].price
                              }
                              n.push(j)
                        }
                        this.results.push(result)
                  }
                  this.min = this.results.reduce((acc, curr) => acc < curr ? acc : curr)
                  for (let c = 0; c < this.items.length; c++) {
                        this.profits.push(Math.round(100 * (this.results[c] / this.min) - 100))
                  }
            },
            add() {
                if(this.items.length < 4) {
                    this.items.push({
                        id: this.items.reduce((acc, curr) => acc.id > curr.id ? acc : curr).id + 1,
                        volume: null,
                        price: null
                    })
                }
            },
            remove(index) {
                this.items.splice(index, 1)
            }
      }
}
</script>

<style scoped>
* {
      color: white;
}
.main-index {
      display: flex;
      flex-direction: column;
}
.top-index {
      display: grid;
      gap: 20px;
      grid-template-columns: 1fr 1fr;
}
.item {
      display: flex;
      position: relative;
      flex-direction: column;
      width: 100%;
      background: rgba(255, 255, 255, .05);
      padding: 30px;
}
.add {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      font-family: Vidaloka;
      font-size: 100px;
      opacity: .13;
      /* transition: .3; */
      background: url("~/static/images/bg-button-add.png");
      background-size: 10px;
}
.add:hover {
      opacity: .4;
}
.item-label {
      font-family: Vidaloka;
      color: #FFFFFF38;
      font-size: 100px;
      line-height: 100px;
      padding-bottom: 30px;
}
.amounts {
      display: flex;
      flex-direction: column;
      padding: 0 0 30px 60px;
}
.amounts label {
      font-size: 16px;
      font-weight: 300;
      letter-spacing: .05em;
      padding-bottom: 5px;
}
.amounts > div {
    display: flex;
    flex-direction: column;
}
.amount-padding {
      padding-bottom: 16px;
}
input {
      width: 140px;
      height: 40px;
      font-size: 18px;
      text-align: center;
      border: 0;
      border-bottom: 1px solid white;
      background: rgba(255, 255, 255, .1);
}
input:focus {
      color: #5de63b;
}
.remove-button {
      display: flex;
      position: absolute;
      top: 20px;
      right: 20px;
      align-items: center;
      justify-content: center;
      opacity: .4;
      width: 25px;
      height: 25px;
      color: #1D1128;
      border: 0;
      padding: 0;
}
.remove-button > img {
      width: 18px;
}
.calc-button {
      width: 250px;
      height: 60px;
      color: #1D1128;
      background: #6590E2;
      border: 0;
      font-size: 26px;
      text-align: center;
      font-weight: 500;
      font-family: Montserrat;
      letter-spacing: .1em;
}
.colorRed{
      color: #cc334d;
	text-shadow: 0 0 50px #cc334d;
}
.colorGreen{
      color: #2aa762;
	text-shadow: 0 0 50px #2aa762;
}
.bottom-index {
      display: flex;
      flex-direction: column;
      height: 30%;
      padding-top: 10px;
      width: 100%;
      align-items: center;
}
.bottom-index > button {
      margin-top: 15px;
      margin-bottom: 40px;
}
.button-label-first {
      font-size: 24px;
      padding-top: 20px;
      font-weight: 300;
      letter-spacing: .1em;
}
.button-label-second {
      letter-spacing: .1em;
      font-family: Vidaloka;
      font-size: 100px;
}

@media screen and (max-width: 768px){
      .top-index {
            grid-template-columns: unset;
      }
}
</style>