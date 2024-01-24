import flask
from flask import render_template

app = flask.Flask("app")

# function for reading and creating route
def render_template_page(page_name, **Kwargs):
    return render_template("{}.html".format(page_name, **Kwargs))