class RecipesController < ApplicationController

    before_action :require_login
    
    def require_login
        redirect_to root_path unless session.include? :user_id
    end

    def landing

    end
    
    def index
        if params[:user_id] && current_user.id == params[:user_id].to_i
            @user = current_user
            @recipes = @user.recipes
            respond_to do |f|
                f.html {render :index}
                f.json {render json: @recipes}
            end
        elsif params[:user_id]
            flash[:alert] = "You are not authorized to view this User's Recipes"
             
        else
            @recipes = Recipe.all
            respond_to do |f|
                f.html {render :index}
                f.json {render json: @recipes}
            end
        end
    end


    def name
        @recipes = Recipe.ordered_by_name
    end

    def time
        @recipes = Recipe.ordered_by_time
    end

    def show
        @recipe = Recipe.find_by(id: params[:id])
        respond_to do |f|
            f.html {render :index}
            f.json {render json: @recipe}
        end
    end

    def destroy
        recipe = Recipe.find(params[:id])
        recipe.destroy
        redirect_to recipe_path, notice: "deleted Recipe #{recipe.name}"
    end

    
    def new
        if params[:user_id] && current_user.id == params[:user_id].to_i
            @user = current_user
            @recipe = Recipe.new(user_id: params[:user_id])
                5.times do 
                    quantity = @recipe.quantities.build
                    quantity.build_ingredient       
            end
            render :partial => 'recipes/form', :layout => false

        else
            flash[:alert] = "You are not authorized to create a recipe with your account!"
            render :partial => 'recipes/form', :layout => false

        end
            
    end
    

    def create
        @user = User.find_by(id: params[:user_id])
        @recipe = Recipe.new(recipe_params)
        
        if @recipe.save
            respond_to do |f|
                f.html {render :show}
                f.json {render json: @recipe}            
                # redirect_to user_recipe_path(current_user, @recipe)
            # render :partial => 'recipes/form', :layout => false
        end

        else
            # 5.times do 
            #     quantity = @recipe.quantities.build
            #     quantity.build_ingredient
            # end 
            render json: @recipe, status: 406

        end
    end

    def edit 
        if params[:user_id] && current_user.id == params[:user_id].to_i
            @user = current_user
            @recipe = @user.recipes.find_by(id: params[:id])
            if !@recipe
                flash[:alert] = "This recipe doesnt exist in your collection!"
                redirect_to user_recipe_path(@user)
            else
                render :edit
            end
        else
            flash[:alert] = "You are not authorized to edit this recipe!"
            redirect_to recipes_path
        end
    end

    def update
        @user = current_user 
        @recipe = Recipe.find_by(id: params[:id])
       if @recipe.update(recipe_params)
        redirect_to recipe_path(@recipe)
       else
        render :edit
       end
    end

    def destroy
        @recipe = Recipe.find_by(id: params[:id])
        @recipe.destroy
        redirect_to recipes_path     
    end

    def recipe_params
        params.require(:recipe).permit(:name, :user_id, :description, :time, :instructions, quantities_attributes: [:amount, ingredient_attributes: [:name]])
    end


end