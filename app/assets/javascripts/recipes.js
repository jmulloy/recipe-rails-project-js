$( document ).ready(function(){
	// console.log("javascript is working");
	// listenForClickMyRecipes();
	// listenForClickNewRecipe();
	// listenForClickShowRecipe();
	listenForClickAllRecipes();
})

// function listenForClickMyRecipes() {
// 	let asdf = document.getElementById('myrecipes')
// 	asdf.addEventListener('click', function (e) {
// 		e.preventDefault()
// 		console.log("we clicked my recipes link");
// 	})
// }
function listenForClickAllRecipes() {
	let asdf = document.getElementById('allrecipes')
	asdf.addEventListener('click', function (e) {
		e.preventDefault()
		$.get("/recipes.json", function(data){
            let recipes = data
            let somevariable = ""
            recipes.forEach((recipe) => {
                somevariable += '<li>' + recipe["name"] + ' - ' + recipe["description"] + '</li>';
                // debugger
            });
               $(".recipe").html(somevariable)
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


// class Recipe {
//     constructor(obj) {
//         this.name = obj.name
//         this.time = obj.time
//         this.instructions = obj.instructions
//         this.description = obj.description
//     }
// }

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


