new Vue({
	el:'#app',
	data:{
		playerHealth:100,
		monsterHealth:100,
		gameIsRunning: false,
		turns: []
	},
	methods:{
		startNewGame:function(){
			this.gameIsRunning=true;
			this.playerHealth=100;
			this.monsterHealth=100;
			turns: [];
		},

		attack:function(){

			if(this.checkPlayerOptions()){
				return;
			}
			
			//電腦:
			 damage=this.inputDamage(4,10);
             this.monsterHealth-=damage;
             this.turns.unshift({
                 isPlayer: true,
                 textLog:'你對怪物造成 '+damage
             });

            //玩家:
			 
             this.monsterAttack();
		},

		specialAttack:function(){

			if(this.checkPlayerOptions()){
				return;
			}
			
			//電腦承受的傷害:
			 damage=this.inputDamage(10,20);
             this.monsterHealth-=damage;
              this.turns.unshift({
                 isPlayer: true,
                 textLog:'你對怪物造成 '+damage
             });

            //玩家承受的傷害:
			 
             this.monsterAttack();
		},

		heal:function(){

				//玩家:
			if(this.playerHealth>80){
				alert("你的血量大於80,無法進行恢復!");
				return false;
			} else if(this.playerHealth<=70){
				this.playerHealth+=10;
			} else{
				this.playerHealth=80;
			}
			this.turns.unshift({
				isPlayer: true,
				textLog:'你恢復了10血量'
			});

			//電腦:
            this.monsterAttack();
		
		},

		giveUp:function(){
			this.gameIsRunning=false;
			this.turns=[];
			this.playerHealth=100;
			this.monsterHealth=100;
			alert("你輸了!");

		},

		monsterAttack:function(){
			damage=this.inputDamage(5,12);
			this.playerHealth-=damage;
			     this.turns.unshift({
                 isPlayer: false,
                 textLog:'怪物對你造成 '+damage
             });
            this.checkPlayerOptions();
		},

		inputDamage:function(minDamage,maxDamage){
			return Math.max(Math.floor(Math.random()*maxDamage)+1,minDamage);
		},

		checkPlayerOptions:function(){
			if(this.monsterHealth<=0){
				if(confirm('你贏了,新遊戲?')){
					this.startNewGame();
					this.turns=[];
				}else{
					this.gameIsRunning=false;
				}
				return true;
			} else if(this.playerHealth<=0){
                 if(confirm('你輸了,新遊戲?')){
					this.startNewGame();
					this.turns=[];
				}else{
					this.gameIsRunning=false;
				}
				return true;

			}
		}

	}
});