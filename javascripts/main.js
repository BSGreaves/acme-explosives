var UI = (function(oldUI) { // IIFE structure so I can keep the data private

    var selectedCategory = "";
    var categories = [];
    var types = [];
    var products = [];
    var JSONFiles = ["./json/categories.json", "./json/types.json", "./json/products.json"];

    oldUI.loadUserSelection = function(userSelectedCategory) { // Triggered by event listener
        selectedCategory = userSelectedCategory;
        Promise.all([UI.loadJSONFile(JSONFiles[0]), UI.loadJSONFile(JSONFiles[1]), UI.loadJSONFile(JSONFiles[2])])
            .then(function(data) {
                categories = data[0].categories;
                types = data[1].types;
                products = data[2].products;
                UI.createDOMString();
            });
    };
    oldUI.loadJSONFile = function(filepath) { // Loads each JSON file
        return new Promise(function(resolve, reject) {
            $.ajax(filepath).done(function(data) {
                resolve(data);
            }).fail(function(error) {
                reject(error);
            });
        });
    };
    oldUI.createDOMString = function() { // Builds the main string
        let cardCount = 0;
        let ops = ""; //outputstring
        categories.forEach(function(currCategory) {
            if (currCategory.name === selectedCategory) {
                types.forEach(function(currType) {
                    if (currType.category === currCategory.id) {
                        products.forEach(function(currProduct) {
                            if (currProduct.type === currType.id) {
                                if (cardCount % 3 === 0) {
                                    ops += `<div class="row">`;
                                }
                                ops += UI.buildCard(currType, currProduct);
                                cardCount++;
                                if (cardCount % 3 === 0) {
                                    ops += `</div>`;
                                }
                            }
                        });
                    }
                });
            }
        });
        if (cardCount % 3 !== 0) { // Closes out any row that wasn't closed automatically
            ops += `</div>`;
        }
        $("#output").html(ops);
    };
    oldUI.buildCard = function(currType, currProduct) { // Assists buildDOMString
        let currCard = `<div class="col-md-4">`;
        currCard += `<h3>${currProduct.name}</h3>`;
        currCard += `<p>${currType.name}</p>`;
        currCard += `<p>${currProduct.description}</p>`;
        currCard += `</div>`;
        return currCard;
    };

    $("#Fireworks, #Explosives").click(function(e) {
        UI.loadUserSelection(e.target.id);
    });

    return oldUI;

})(UI || {});