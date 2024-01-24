import flask
import json


app = flask.Flask("app")



file_path = "static/database.json"

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

# Defining 
# file_path = "static/database.json"
database = read_data(file_path)
if database is None:
    database = {"products":{}}
    write_data(database, file_path)



# adding products 
def add_product(product_name, price, description="",
                brand="",categorey="", in_stock=True, color=None, color_code =None, image = None, **Kwargs):
    # new product id and the inCart items it's assigned like these.
    prduct_id = len(database['products']) + 1
    inCart = 0

    # new product to be added in the JSon file tehn it will send it to the frontEnd when the server closed 
    # and opened again the new products that been added using the add_product function it will display in the product page
    new_product = {"id": prduct_id, "name": product_name, "description": description, "inCart": inCart, "price": price,
                    "brand": brand, "categorey": categorey, "inStock": in_stock,
                        "image" : image, **Kwargs
                    }

    database['products'].append(new_product)
    write_data(database, file_path)
    

# These is an example to add new_product
# add_product(product_name, price, description="", brand="",categorey="", in_stock=True, color=None, color_code =None, image = None, **Kwargs):
# add_product("Samsung Galaxy s20+", 350, "", 1, "", "", True, None, None,image="https://m.media-amazon.com/images/I/61Q9IXJ1zcS._AC_UY327_FMwebp_QL65_.jpg")
# add_product("Moto G", 135, "", 1, "", "", True, None, None,image="https://m.media-amazon.com/images/I/51bfhhUKhTL._AC_UY327_FMwebp_QL65_.jpg")