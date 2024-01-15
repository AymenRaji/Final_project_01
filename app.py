import flask 
app = flask.Flask("app")

def html_element(page_name):
    file = open(page_name + ".html")
    content = file.read()
    file.close()
    return content

@app.route("/")
def home():
    return html_element("index")

@app.route("/register")
def register_user():
    return html_element("register\page")


@app.route("/login")
def login_user():
    return html_element("loging\page")

# @app.route("/")
# def products:


    