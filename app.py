# importing
import flask
from flask import render_template, request, url_for, flash, redirect, get_flashed_messages, session
from flask import jsonify
from flask_mysqldb import MySQL
import json 
from flask import abort
from datetime import datetime





# App Name
app = flask.Flask("app")
app.secret_key = "0987654321"

app.config['MYSQL_HOST'] = 'localhost' 
app.config['MYSQL_USER'] = 'root' 
app.config['MYSQL_PASSWORD'] = '' 
app.config['MYSQL_DB'] = 'flask_user' 
app.config['SECRET_KEY'] = '0987654321'  
mysql = MySQL(app)

# Database pathe
file_path = "static/database.json"


class UserRegistration:
    # User class properties
    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email
    # User class method, 
    def register_user(self):
        cur = mysql.connection.cursor()
        date = datetime.now()
        # Using the $s as aplace holder becasue of the qoutes can make incorect selecting, so I can add the new user in the mysqldb in the users table
        cur.execute("insert into users (username, password, email, date) values (%s, %s, %s, %s)",
                    (self.username, self.password, self.email, date))
        mysql.connection.commit()
        cur.close()
        print("Registration successful")


class UserLogin:
    def __init__(self, username, password):
        self.username = username
        self.password = password

    def login_user(self):
        cur = mysql.connection.cursor()
        cur.execute(f"select username, password from users where username = '{self.username}'")
        user = cur.fetchone()
        cur.close()
        if user and self.password == user[1]:
            session['username'] = user[0]
            return redirect(url_for('home'))
        else:
            flash("Invalid username or password")
            return redirect(url_for('login'))


# using JSON file for importing and adding products  
def read_data(file_path):
    try:
        with open(file_path, "r") as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        return None
    except json.decoder.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return None
    
def write_data(data, file_path):
    with open(file_path, "w") as file:
        json.dump(data, file, indent=2)

# adding products 
def add_product(product_name, price, description="", inCart =1,
                brand="",categorey="", in_stock=True, color=None, color_code =None, image = None, **Kwargs):
    # new product id
    prduct_id = len(database['products']) + 1

    # new product to be added
    new_product = {"id": prduct_id, "name": product_name, "description": description, "inCart":1, "price": price,
                    "brand": brand, "categorey": categorey, "inStock": in_stock,
                        "image" : "img.src", **Kwargs
                    }
    
    database['products'].append(new_product)
    write_data(database, file_path)
    



# Defining 
file_path = "static/database.json"
database = read_data(file_path)
if database is None:
    database = {"products":{}}
    write_data(database, file_path)


# function for reading and creating route
def render_template_page(page_name, **Kwargs):
    return render_template("{}.html".format(page_name, **Kwargs))

@app.route("/")
def home():
    if "username" in session:
        return render_template_page("template/home/index", username=session["username"])
    else:
        return render_template_page("template/home/index")
 

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        email = request.form["email"]
        new_user = UserRegistration(username, password, email)
        new_user.register_user()
        return redirect(url_for("login"))
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

# add_product(product_name, price, description="", inCart =1,brand="",categorey="", in_stock=True, color=None, color_code =None, image = None, **Kwargs):
# add_product("Case for iPad 10th", 13, "", 1, "", "", True, None, None,"https://m.media-amazon.com/images/I/51IFiSD+kCL._AC_SX466_.jpg")

