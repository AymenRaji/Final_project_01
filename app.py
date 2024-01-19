# importing
import flask
from flask import render_template, request, url_for
from flask import jsonify
import json 

# App Name
app = flask.Flask("app")

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

def update_data(data, file_path):
    with open(file_path, '+a') as file:
        if(id == "new_update"):
            value = "id"
            data = ""
            return data

def Del 
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

    user = next((user for user in database['users'] if user['username'] == username), None)
    if user and user['password'] == password:
        print("login successful. ")
    else:
        print("Invalid user name or password")

# adding products 
def add_product(product_name, price, description="",
                brand="",categorey="", in_stock=True, color=None, color_code =None, image = None, **Kwargs):
    # new product id
    prduct_id = len(database['products']) + 1
    # Default Image to add the uimage url
    default_image = r"static/images/dog-img.jpg"
    # new product to be added
    new_product = {"id": prduct_id, "name": product_name, "description": description, "price": price,
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
    database = read_data(file_path)
    featured_products = database['products'][:3]
    return render_template_page("template/home/index", featured_products=featured_products)

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        email = request.form["email"]
        register_user(username, password, email)
    # render_template_page("register\page")
    # register_term = flask.request.args("register_form")
    # register_user()
    return render_template_page("template/register/page")


@app.route("/login", methods = ["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        login_user(username, password)
    # file = 
    # login_term = flask.request.args("login_form")
    # login_user()

    return render_template_page("template/loging/page")

@app.route("/products")
def get_products():
    database = read_data(file_path)
    product_page = render_template("template/product/page.html", products=database['products'] ,products_json=jsonify(database['products']))

    return product_page

# if app == "__main__":
#     app.run(depug=True)

    
