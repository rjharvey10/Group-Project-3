from flask import Flask, render_template
from flask import Response
import pandas as pd
from sqlalchemy import create_engine
app = Flask(__name__)

@app.route('/')
def hello():
    return render_template("index.html")

@app.route('/get_data')
def get_data():
    engine = create_engine('postgresql://postgres:postgres@localhost:5432/project3')
    df = pd.read_sql_table("chart_table",con=engine)
    return Response(df.to_json(orient="records"), mimetype='application/json')

@app.route('/singer_count')
def singer_count():
    engine = create_engine('postgresql://postgres:postgres@localhost:5432/project3')
    df = pd.read_sql_table("chart_table",con=engine)
    df_group = df.groupby(["Artist Name"], as_index = False).count()[["Artist Name","Rank"]].sort_values(by="Rank",ascending=False)
    print(df_group)
    return Response(df_group.to_json(orient="records"), mimetype='application/json')

@app.route('/pie')
def pie():
    engine = create_engine('postgresql://postgres:postgres@localhost:5432/project3')
    df = pd.read_sql_table("chart_table",con=engine)
    df_pie = df.groupby(["Year","Artist Name"]).count()[["Rank"]].sort_values(by="Rank",ascending=False).reset_index()
    return Response(df_pie.to_json(orient="records"), mimetype='application/json')
    
if __name__ == '__main__':
    app.run(debug=True)