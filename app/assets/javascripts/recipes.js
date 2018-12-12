$( document ).ready(function(){
	// console.log("javascript is working");
	// listenForClickMyRecipes();
	// listenForClickNewRecipe();
	listenForClickAllRecipes();
})

function listenForClickAllRecipes() {
	let asdf = document.getElementById('allrecipes')
	asdf.addEventListener('click', function (e) {
		e.preventDefault()
        
		$.get("/recipes.json", function(data){
            let recipes = data
            let somevariable = ""
            recipes.forEach((recipe, index) => {
                somevariable += '<li ><a onClick="listenForClickRecipeName()" class="recipename" href="recipes/' + recipe["id"] + '">' + recipe["name"] + `</a>
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
        $.get("/recipes.json", function(data){
             let recipes = data
             let somevariable = ""
             let linkIndex = document.getElementById('clicked_in')
              somevariable = '<li>' + recipes[0]["instructions"] + ' - ' + recipes[0]["time"] + '</li>'
                $("#0").append(somevariable)
                //<li><a class="recipename" href="recipes/1">Soup</a> - Nice meal for when feeling under the weather</li>
        })
    })
}






// $(function () {
// 	console.log("javascript is working");
// 	listenForClickMyRecipes();
// 	// listenForClickNewRecipe();
// 	// listenForClickShowRecipe();
// 	listenForClickAllRecipes();
// })


class Recipe {
    constructor(obj) {
        this.name = obj.name
        this.time = obj.time
        this.instructions = obj.instructions
        this.description = obj.description
        this.ingredients = obj.ingredients
    }
}

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


