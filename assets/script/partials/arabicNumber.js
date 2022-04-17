String.prototype.toArabicDigits = function () {
  var id = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return this.replace(/[0-9]/g, function (w) {
    return id[+w];
  });
};

function reverseDate(str) {
  return str.split("/").reverse().join("/");
}
function reverseMobile(str) {
  if (str.includes("+")) {
    return str.slice(1).split("-").join("+-").split("-").reverse().join("-");
  } else {
    return str.split("-").reverse().join("-");
  }
}

const arabicText = document.querySelectorAll("p");
arabicText.forEach((e) => {
  let text = e.innerText;
  if (!text.includes("=") && !containArabicLetters(text)) {
    if (text.includes("-")) {
      text = reverseMobile(text);
    }
    if (text.includes("/")) {
      text = reverseDate(text);
    }
  }
  e.innerText = text.toArabicDigits();
});

// check if the text contains numbers
// function hasNumber(myString) {
//   return /\d/.test(myString);
// }

// check if text is number
// function isNumeric(n) {
//   return !isNaN(parseFloat(n)) && isFinite(n);
// }

// check if text contains arabic letters
function containArabicLetters(str) {
  //   var arLetters = /^[0-9a-zA-Z]+$/;
  const arLetters = /[\u0600-\u06FF]/;
  if (str.match(arLetters)) {
    return true;
  } else {
    return false;
  }
}
