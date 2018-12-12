$( document ).ready(function(){
	console.log("javascript is working");
	listenForClickMyRecipes();
	// listenForClickNewRecipe();
	// listenForClickShowRecipe();
	listenForClickAllRecipes();
})

function listenForClickMyRecipes() {
	let asdf = document.getElementById('myrecipes')
	asdf.addEventListener('click', function (e) {
		e.preventDefault()
		console.log("we clicked my recipes link");
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
function listenForClickAllRecipes() {
    let action = document.getElementById('allrecipes')
    action.addEventListener('click', function(e){
        e.preventDefault()
        console.log("This has been clicked!!");
    })
}


