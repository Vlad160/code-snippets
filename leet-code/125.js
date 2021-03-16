var isPalindrome = function(s) {
    if (s === '') {
        return true;
    }
    const newS = s.toLowerCase().replace(/[^a-z\d]/gi, '');
    return newS === newS.split('').reverse().join('');
};


console.log(isPalindrome("A man, a plan, a canal: Panama"));