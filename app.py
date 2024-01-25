# importing
import flask
from flask import render_template, request, url_for, flash, redirect, get_flashed_messages, session
from flask import jsonify
from flask_mysqldb import MySQL
from pythonFunctions.UserClass import UserRegistration, UserLogin
from pythonFunctions.render_file import render_template_page
from pythonFunctions.DBfunction import read_data, write_data, add_product




# App Name and secret key for the mainiating the user session 
app = flask.Flask("app")
app.secret_key = "0987654321"


# muSQL configratuition, mySQL is used for storeing users and veriving them
app.config['MYSQL_HOST'] = 'localhost' 
app.config['MYSQL_USER'] = 'root' 
app.config['MYSQL_PASSWORD'] = '' 
app.config['MYSQL_DB'] = 'flask_user' 
app.config['SECRET_KEY'] = '0987654321'  
mysql = MySQL(app)


    # Database pathe, the josn file that is a DB for the product to read from it and write in it 
file_path = "static/database.json"



# Home page if the user is loged in the it will appear logout and if not logedin, 
# It wil display the register and loging and the user will not be able to acces to the cart
@app.route("/")
def home():
    if "username" in session:
        return render_template_page("template/home/index", username=session["username"])
    else:
        return render_template_page("template/home/index")
 

# Using the GET & POST methods for getintg the user request, if the user is, # registering the register page it will be handle by get and the user inpute,
#  will be passed as a paremet so it can be checked, and the login to the same, # After checking it will redirect the user to the home page, and logout it pop out the session


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        confirm_password = request.form["confirm_password"]
        email = request.form["email"]
        new_user = UserRegistration(username, password, confirm_password, email)
        return new_user.register_user()
    return render_template_page("template/register/page")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        login_user = UserLogin(username, password)
        return login_user.login_user()
    return render_template_page("template/loging/page")

@app.route("/logout")
def logout():
    session.pop("username", None)
    return redirect(url_for("home"))



@app.route("/products")
def get_products():
    database = read_data(file_path)
    product_page = render_template("template/product/page.html", products=database['products'] ,products_json=jsonify(database['products']))
    return product_page




@app.route("/Shoppin_Cart")
def cart():
    if "username" in session:
        cart_page = render_template("template/cart/page.html")
        return cart_page
    else:
        flash("Please log in to see the cart")
        return redirect(url_for("login"))




# These is an example to add new_product
# add_product(product_name, price, description="", brand="",categorey="", in_stock=True, color=None, color_code =None, image = None, **Kwargs):
# add_product("Samsung Galaxy s20+", 350, "", 1, "", "", True, None, None,image="https://m.media-amazon.com/images/I/61Q9IXJ1zcS._AC_UY327_FMwebp_QL65_.jpg")
# add_product("Canon EOS m50", 26896, "",  "", "", True, None, None,image="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRKoaNM6gq_lCsp-QcDrgoI-BiJmOeTY_0Iibz6PcuTmokEW6sAB4aQReaZ3DdEtzQ5xqoOmY_EAsA_bYD6XtKBL3Dg5y3fivCzriMdYxVZmBc4ixOzypbp7i0wk8W9&usqp=CAc")