/*Example functions to practice java script*/
/*Amilka Daniela Lopez Aguilar*/
/*2025-02-12*/

"use strict";

function firstNonRepeating(word){
for (let i = 0; i<word.length;i++){
    let repeated = false;
    for (let j = 0; j<word.length;j++){
        if (word[i] == word[j]&& i!=j){
            repeated = true;
            break;
        }
    }
    if (!repeated){
        return word[i];
    }
}
}

function bubbleSort(list) {
    //if list is empty, return an emoty array
    if (list.length == 0) {
        return list;
        }
    for (let i =0;i<list.length;i++){
        for(let j = 0;j<list.length-1-i;j++){
            if(list[j]>list[j+1]){
                let temp = list[j];
                list[j] = list[j+1];
                list[j+1] = temp;
                
            }
        }
    }
    return list;
}

function invertArray(arr){
    let inverted = []; //an empty array to store the inverted one
    if (arr.length == 0) {
        return arr;
        }
    for(let i = arr.length-1; i >= 0;i--){
        inverted.push(arr[i]);
    }
    return inverted;
}

function invertArrayInPlace(arr){
//podemos tener variables que apunten al inicio y al final del arreglo e intercambiar con una variable temporal hasta que se crucen
let first = 0;
let last = arr.length-1;
if (arr.length == 0) {
    return arr;
    }
while (first<last){
    let temp = arr[first];
    arr[first] = arr[last];
    arr[last] = temp;
    first++;
    last--;
}
return arr;
}

function capitalize(word){
    //if empty string, return ""
    if (word == "") {
        return "";
        }
    let capitalized = [];
    let capitalizedLetter = true;
    for (let i = 0; i < word.length; i++) {
        if (word[i] == ' ') {
            capitalized.push(' '); // se identifica que no se preserva el espacio
            capitalizedLetter = true;
            }
            else if (capitalizedLetter) {
                capitalized.push(word[i].toUpperCase());
                capitalizedLetter = false;
                }
            else {
                capitalized.push(word[i].toLowerCase());
                }
    }
return capitalized.join('');
}

function mcd(num1, num2){
    let num1Array = [];
    let num2Array = [];
    let resultingMcd = 1;

    // if num1 and num2 are 0
    if (num1 == 0 && num2 == 0) {
        return 0;
        }

    for (let i = 1; i<=num1;i++){
        if (num1 % i == 0){
            num1Array.push(i);
        }
    }
    for(let i = 1; i<=num2;i++){
        if (num2 % i == 0){
            num2Array.push(i);
        }
    }   
    for (let i = 0; i < num1Array.length; i++) {
        for (let j = 0; j < num2Array.length; j++) {
            if (num1Array[i] === num2Array[j]) {
                if (num1Array[i] > resultingMcd) {
                    resultingMcd = num1Array[i];
                }
            }
        }
    }

    return resultingMcd;
}

function hackerSpeak(phrase){
    let hackerspeak = "";//store the solution
    if (phrase == "") {
        return "";
        }
    for (let i =0;i<phrase.length;i++){
        let c = phrase[i]; //esta variable tipo caracter nos permitira cambiar o mantener el caracter original o cambiarlo a hackerspeak
        if (c == "a"){
            hackerspeak += "4";
        }
        else if(c == "e"){
            hackerspeak += "3";
        }
        else if(c=="s"){
            hackerspeak += "5";
        }
        else if (c=='i'){
            hackerspeak += "1";
        }
        else if(c=='o'){
            hackerspeak += "0";
        }
        else{
            hackerspeak += c;
        }

    }
    return hackerspeak;
}

function factorize(num){
    let factorlist =[];
    if(num ==0){
        return factorlist;
    }
    for(let i = 1; i<=num;i++){
        if (num % i == 0) {
            factorlist.push(i);
        }
    }
    return factorlist;
}

function deduplicate(arr){
    //if arr is empty, return arr
    if (arr.length == 0) {
        return arr;
        }
    for (let i = 0; i<arr.length;i++){
        for (let j = i+1; j<arr.length;j++){
            if (arr[i] == arr[j]){
                arr.splice(j,1);
                j--;
            }
    }
}
    return arr;
}

function findShortestString(listOfStrings){
    //if listOfStrings is empty, return 0
    if (listOfStrings.length == 0) {
        return 0;
    }
    let shortest = listOfStrings[0];
    for (let i = 1; i<listOfStrings.length;i++){
        if (listOfStrings[i].length < shortest.length){
            shortest = listOfStrings[i];
            }
            }
            return shortest.length;
}

function isPalindrome(palindromeString){
    //if palindrome string is empty, return true
    if (palindromeString.length == 0) {
        return true;
        }
    let reverse = [];
    for(let i = palindromeString.length-1; i >= 0;i--){
        reverse.push(palindromeString[i]);
    }
    if (reverse.join('')==palindromeString){
        return "Es palindromo"
    }
    else{
        return "No es palindromo";
    }

}

function sortStrings(stringToSort){
    //if stringToSort is empty, return stringToSort
    if (stringToSort.length == 0) {
        return stringToSort;
    }
    return stringToSort.sort((a,b)=> a.localeCompare(b));
}

function stats(numsList) {
    //if numsList is empty, return 0,0
    if (numsList.length == 0) {
        return [0, 0];
        }
    let result = [];
    let median;

    numsList = numsList.sort((a, b) => a - b);

    if (numsList.length % 2 === 0) {
        median = (numsList[numsList.length / 2 - 1] + numsList[numsList.length / 2]) / 2;
    } else {
        median = numsList[Math.floor(numsList.length / 2)];
    }

    let modeCount = {};
    let maxCount = 0;
    let mode;

    for (let num of numsList) {
        modeCount[num] = (modeCount[num] || 0) + 1;
        if (modeCount[num] > maxCount) {
            maxCount = modeCount[num];
        }
    }

    for (let num in modeCount) {
        if (modeCount[num] === maxCount) {
            mode=Number(num);  
        }
    }

    result.push(median,mode);  
    return result;  
}

function popularString(frequentString) {
    //if frequentString is empty, return it
    if (frequentString.length == 0) {
        return frequentString;
        }
    let frequencyMap = {};  
    let mostPopular = "";
    let maxCount = 0;

    for (let str of frequentString) {
        frequencyMap[str] = (frequencyMap[str] || 0) + 1; 
    }

    for (let str in frequencyMap) {
        if (frequencyMap[str] > maxCount) {
            maxCount = frequencyMap[str];
            mostPopular = str;  
        }
    }

    return mostPopular;  
}


function isPowerOf2(num){
    let Powerof2=true;
    if (num == 0){
        Powerof2=false;
    }
    while (num > 1) {
        if (num % 2 !== 0) {
            return false; 
        }
        num /= 2;  
    }
    return true;  
}

function sortDescending(numsList){
//if numsList is empty, return it
if (numsList.length == 0) {
    return numsList;
    }
numsList = numsList.sort((a, b) => b - a);
return numsList;
}

//testing functions

console.log(firstNonRepeating(""));
console.log(bubbleSort([]));
console.log(invertArray([]));
console.log(invertArrayInPlace([]));
console.log(capitalize(""));
console.log(mcd(24,36));
console.log(hackerSpeak(""));
console.log(factorize(12));
console.log(deduplicate([]));
console.log(findShortestString([]));
console.log(isPalindrome(""));
console.log(sortStrings( [""]))
console.log(stats([]))
console.log(popularString([""]));
console.log(isPowerOf2(1));
console.log(sortDescending([2,3,5,7]));