$( document ).ready(function(){
	// console.log("javascript is working");
	// listenForClickMyRecipes();
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

function listenForClickRecipeName(clicked_id) {
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

    
    
    
    
    
    // let somevariable = ""


    //          let linkIndex = document.getElementById('clicked_in')
    //           somevariable = '<li>' + recipes[id]["instructions"] + ' - ' + recipes[id]["time"] + '</li>'
    //             // $(`#${id}`).html(somevariable)
//                 html += somevariable 
//                 html += `</div>`
// }           







// $(function () {
// 	console.log("javascript is working");
// 	listenForClickMyRecipes();
// 	// listenForClickNewRecipe();
// 	// listenForClickShowRecipe();
// 	listenForClickAllRecipes();
// })




// function listenForClickMyRecipes() {
//     let action = document.getElementById('myrecipes')
//     action.addEventListener('click', function(e){
//         e.preventDefault()
//         console.log("This has been clicked!!");
//     })
// }
// function listenForClickAllRecipes() {
//     let action = document.getElementById('allrecipes')
//     action.addEventListener('click', function(e){
//         e.preventDefault()
//         console.log("This has been clicked!!");
//     })
// }


