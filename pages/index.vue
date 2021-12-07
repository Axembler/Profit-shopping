<template>
	  <div class="main-index">
			<div :class="['top-index', {'item-fourth': items.length !== 2}]">
				  <div class="item" v-for="(item, index) in items" :key="item.id">
						<span class="item-label">
							  {{index + 1}}
						</span>
						<div class="amounts">
							  <div class="amount-padding">
									<label>Volume</label>
									<input v-model="item.volume" placeholder="liters" min="0.1" step="0.1" type="number" required />
							  </div>
							  <div>
									<label>Price</label>
									<input v-model="item.price" placeholder="rubles" min="1" step="5" type="number" required />
							  </div>
						</div>
						<img class="remove-button" src="~/static/images/close.png" @click="remove(index), division()" v-if="items.length > 2">
				  </div>
				  <button class="add" @click="add()" v-if="items.length < 4" key="beliberda">
						ADD
				  </button> 
			</div>
			<div class="bottom-index">
				  <button class="calc-button" @click="division()">CALCULATE</button>
				  <label class="button-label-first">profit</label>
				  <div :class="['top-index', {'item-fourth': items.length !== 2}]">
						<label :class="['button-label-second', {'colorRed': profit === 0},
						{'colorLightGreen': profit > 0 && profit < 25},
						{'colorGreen': profit >= 25},
						{'colorDarkGreen': profit >= 50},
						{'colorViolet': profit >= 90}]"
						v-for="(profit, index) in profits" :key="index">
							  {{profits[index]}}%
							  <span class="colorRed" v-if="profit === 0">*</span>
						</label>
				  </div>
			</div>
	  </div>
</template>

<script>
export default {
	data() {
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
				  let no = false
				  let result = 1
				  for (let n = 0; n < this.items.length; n++) {
						if (this.items[n].volume === null || this.items[n].price === null || this.items[n].volume === ''||
						this.items[n].price === '' || this.items[n].volume <= '0' || this.items[n].price <= '0') {
							  no = true
						}
				  }
				  if (!no) {
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

<style lang="sass" scoped>
* 
	color: white
	  
.main-index 
	display: flex 
	flex-direction: column 
	min-height: calc(100vh - 8vh - 12vh)

.top-index 
	display: grid 
	gap: 20px 
	grid-template-columns: repeat(3, 1fr) 
	width: 100% 
	&.item-fourth 
		grid-template-columns: repeat(4, 1fr)

.item 
	display: flex 
	position: relative 
	flex-direction: column 
	width: 100% 
	height: 100% 
	background: rgba(255, 255, 255, .05) 
	padding: 30px

.add 
	display: flex 
	align-items: center 
	justify-content: center 
	border: 0 
	font-family: Vidaloka 
	font-size: 100px 
	opacity: .13 
	background: url("~/static/images/bg-button-add.png") 
	background-size: 10px 
	&:hover 
		opacity: .4

.item-label 
	font-family: Vidaloka 
	color: #FFFFFF38 
	font-size: 100px 
	line-height: 100px

.amounts 
	display: flex 
	flex-direction: column 
	align-items: center 
	padding-bottom: 20px 
	label 
		font-size: 16px 
		font-weight: 300 
		letter-spacing: .05em 
		padding-bottom: 5px 
	& > div 
		display: flex 
		flex-direction: column

.amount-padding 
	padding-bottom: 16px

input 
	width: 140px 
	height: 40px 
	font-size: 18px 
	text-align: center 
	border: 0 
	border-bottom: 1px solid white 
	background: rgba(255, 255, 255, .1) 
	&:focus 
		color: #5de63b

.remove-button 
	display: flex 
	position: absolute 
	top: 20px 
	right: 20px 
	cursor: pointer 
	opacity: 0.55 
	width: 36px

.calc-button 
	width: 250px 
	height: 60px 
	color: #1D1128 
	background: rgba(104, 101, 247, 0.75) 
	border: 0 
	font-size: 26px 
	text-align: center 
	font-weight: 500 
	font-family: Montserrat 
	letter-spacing: .1em

.colorRed 
	color: #cc334d 
	text-shadow: 0 0 50px #cc334d

.colorGreen 
	color: #1da74b 
	text-shadow: 0 0 50px #1da74b

.colorLightGreen 
	color: #2aa762 
	text-shadow: 0 0 50px #2aa762

.colorDarkGreen 
	color: #00CC66 
	text-shadow: 0 0 50px #00CC66

.colorViolet 
	color: #9900FF 
	text-shadow: 0 0 50px #9900FF

.bottom-index 
	display: flex 
	flex-direction: column 
	height: 30% 
	padding-top: 10px 
	width: 100% 
	align-items: center 
	& > button 
		margin-top: 15px 
		margin-bottom: 40px

.button-label-first
	font-size: 24px 
	padding-top: 20px 
	font-weight: 300 
	letter-spacing: .1em 

.button-label-second
	display: flex 
	justify-content: center 
	align-items: center 
	width: 100% 
	letter-spacing: .1em 
	font-family: Vidaloka 
	font-size: 100px

@media (max-width: 768px) 
	.top-index
		grid-template-columns: unset 
</style>