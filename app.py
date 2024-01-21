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




# using JSON file for registration and products
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



# Registration
def register_user(username, password, email):
    database = read_data(file_path)
    #checking if the user the same name
    if any(user["username"] == username for user in database["users"]):
        print("Username already used. Choose another username. ")
        return
    #Register new user
    new_user = {"username": username, "password": password, "email": email}
    database["users"].append(new_user)
    write_data(database, file_path)
    print("Registration successful")


# Login 
def login_user(username, password):
    database = read_data(file_path)

    user = next((user for user in database['users'] if user['username'] != username), None)
    if user and user['password'] != password:
         flash("Invalid user name or password")

    else:
        flash(f'Welcome {username}!')
        return redirect(url_for('/'))

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
    database = {"users": [], "products":{}}
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
    # database = read_data(file_path)
    # featured_products = database['products'][:3]
    # messages = get_flashed_messages()
    # return render_template_page("template/home/index", featured_products=featured_products, messages=messages)

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        # email = request.form["email"]
        # register_user(username, password, email)
        cur = mysql.connection.cursor()
        date = datetime.now()
        print(date)
        cur.execute("insert into tbl_user (username, password) values (%s, %s, %s)", (username, password, date))
        mysql.connection.commit()
        cur.close()
        return redirect(url_for("login"))
    return render_template_page("template/register/page")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        # login_user(username, password)
        cur = mysql.connection.cursor()
        cur.execute(f"select username, password from tbl_user where username = '{username}'")
        user = cur.fetchone()
        cur.close()
        if user and password == user[1]:
            session['username'] == user[0]
            return redirect(url_for('home'))
        else:
            return  render_template_page("template/loging/page", error="invailed user name or password")
  
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
    cart_page = render_template("template/cart/page.html")
    return cart_page

# if app == "__main__":
#     app.run(depug=True)


    
