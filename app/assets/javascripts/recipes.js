$( document ).ready(function(){
	// console.log("javascript is working");
	listenForClickMyRecipes();
	listenForClickCreateRecipe();
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
            let htmlresp = "<p><button id='sortedrecipes'>Sorted Recipes</button></p>"
            recipes.forEach((recipe, index) => {
                htmlresp += '<li ><a class="recipename" href="recipes/' + recipe["id"] + '">' + recipe["name"] + `</a>
             <div id="${index}"` + recipe["description"] + '</div> </li>';
            });

               $("#ajax-content").html(htmlresp)
               listenForClickRecipeName()
               listenForButtonClick()
        })
	})
}

function listenForButtonClick() {
    let button = document.getElementById('sortedrecipes')
    button.addEventListener('click', function(e){
        $.get("/recipes.json", function(data){
            let recipes = data
            let newvariable = ""
            recipes.sort(function(a,b){
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB){
                    return -1
                }else if (nameA > nameB){
                    return 1 
                }else {
                    return 0 
                }
            })
            recipes.forEach((recipe, index) => {
                newvariable += '<li ><a class="recipename" href="recipes/' + recipe["id"] + '">' + recipe["name"] + `</a>
             <div id="${index}"` + recipe["description"] + '</div> </li>';
            });

               $("#ajax-content").html(newvariable)
               listenForClickRecipeName()
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
            let htmlresp = ""
            recipes.forEach((recipe, index) => {
                htmlresp += '<li ><a class="recipename" href="recipes/' + recipe["id"] + '">' + recipe["name"] + `</a>
             <div id="${index}"` + recipe["description"] + '</div> </li>';
            });
            

               $("#ajax-content").html(htmlresp)
               listenForClickRecipeName()
            //    this is where I code the event listener for the name of recipe 
        })
    //    console.log("this has been clicked!")
    })
}

function listenForClickCreateRecipe() {
    let asdf = document.getElementById('createrecipe')
    asdf.addEventListener('click', function(e) {
        e.preventDefault()
        const url = this.attributes.href.textContent;
        $.get(url).done(function(resp){
            $("#ajax-content").html(resp)
            listenToForm()
        })
    })
}
function listenToForm() {
    let form = document.getElementById("new_recipe")
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let data = $(this).serialize()
        let url = this.action;
        
        addData(url, data)
    })
}

    function addData(url, data) {
        $.ajax({
          type: "POST",
          url: url,
          data: data,
          success: response => {
            const myRecipe = new Recipe(response);
            document.getElementById("ajax-content").innerHTML = myRecipe.construct();
            
          },
          error: response => {
            const customMessage = "<h4>Your recipe must have a name, time, ingredients, and instructions</h4>"
            document.getElementById("ajax-content").innerHTML = customMessage;
          }
        })
      }











