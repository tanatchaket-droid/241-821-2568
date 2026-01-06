 /*console.log("Hello World");


//String
 let fname = "John";
//Number
 let age ="30";
 let height = "5.9";

 fname = "Alice";
 console.log("Name:",fname);

 fname="Bob";
 PI = 3.14159;
 console.log("Name:",fname);
 console.log("Age:",age);
 console.log("Height:",height);

let Number1 = 10;
let Number2 = 3;

let result1 = Number1+Number2;
console.log("ผลบวก =",result1);


let number1 = 10;
let number2 = 20;
let condition = number1 < number2;
console.log("condition:",condition);

let number1 = 3;
let number2 = 5;

let score = 80;

if(score >= 80){
    console.log('A');
}else if(score >= 70){
    console.log('B');
}else if(score >= 60){
    console.log('c');
}else if(score >= 50){
    console.log('D');
}else{
    console.log('F');
}

let number1 = 5;
let number2 = 10;
let condition1 = (number1 > 0) || (number2 > 0)
console.log("condition1:",condition1)

let number1 = 5
if(Number % 2 == 0){
    console.log("Even")
}

let conter = 0;
while(conter<=9){
    conter+=1;
    console.log("while:",conter);    
}
for(let i = 0; i <= 4; i = i + 1){
    console.log("for:",i);
}

let age1 = 25;
let age2 = 30;
let age3 = 35;
console.log(age1,age2,age3);

let ages = [25,30,35];
console.log(ages);
console.log(ages[1]);

//แทนที่ค่าในอาเรย์
ages = [40,45,50];
console.log(ages);

ages.push(55);
console.log(ages);

//ความยาวของอาเรย์
console.log(ages,length);

 //ลบสมาชิกตัวสุดท้าย
ages.pop();
console.log(ages);

if(ages.includes(45)){ //true
    console.log("พบ 45 ในอาเรย์") //พบ45ในอาเรย์
}
let numbers = [90,60,80,40,50];
numbers.sort();
console.log(numbers);

let names = ["John","Jane","Doe"];
names.push("smith");
console.log(names);
console.log(names,length);

for (let i = 0; i <= names.length;i++){
    console.log(names[i]);
}
    

let student = [{
    age:20,
    name:"Emma",
    grade:'A'
},{
    age:22,
    name:"Liam",
    grade:'B'
}];
console.log(student);
console.log(student.name);

for(let i = 0;i<student.length;i++){
    console.log("Student"+(i+1)+":")
    console.log("Name :"+student[i].name)
    console.log("Age :"+student[i].age)
    console.log("Grade :"+student[i].grade)
}
student.push({
    age:20,
    name:"Emma",
    grade:'A'
})

function caluculate_grade(score){
    if(score >= 80){
    grade = ('A');
     }else if(score >= 70){
        grade = ('B');
     }else if(score >= 60){
        grade =('c');
     }else if(score >= 50){
        grade = ('D');
     }else{
        grade = ('F');
     }
     return grade;
}
let student_score = 85;
let student_grade= caluculate_grade(student_score);
console.log("Student's grade is:"+student_grade);    

let score = [10,20,30,40,50];

for(let i = 0;i<score.length;i++){
    console.log(`Score at index ${i} is ${(score[i]}`);
}  
score = score.map(s) >= {
    return s * 2
})
}
score.forEach(s)=>{
    console.log('score',s)
})

let score = [10,20,30,40,50];

let newScore = []
 
for (let index = 0; index < score.length; index++){
    console.log('score',score[index])
    if (score[index]>=30){
        newScore.push(score[index])
    }
}
console.log('newScore :',newScore)

newScore.forEach((ns)=> {
    console.log('new score:',ns)
})

let score = [10,20,30,40,50];

for (let index = 0; index < score.length; index++){
    console.log('score',score[index])
}
let newScore = score.filter((s) => {
   return s >= 30
})
newScore.forEach((ns)=> {
    console.log('new score:',ns)
})

let students =[
    {
        name:'aa',
        score:'50',
        grade:'a'
    {,
    }
        name:'bb',
        score: '60',
        grade:'b'
    }
]
console.log('Student:',students[0])
let student = students.find((s) =>{
    if(s.name == 'bb'){
        return true
    }
})
*/
console.log('student:',student)
console.log(doubleson_student)

let hightScore_student = students.filter((s)=>{
    if (s.score >= 110){
        return true
    }

})
console.log('highscore_student',hightScore_student)