import flask
import datetime
from flask import flash, redirect, url_for, session
import re
from pythonFunctions.render_file import render_template_page
from flask_mysqldb import MySQL
app = flask.Flask("app")
app.secret_key = "0987654321"


# muSQL configratuition, mySQL is used for storeing users and veriving them
app.config['MYSQL_HOST'] = 'localhost' 
app.config['MYSQL_USER'] = 'root' 
app.config['MYSQL_PASSWORD'] = '' 
app.config['MYSQL_DB'] = 'flask_user' 
app.config['SECRET_KEY'] = '0987654321'  
mysql = MySQL(app)



# Both the USerRegistration and UserLogin class, has properties like name, password, email, and methods login user, register user, 
# validat all userName, email, confiming password and checking the user input 
class UserRegistration:
    # User class properties
    def __init__(self, username, password, confirm_password, email):
        self.username = username
        self.password = password
        self.confirm_password = confirm_password
        self.email = email

    # User class method
    def register_user(self):
        # Validate username uniqueness
        if not self.is_username_unique():
            flash("Username already exists. Please choose a different username.", "error")
            return redirect(url_for("register"))



       
        if not self.is_email_valid():
            flash("Invalid email format or email already exists. Please provide a valid and unique email.", "error")
            return redirect(url_for("register"))


        
        if not self.is_password_confirmed():
            flash("Passwords do not match. Please make sure your passwords match.", "error")
            return redirect(url_for("register"))

       
        cur = mysql.connection.cursor()
        date = datetime.datetime.now()
        cur.execute("INSERT INTO users (username, password, email, date) VALUES (%s, %s, %s, %s)",
                    (self.username, self.password, self.email, date))
        mysql.connection.commit()
        cur.close()
        session["username"] = self.username

        flash("Registration successful!", "success")
        return redirect(url_for("home"))
    def is_username_unique(self):
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM users WHERE username = %s", (self.username,))
        result = cur.fetchone()
        cur.close()
        return result is None

    def is_email_valid(self):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", self.email):
            return False
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM users WHERE email = %s", (self.email,))
        result = cur.fetchone()
        cur.close()
        return result is None
    def is_password_confirmed(self):
        return self.password == self.confirm_password
        




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
            flash("Invalid username or password", "error")
        return render_template_page("template/loging/page")

        