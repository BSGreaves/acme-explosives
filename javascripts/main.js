var selectedCategory = "";
var categories= [];
var types = [];
var products= [];

function loadJSONFile(filepath) {
    return new Promise(function(resolve, reject) {
        $.ajax(filepath).done(function(data) {
            resolve(data);
        }).fail(function(error) {
            reject(error);
        })
    })
};

var JSONFiles = ["./json/categories.json", "./json/types.json", "./json/products.json"];

function returnPromises(){
	Promise.all([loadJSONFile(JSONFiles[0]), loadJSONFile(JSONFiles[1]), loadJSONFile(JSONFiles[2])])
		.then(function(data){
		categories = data[0].categories;
		types = data[1].types;
		products = data[2].products;
		buildDOMString();
	});
};

function loadUserSelection(userSelectedCategory){ //Primary function that handles the event chain
	selectedCategory = userSelectedCategory;
	returnPromises();
}

function buildDOMString(){
	let cardCount = 0;
	let ops = "" //outputstring
	// ops += `<div class="row">`;
	categories.forEach(function(currCategory){
		if (currCategory.name === selectedCategory){
			types.forEach(function(currType){
				if (currType.category === currCategory.id){
					products.forEach(function(currProduct){
						if (currProduct.type === currType.id) {
							ops += buildCard(currCategory, currType, currProduct);
							cardCount++;
						}
						// if (cardCount % 3 === 0 && cardCount !== 0){
						// 	ops += `</div><div class="row">`
						// }
					});
				}
			});
		}
	});
	// ops += `</div>`;
	console.log(ops);
	$("#output").html(ops);
}

function buildCard(currCategory, currType, currProduct) {
	let currCard = `<div class="col-md-4">`
	currCard += `<h3>${currProduct.name}</h3>`
	currCard += `<p>${currType.name}</p>`
	currCard += `<p>${currProduct.description}</p>`
	currCard += `</div>`
	return currCard;
}

$("#Fireworks, #Explosives").click(function(e){
	loadUserSelection(e.target.id);
});

//  ATTEMPT to not hardcode promise.all

// function returnBlankPromiseArray(loadJSONFunction, filepathArray) {
// 	let blankPromiseArray = [];
// 	for (i=0; i < filepathArray.length; i++){
// 		blankPromiseArray.push(0);
// 	}
// 	blankPromiseArray.fill(loadJSONFunction, 0, filepathArray.length);
// 	return blankPromiseArray;
// }

// function executeJSON(loadJSONFunction, filepathArray) {
// 	let promiseArray = returnBlankPromiseArray(loadJSONFunction, filepathArray);
// 	console.log("promisearray in executeJSON", promiseArray);
// 	return promiseArray.map(function(each, index){
// 		each(filepathArray[index]);
// 	});
// }





