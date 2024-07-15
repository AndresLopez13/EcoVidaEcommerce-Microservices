from flask import Flask
from routes.pedido_routes import pedido_bp

app = Flask(__name__)
app.register_blueprint(pedido_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)


# if __name__ == '__main__':
#     app.run(debug=True)
