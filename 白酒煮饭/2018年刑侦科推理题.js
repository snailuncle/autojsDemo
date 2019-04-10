var abcd=[0,0,0,0,0,0,0,0,0,0];
console.show();
threads.start(function (){
  while(true){
   log(abcd.join(""));  
   sleep(500);     
};
})

while(true){
abcd[0]+=1;
for(var i=0;i<abcd.length;i++){
if(abcd[i]>3){abcd[i]=0;abcd[i+1]+=1;}
}

if(!(abcd[0]==abcd[0])){continue;}
if(!((abcd[4]+2)%4==abcd[1])){continue;}
if(!((abcd[2]==abcd[5]&&abcd[5]==abcd[1]&&abcd[2]==3)||(abcd[2]==abcd[5]&&abcd[5]==abcd[3]&&abcd[2]==2)||(abcd[2]==abcd[1]&&abcd[1]==abcd[3]&&abcd[2]==1)||(abcd[5]==abcd[1]&&abcd[1]==abcd[3]&&abcd[2]==0))){continue;}
if(!((abcd[0]==abcd[4]&&abcd[3]==0)||(abcd[1]==abcd[6]&&abcd[3]==1)||(abcd[0]==abcd[8]&&abcd[3]==2)||(abcd[5]==abcd[9]&&abcd[3]==3))){continue;}
if(!(abcd[7]==0||abcd[3]==1||abcd[8]==2||abcd[6]==3)){continue;}
if(!((abcd[1]==abcd[3]&&abcd[3]==abcd[7]&&abcd[5]==0)||(abcd[0]==abcd[5]&&abcd[5]==abcd[7]&&abcd[5]==1)||(abcd[2]==abcd[9]&&abcd[9]==abcd[7]&&abcd[5]==2)||(abcd[4]==abcd[8]&&abcd[8]==abcd[7]&&abcd[5]==3))){continue;}

var A=0,B=0,C=0,D=0;
for(i in abcd){
if(abcd[i]==0){A++};
if(abcd[i]==1){B++};
if(abcd[i]==2){C++};
if(abcd[i]==3){D++};
};
var max=[A,0],min=[A,0];
switch(true){
case (max[0]<B):
max[0]=B;max[1]=1;
case (max[0]<C):
max[0]=C;max[1]=2;
case (max[0]<D):
max[0]=D;max[1]=3;
};
switch(true){
case (min[0]>B):
min[0]=B;min[1]=1;
case (min[0]>C):
min[0]=C;min[1]=2;
case (min[0]>D):
min[0]=D;min[1]=3;
}

if(!((min[1]==2&&abcd[6]==0)||(min[1]==1&&abcd[6]==1)||(min[1]==0&&abcd[6]==2)||(min[1]==3&&abcd[6]==3))){continue;}
if(!((Math.abs(abcd[0]-abcd[6])!=1&&abcd[7]==0)||(Math.abs(abcd[0]-abcd[4])!=1&&abcd[7]==1)||(Math.abs(abcd[0]-abcd[1])!=1&&abcd[7]==2)||(Math.abs(abcd[0]-abcd[9])!=1&&abcd[7]==3))){continue;}
if(!
(
(
abcd[0]==abcd[5]&&(
(abcd[4]!=abcd[5]&&abcd[8]==0)||
(abcd[4]!=abcd[9]&&abcd[8]==1)||
(abcd[4]!=abcd[1]&&abcd[8]==2)||
(abcd[4]!=abcd[8]&&abcd[8]==3))
)||(
abcd[0]!=abcd[5]&&(
(abcd[4]==abcd[5]&&abcd[8]==0)||(abcd[4]==abcd[9]&&abcd[8]==1)||(abcd[4]==abcd[1]&&abcd[8]==2)||(abcd[4]==abcd[8]&&abcd[8]==3))
)

)
){continue;}
if(!((Math.abs(max[0]-min[0])==3&&abcd[9]==0)||(Math.abs(max[0]-min[0])==2&&abcd[9]==1)||(Math.abs(max[0]-min[0])==4&&abcd[9]==2)||(Math.abs(max[0]-min[0])==1&&abcd[9]==3))){continue;}
log(abcd);
break;
}
exit();