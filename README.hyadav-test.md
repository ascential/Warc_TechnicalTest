# 1. Application Architecture vis-a-vis web application project and client side React code

- root folder
    - ProductShop.sln
    - ProductShop folder
        - ClientApp
            - node_modules folder
            - build folder
            - src folder            
            - public 
            - package.json
            - ... other less important folders and files
        - ProductShop.csproj
        - ... other folders


# ClientApp folder conatains all react code
    - src folder contains all source code for the application client side code
    - build folder contains the prod build output - minified js, css files
    - other folders are standard react folders


# How to run the application - Method A. - Manually run client and server side apps
    - Run ProductShop web app in debug mode. This is required for Api to be up and running
    - Open ClientApp folder in VS Code (or command prompt or any other editor)
    - In the terminal, type 
        npm start
    - Browse http://localhost:3000

# How to run the application - Method B. - For debug release    
    - Open ClientApp folder in VS Code (or command prompt or any other editor)
    - In the terminal, type 
        npm run build
    - This will trigger the prod build for the client side React code and copy output 
        into 'build' folder under ClientApp folder
    - Run ProductShop web app in debug mode
    - This will serve the whole website from ASP.Net MVC server side (IIS Express)
    - It will open the default browser and load the URL http://localhost:53268
    - This will run the whole website

# How to run the application - Method C. - For prod release
    - Switch Product Shop website project to Release build
    - Run the project without debugging (Ctrl + F5) (or you can build it and then run 
        without debugging)
    - This will automatically do the following
        a) Build ASP.Net MVC code and copy to bin/<Configuration> folder for example to 
            bin/debug
        b) It will also build React client side app code and copy the output to
            bin/<Configuratio>/ClientApp/build folder
        c) It will automatically launch the default browser and load http://localhost:5000
        d) At this whole website will be up and running
    
###### How does the Release build configuration builds and copies React code automatically
    - There are additional msbuild tasks added to ProductShop.csproj file which perform this action

##### How is React client side code rendered by ASP.Net MVC server side code
    - Home Controller Index action returns the index.html FileResult from ClientApp/build 
        folder
    - This file references js and css files from under the build/static folder
    - Extra URL Rewrite rules have been added to web.config web.server XML element
        to allow for the web server to redirect requests coming in for ~/static/*.* files
        to ~/clientApp/build/static/*.* path


#### What could have been done more or better if I had more time ?
  
  -  Add more server side test to test business layer code and more negative tests to test controller / api controllers
  
  - Setup Dependency injection integration into ASP.Net MVC .Net Framework pipeline (In ASP.Net Core this support is built in and is not needed). Currently I have added Unity DI container support but, its not automatically integrated. However, the app still resolves dependencies through Unity

 - Add more React jest unit tests / Add cypress based E2E tests


