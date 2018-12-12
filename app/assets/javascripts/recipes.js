$( document ).ready(function(){
	// console.log("javascript is working");
	listenForClickMyRecipes();
	// listenForClickNewRecipe();
	listenForClickAllRecipes();
})

class Recipe {
    constructor(attr) {
        this.id = attr.id
        this.name = attr.name
        this.time = attr.time
        this.instructions = attr.instructions
        this.description = attr.description
        this.ingredients = attr.ingredients
        this.quantities = attr.quantities
    }
}

function listenForClickAllRecipes() {
	let asdf = document.getElementById('allrecipes')
	asdf.addEventListener('click', function (e) {
        e.preventDefault()        
		$.get("/recipes.json", function(data){
            let recipes = data
            let somevariable = ""
            recipes.forEach((recipe, index) => {
                somevariable += '<li ><a class="recipename" href="recipes/' + recipe["id"] + '">' + recipe["name"] + `</a>
             <div id="${index}"` + recipe["description"] + '</div> </li>';
            });

               $("#ajax-content").html(somevariable)
               listenForClickRecipeName()
            //    this is where I code the event listener for the name of recipe 
        })
	})
}

function listenForClickRecipeName() {
	$(".recipename").click(function (e) {
        e.preventDefault()
        let url = this.attributes.href.textContent

        $.get(url + ".json", function(data){
            let recipe = new Recipe(data)            
            $("#ajax-content").html(recipe.construct())
                //<li><a class="recipename" href="recipes/1">Soup</a> - Nice meal for when feeling under the weather</li>
        })
    })
}

Recipe.prototype.construct = function() {
    let html = `<h2>${this.name}</h2>`
    html += `<h4>${this.description}</h4><ul>`
    for (let i = 0; i < this.quantities.length; i ++) {
        html += `<li>${this.quantities[i].amount} ${this.ingredients[i].name}</li>`
    }
    html += `</ul><p>${this.instructions}</p>`
    return html
}

function listenForClickMyRecipes() {
	let asdf = document.getElementById('myrecipes')
	asdf.addEventListener('click', function (e) {
        e.preventDefault()
        const url = this.attributes.href.textContent
        $.get(url + ".json", function(data){
            let recipes = data
            let somevariable = ""
            recipes.forEach((recipe, index) => {
                somevariable += '<li ><a class="recipename" href="recipes/' + recipe["id"] + '">' + recipe["name"] + `</a>
             <div id="${index}"` + recipe["description"] + '</div> </li>';
            });

               $("#ajax-content").html(somevariable)
               listenForClickRecipeName()
            //    this is where I code the event listener for the name of recipe 
        })
    //    console.log("this has been clicked!")
    })
}

function listenForClickCreateRecipe() {
    let asdf = document.getElementById('createrecipe')
    asdf.addEventListener()
}
