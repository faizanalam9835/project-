function normalString(str) {
    return str.toLowerCase().replace(/[^a-z]/g, '');
}
function cutSubstrings(str, k){
    let substrings = [];
    for (let i = 0; i <= str.length - k; i++) {
        substrings.push(str.substring(i, i + k));
    }
    return substrings;
}
function countSubstrings(substrings) {
    let frequencyMap = {};
    substrings.forEach(substring => {
        if (frequencyMap[substring]) {
            frequencyMap[substring]++;
        } else {
            frequencyMap[substring] = 1;
        }
    });
    return frequencyMap;
}
function filterSameSubstrings(frequencyMap, exclusionList){
    exclusionList.forEach(word => {
        if (frequencyMap[word]) {
            delete frequencyMap[word]
        }
    });
    return frequencyMap;
}
function getNFreqSubstrings(frequencyMap, N){
    let sortable = [];
    for (let substring in frequencyMap) {
        sortable.push([substring, frequencyMap[substring]]);
    }
    sortable.sort((a, b) => b[1] - a[1]);
    return sortable.slice(0, N);
}
function substringFrequencyAnalysis(inputString, k, exclusionList = [], N = 10){
    let normalizedString = normalString(inputString)
    let substrings = cutSubstrings(normalizedString, k)
    let frequencyMap = countSubstrings(substrings)
    if (exclusionList.length > 0) {
        frequencyMap = filterSameSubstrings(frequencyMap, exclusionList)
    }
    let topSubstrings = getNFreqSubstrings(frequencyMap, N)

    return topSubstrings
}
let inputString = "The quick brown fox jumps over the lazy dog. The fox is quick.";
let k = 3
let exclusionList = ['the', 'and', 'is']
let N = 5
let result = substringFrequencyAnalysis(inputString, k, exclusionList, N);
console.log("Top Frequent Substrings:", result);