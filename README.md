# Project 3 - Billboard's Top 25 Throughout the Years

## Group Members
- Alex Li
- Robert Harvey
- Jeanie Wu
- Mark Werden

### Description
The goal of this project was to determine what musical artists had the most instances in Billboard's Top 25 from the years 2014-2021. We used a custom API provided by guoguo12 and his contributors to call and retrieve the data from the Billboard wesbite to use in our analysis. Using programs such as pgAdmin and Flask, we converted this data to be readable by the programs so that it can be displayed using JavaScript and displayed on our HTML website.

## Sources Used
- Billboard API: https://github.com/guoguo12/billboard-charts.git
- Billboard Website: http://www.billboard.com/charts/

### Steps to Gathering and Displaying Data (Simplified)
1. In python, use the Billboard API to call the data and gather it into a format that can be used for pgAdmin/PostgreSQL
2. Make the connection in the database.py to connect to pgAdmin/PostgreSQL to export said data to a SQL format.
3. Using Flask, make the connection between pgAdmin/PostgreSQL and JavaScript to allow the data be used as a .json format so it can be read by the HTML
4. Using JavaScript, use d3 functions to sort through the data so it can be used reactively by the HTML (such as the graphs and dropdown functions, so they do not have to be hard-coded)
5. Finally, using HTML, ensure the data is presented correctly using Plotly and Bootstrap so it looks presentable
- Finalized Product:
!(Screenshot_1.png)
(screenshot 1 goes here)

### Findings
- We found that the arist "The Beatles" has the most instances of appearing on the Top 25 charts over the course of 7 years. (Fig. 1)
- The second most on the list was the artist known as "Soundtrack", with 11 instances appearing on the list (Fig. 2) and the third most is the artist "Bob Marley and the Wailers" with 8 instances. (Fig. 3)

(screenshot 2 goes here)

(screenshot 3 goes here)

(screenshot 4 goes here)
