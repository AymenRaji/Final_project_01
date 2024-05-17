sudo /opt/lampp/lampp start 
sudo /opt/lampp/lampp stop


You can open the App by writing the bash terminal: { FLASK_APP=app.py flask run}

# MY FINAL PROJECT
A one or two sentence description of your project here.
## Description
Welcome to our project! This is a e-commerc website app, the back-end made in Python(flask) and front-end in JavaScript, besides that I am using locaStorage. It allows users to quickly and easily register, login, see products, add in Carts and adjust the products that want in the cart page, the registration is required an unique name and email, also to confirm the password, 

- What does it do?  
  Example: "This is a web project which tracks my music collection."
 With this App, users can effortlessly shop and explore the prices of the products, add products.

- What is the "new feature" which you have implemented that we haven't seen before?  
  Example: "Chart drawing library graphs the user data"
- I used JSON fIle for storing products(write and read from it)
- I used XAMPP for storing users and verive from it.
   

## Prerequisites
Did you add any additional modules that someone needs to install (for instance anything in Python that you `pip install-ed`)? 
List those here (if any).

Flask: for instaling  {pip install Flask==3.0.0}
Flask_MySQL: for instaling {pip install Flask-MySQLdb==2.0.0}

{For Using XAMP Download it from here: https://www.apachefriends.org/download.html }
   {After Download it and installing, open XAMPP and Start MYSQL and Apache, by clicking the start button}
   {After Start both click on the Admin Button, which it will open your browser}
   {In the browser click on the import, and select the users.sql }
   {And make the DB name flask_user}
   {After that click on the import button on the bottom of your browser}
   {Then you can register using uniq name, confimed password, unieq email}
           {If you don't register or log in the Cart will not display for you }
   {And if you don't want to register you can log in using these, username: Aymen & password: 12345678 }
   


## Project Checklist
- [Yes ] It is available on GitHub.
- [Yes] It uses the Flask web framework.
- [Yes ] It uses at least one module from the Python Standard Library other than the random module.
  Please provide the name of the module you are using in your app.
  - Module name: Datetime, Jinja
- [Yes,] It contains at least one class written by you that has both properties and methods. It uses `__init__()` to let the class initialize the object's attributes (note that  `__init__()` doesn't count as a method). This includes instantiating the class and using the methods in your app. Please provide below the file name and the line number(s) of at least one example of a class definition in your code as well as the names of two properties and two methods.
  - File name for the class definition: pythonFunctions\UserClass.py the name file userClass
  - Line number(s) for the class definition: 77 lines
  - Name of two properties: self.username = username, self.password = password, self.confirm_password = confirm_password, self.email = email
  - Name of two methods: is_username_unique, is_email_valid..... 
  - File name and line numbers where the methods are used: is_username_unique (line 62), is_email_valid(line 41)....
- [Yes] It makes use of JavaScript in the front end and uses the localStorage of the web browser.
- [Yes ] It uses modern JavaScript (for example, let and const rather than var).
- [Yes] It makes use of the reading and writing to the same file feature. from JSON file for products.
- [Yes] It contains conditional statements. Please provide below the file name and the line number(s) of at least
  one example of a conditional statement in your code.
  - File name: app.py
  - Line number(s): 36
- [Yes] It contains loops. Please provide below the file name and the line number(s) of at least
  one example of a loop in your code.
  - File name: localStorag.js
  - Line number(s): Line 33
- [Yes] It lets the user enter a value in a text box at some point. login and register 
  This value is received and processed by your back end Python code.
- [Yes] It doesn't generate any error message even if the user enters a wrong input.
- [Yes] It is styled using CSS.
- [Yes] The code follows the code and style conventions as introduced in the course, is fully documented using comments and doesn't contain unused or experimental code. 
  In particular, the code should not use `print()` or `console.log()` for any information the app user should see. Instead, all user feedback needs to be visible in the browser.  
- [Yes] All exercises have been completed as per the requirements and pushed to the respective GitHub repository.
