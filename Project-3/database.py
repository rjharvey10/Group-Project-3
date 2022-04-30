import billboard
import pandas as pd
from sqlalchemy import create_engine

chart_df = pd.DataFrame()
for year in range(2014,2022):
    chart_data = billboard.ChartData('vinyl-albums', date=None, year=year, fetch=True, timeout=25)
    song_title = []
    song_rank = []
    song_artist = []
    for song in chart_data:
        song_title.append(song.title)
        song_rank.append(song.rank)
        song_artist.append(song.artist)
    
    vinyl_df = pd.DataFrame({
        "Song Title": song_title,
        "Rank": song_rank,
        "Artist Name": song_artist
    })
    vinyl_df["Year"] = year
    chart_df = pd.concat([chart_df,vinyl_df])

engine = create_engine('postgresql://postgres:postgres@localhost:5432/project3')

chart_df.to_sql('chart_table', engine, if_exists='replace',index=False)